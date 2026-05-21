'use strict';

const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'source', '_posts');
const publicDir = path.join(process.cwd(), 'public');
const files = [];
const errors = [];

function walk(dir, matcher, output) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, matcher, output);
    else if (matcher(full)) output.push(full);
  }
}

function frontMatter(source) {
  return source.match(/^---\n([\s\S]*?)\n---/)?.[1] || '';
}

function scalar(front, key) {
  return (front.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1] || '')
    .trim()
    .replace(/^['"]|['"]$/g, '');
}

function list(front, key) {
  const block = front.match(new RegExp(`^${key}:\\n((?:  - .+\\n?)+)`, 'm'));
  if (!block) return [];
  return block[1]
    .split('\n')
    .map(line => line.match(/^\s*-\s*(.+)$/)?.[1] || '')
    .map(value => value.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function slugCategory(front) {
  return (list(front, 'categories')[0] || 'uncategorized').replace(/\s+/g, '-');
}

function postUrl(file, front) {
  const permalink = scalar(front, 'permalink');
  if (permalink) return `/${permalink.replace(/^\/|\/$/g, '')}/`;
  const rel = path.relative(postsDir, file).replace(/\.md$/, '').split(path.sep).join('/');
  return `/${slugCategory(front)}/${rel}/`;
}

walk(postsDir, file => file.endsWith('.md'), files);

const urlByStem = new Map();
const urlByRel = new Map();
const urlSet = new Set();

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const front = frontMatter(source);
  const url = postUrl(file, front);
  const rel = path.relative(postsDir, file).split(path.sep).join('/');
  urlSet.add(url);
  urlByStem.set(path.basename(file, '.md'), url);
  urlByRel.set(rel, url);
  urlByRel.set(rel.replace(/\.md$/, ''), url);
}

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const front = frontMatter(source);
  const rel = path.relative(process.cwd(), file);

  if (!front) errors.push(`${rel}: missing front matter`);
  if (!scalar(front, 'title')) errors.push(`${rel}: missing title`);
  if (!scalar(front, 'date')) errors.push(`${rel}: missing date`);
  if (!scalar(front, 'description')) errors.push(`${rel}: missing description`);
  const categories = list(front, 'categories');
  if (categories.length !== 1) errors.push(`${rel}: categories should contain exactly 1 item`);

  const tags = list(front, 'tags');
  if (tags.length < 3 || tags.length > 8) {
    errors.push(`${rel}: tags should contain 3-8 items`);
  }

  const lang = scalar(front, 'lang');
  if (lang !== 'zh-CN' && lang !== 'en') {
    errors.push(`${rel}: lang should be zh-CN or en`);
  }

  const keywords = list(front, 'keywords');
  if (keywords.length < 3 || keywords.length > 6) {
    errors.push(`${rel}: keywords should contain 3-6 items`);
  }

  const linkRe = /\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = linkRe.exec(source))) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;

    const cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) continue;

    if (cleanHref.endsWith('.md')) {
      errors.push(`${rel}: internal link should use permalink, not .md: ${href}`);
      continue;
    }

    if (cleanHref.startsWith('/')) {
      const normalized = `/${cleanHref.replace(/^\/|\/$/g, '')}/`;
      const htmlTarget = path.join(publicDir, decodeURI(normalized), 'index.html');
      if (!urlSet.has(normalized) && !fs.existsSync(htmlTarget)) {
        errors.push(`${rel}: internal link target not found: ${href}`);
      }
      continue;
    }

    const candidate = path.normalize(path.join(path.dirname(file), cleanHref));
    const candidateRel = path.relative(postsDir, candidate).split(path.sep).join('/');
    const stem = path.basename(cleanHref);
    if (!urlByRel.has(candidateRel) && !urlByStem.has(stem)) {
      errors.push(`${rel}: relative internal link target not found: ${href}`);
    }
  }
}

if (errors.length) {
  console.error(`Content check failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Content check passed: ${files.length} posts`);

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Parser } = require('htmlparser2');

const root = path.join(process.cwd(), 'public');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = new Set();
const links = [];
let preDepth = 0;
let headings = 0;
let announcement = 0;
let tasks = 0;
let content = '';
let readingContent = false;

const parser = new Parser({
  onopentag(name, attrs) {
    if (name === 'pre' || name === 'code') preDepth++;
    if (attrs.id) {
      assert(!ids.has(attrs.id), `Duplicate home ID: ${attrs.id}`);
      ids.add(attrs.id);
    }
    if (name === 'h1') headings++;
    if (name === 'section' && (attrs.class || '').split(' ').includes('announcement')) {
      assert.equal(preDepth, 0, 'Announcement was emitted as code');
      announcement++;
    }
    if (name === 'a' && (attrs.class || '').split(' ').includes('task')) tasks++;
    if (attrs.href && !/^(https?:|mailto:|data:)/.test(attrs.href)) links.push(attrs.href);
    if (attrs.src && !attrs.src.startsWith('data:')) links.push(attrs.src);
    if (name === 'script' && attrs.id === 'home-content') readingContent = true;
  },
  ontext(text) { if (readingContent) content += text; },
  onclosetag(name) {
    if (name === 'pre' || name === 'code') preDepth--;
    if (name === 'script') readingContent = false;
  }
}, { decodeEntities: true });
parser.end(home);
for (const [page, marker] of [['faq', 'free-pro'], ['updates', '3.11.0']]) {
  const pageHtml = fs.readFileSync(path.join(root, page, 'index.html'), 'utf8');
  assert(pageHtml.includes(marker), `${page} content missing`);
  const source = fs.readFileSync(`source/${page}/index.md`, 'utf8');
  for (const [, href] of source.matchAll(/href="(\/[^"#?]+)(?:#[^"]*)?"/g)) links.push(href);
}
assert.equal(headings, 1, 'Expected one main heading');
assert.equal(announcement, 1, 'Expected a real announcement section');
assert.equal(tasks, 5, 'Expected five task links');
assert(!/__HOME_|@@|&lt;section/.test(home), 'Unresolved or escaped homepage markup');
assert(!home.includes('base64,'), 'Large media must be separate static assets');

const data = JSON.parse(content);
const search = JSON.parse(fs.readFileSync(path.join(root, 'home-search.json'), 'utf8'));
const legacySearch = JSON.parse(fs.readFileSync(path.join(root, 'search.json'), 'utf8'));
assert(search.length >= 87, 'Full search lost existing articles');
assert.equal(new Set(data.articles.map(item => item.href)).size, data.articles.length, 'Duplicate related articles');
assert(data.articles.some(item => item.group === '开发笔记' && item.title.includes('FastAPI')), 'Developer notes missing');
assert(data.articles.some(item => item.lang === 'en'), 'English articles missing');
assert(!data.articles.some(item => /\/Changelog\//.test(item.href)), 'Release notes should use the updates section');
for (const item of search) {
  assert(!/"@context"|"@graph"|<script\b|<style\b/.test(item.body), `Non-content data leaked into ${item.title}`);
  links.push(item.href);
}
for (const item of legacySearch) {
  assert(!item.url.startsWith('//'), `Protocol-relative article link: ${item.url}`);
  assert(!/"@context"|"@graph"/.test(item.content), `SEO data in article search: ${item.title}`);
}
for (const href of links) {
  if (href.startsWith('#')) {
    assert(ids.has(href.slice(1)), `Broken home fragment: ${href}`);
    continue;
  }
  const pathname = decodeURIComponent(href.split(/[?#]/)[0]).replace(/^\/+/, '');
  let target = path.join(root, pathname);
  if (!pathname || pathname.endsWith('/')) target = path.join(target, 'index.html');
  assert(fs.existsSync(target), `Missing home/search target: ${href}`);
}
assert.equal(
  fs.readFileSync(path.join(root, 'images/homepage/export-demo.html'), 'utf8'),
  fs.readFileSync('source/images/homepage/export-demo.html', 'utf8'),
  'The interactive sample must remain raw HTML, without a NexT wrapper'
);
console.log(`Homepage validated: ${tasks} task entries, ${data.articles.length} related articles, ${search.length} search entries, ${links.length} link/asset checks.`);

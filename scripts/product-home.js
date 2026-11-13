'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { escapeHTML } = require('hexo-util');
const { plainText, sourceOf, articleData } = require('../lib/site-content');
const { header, searchDialog, version } = require('../lib/site-shell');

function articleCard(article) {
  const href = escapeHTML(article.href);
  return `<article class="article-card"><span class="article-category">${escapeHTML(article.group)}</span>` +
    `<h3><a href="${href}">${escapeHTML(article.title)}</a></h3><p>${escapeHTML(article.summary)}</p>` +
    `<div class="article-card-foot"><time datetime="${article.date}">${article.date.replaceAll('-', '.')}</time>` +
    `<a class="text-link" href="${href}">阅读文章</a></div></article>`;
}

hexo.extend.generator.register('product-information-home', function(locals) {
  const posts = locals.posts.sort('-updated').toArray();
  const search = posts.map(articleData);
  const utilities = [
    { path: 'faq/', title: 'OutlineSave 常见问题与支持', en: 'OutlineSave FAQ & support', type: '常见问题' },
    { path: 'updates/', title: '产品更新与版本记录', en: 'Product updates and release notes', type: '产品更新' },
    { path: 'help/', title: '全部使用指南', en: 'All product guides', type: '教程' }
  ];
  utilities.forEach(utility => {
    const page = locals.pages.toArray().find(item => item.path.replace(/^\/+/, '') === utility.path + 'index.html');
    if (!page) return;
    ['zh-CN', 'en'].forEach(lang => search.push({
      title: lang === 'en' ? utility.en : utility.title,
      summary: plainText(page.description || utility.title),
      href: '/' + utility.path, type: utility.type, group: '', lang,
      keywords: utility.title + ' ' + utility.en,
      body: plainText(page.content), date: page.date.format('YYYY-MM-DD')
    }));
  });
  // All original posts remain discoverable. The home grid excludes release records,
  // licensing and task-specific product manuals, which have their own entry points.
  const editorial = posts.filter(post => !/^(outline|license|changelog|updates)\//.test(sourceOf(post)));
  const featuredSources = [
    'zh/why-heavy-ai-users-need-local-first-archive-workflow.md',
    'zh/best-chatgpt-chrome-extensions.md',
    'dev-notes/chrome-extension-notes.md',
    'zh/how-to-save-chatgpt-to-local-knowledge-base.md',
    'zh/why-structured-export-beats-copy-paste.md',
    'dev-notes/fastapi-backend-notes.md'
  ];
  const featured = featuredSources.map(source => editorial.find(post => sourceOf(post) === source)).filter(Boolean);
  const articles = [...featured, ...editorial.filter(post => !featured.includes(post))].map(articleData)
    .map(({ body, keywords, type, ...article }) => article);
  const metadata = search.map(({ body, ...item }) => item);
  const content = JSON.stringify({ articles, search: metadata }).replace(/</g, '\\u003c');
  const template = fs.readFileSync(path.join(this.source_dir, '_data/homepage.html'), 'utf8');
  const zhArticles = articles.filter(article => article.lang === 'zh-CN');
  const html = template
    .replace('__SITE_HEADER__', header(this,'home'))
    .replace('__SITE_SEARCH__', searchDialog(this))
    .replaceAll('__ASSET_VERSION__', version)
    .replace('__HOME_CONTENT__', content)
    .replace('__HOME_ARTICLE_CARDS__', zhArticles.slice(0, 6).map(articleCard).join('\n'))
    .replace('__HOME_ARTICLE_COUNT__', `精选 ${zhArticles.length} 篇 · 更多内容见全部文章`);
  return [
    { path: 'index.html', data: html },
    { path: 'home-search.json', data: JSON.stringify(search) }
  ];
});

// Keep article-page search compatible with NexT while excluding JSON-LD scripts
// before tag stripping. Otherwise the metadata becomes visible result snippets.
hexo.extend.filter.register('after_generate', function() {
  const database = this.locals.get('posts').map(post => ({
    title: post.title,
    url: encodeURI('/' + post.path.replace(/^\/+/, '')),
    content: plainText(post.content),
    categories: post.categories.map(item => item.name),
    tags: post.tags.map(item => item.name)
  }));
  this.route.set('search.json', JSON.stringify(database));
});

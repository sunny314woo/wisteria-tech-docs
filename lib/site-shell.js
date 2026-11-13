'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { escapeHTML } = require('hexo-util');
const version = '20261113-1';
const labels = { home:['文档首页','Docs home'],guides:['使用指南','Guides'],demos:['功能演示','Demos'],updates:['产品更新','Updates'],faq:['常见问题','FAQ'],articles:['文章','Articles'] };
function header(hexo, active='') {
  let html = fs.readFileSync(path.join(hexo.source_dir,'_data/site-header.html'),'utf8');
  if (active) html = html.replace(`data-nav="${active}"`, `data-nav="${active}" aria-current="page"`);
  return html;
}
function head(hexo, title, route, description='', lang='zh-CN') {
  const canonical = String(hexo.config.url).replace(/\/$/,'') + '/' + route.replace(/^\//,'').replace(/index\.html$/,'');
  return `<!doctype html><html lang="${lang}" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${escapeHTML(title)} | Wisteria Docs</title><meta name="description" content="${escapeHTML(description)}"><link rel="canonical" href="${escapeHTML(canonical)}"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHTML(title)}"><meta property="og:url" content="${escapeHTML(canonical)}"><meta property="og:description" content="${escapeHTML(description)}"><link rel="icon" href="/images/wisteria-docs.svg" type="image/svg+xml"><link rel="alternate" type="application/atom+xml" href="/atom.xml" title="Wisteria Docs"><link rel="sitemap" href="/sitemap.xml"><script>try{const theme=localStorage.getItem('wisteria-ui-theme');document.documentElement.dataset.theme=theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(_){}</script><link rel="stylesheet" href="/css/product-home.css?v=${version}"><link rel="stylesheet" href="/css/article-center.css?v=${version}"><link rel="stylesheet" href="/css/article-reading.css?v=${version}"><link rel="stylesheet" href="/css/site-shell.css?v=${version}"></head>`;
}
function searchDialog(hexo) { return fs.readFileSync(path.join(hexo.source_dir,'_data/site-search.html'),'utf8'); }
function icon(name) {
  const paths={back:'<path d="m14 6-6 6 6 6M8 12h13"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',zoom:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',up:'<path d="m6 12 6-6 6 6M12 6v15"/>'};
  return `<svg class="reading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
const pinIcon = '<svg class="pin-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M8 3h8l-1 6 4 4v2H5v-2l4-4-1-6Z"/><path d="M12 15v7"/></svg>';
const json = value => JSON.stringify(value).replace(/</g,'\\u003c');
module.exports = { header, head, labels, version, pinIcon, json, searchDialog, icon };

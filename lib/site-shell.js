'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { escapeHTML } = require('hexo-util');
const version = '20261112-2';
const labels = { guides:['使用指南','Guides'],demos:['功能演示','Demos'],updates:['产品更新','Updates'],faq:['常见问题','FAQ'],articles:['文章','Articles'] };
function header(hexo, active='') {
  let html = fs.readFileSync(path.join(hexo.source_dir,'_data/site-header.html'),'utf8');
  const urls = { guides:'/help/',demos:'/#demos',updates:'/updates/',faq:'/faq/',articles:'/articles/' };
  for (const [key,url] of Object.entries(urls)) html = html.replace(`href="${url}"`, `href="${url}" data-nav="${key}"${active===key?' aria-current="page"':''}`);
  return html;
}
function head(hexo, title, route, description='', lang='zh-CN') {
  const canonical = String(hexo.config.url).replace(/\/$/,'') + '/' + route.replace(/^\//,'').replace(/index\.html$/,'');
  return `<!doctype html><html lang="${lang}" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${escapeHTML(title)} | Wisteria Docs</title><meta name="description" content="${escapeHTML(description)}"><link rel="canonical" href="${escapeHTML(canonical)}"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHTML(title)}"><meta property="og:url" content="${escapeHTML(canonical)}"><meta property="og:description" content="${escapeHTML(description)}"><link rel="icon" href="/images/homepage/wisteria-mark.svg" type="image/svg+xml"><link rel="alternate" type="application/atom+xml" href="/atom.xml" title="Wisteria Docs"><link rel="sitemap" href="/sitemap.xml"><script>try{const theme=localStorage.getItem('wisteria-ui-theme');document.documentElement.dataset.theme=theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(_){}</script><link rel="stylesheet" href="/css/product-home.css?v=${version}"><link rel="stylesheet" href="/css/site-shell.css?v=${version}"><link rel="stylesheet" href="/css/article-center.css?v=${version}"></head>`;
}
const pinIcon = '<svg class="pin-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M8 3h8l-1 6 4 4v2H5v-2l4-4-1-6Z"/><path d="M12 15v7"/></svg>';
const json = value => JSON.stringify(value).replace(/</g,'\\u003c');
module.exports = { header, head, labels, version, pinIcon, json };

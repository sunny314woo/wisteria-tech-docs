'use strict';
const { stripHTML, unescapeHTML } = require('hexo-util');
const plainText = value => unescapeHTML(stripHTML(String(value || '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' '))).replace(/\s+/g, ' ').trim();
const sourceOf = post => String(post.source || '').replace(/^_posts\//, '');
const languageOf = post => String(post.lang || '').startsWith('en') ? 'en' : 'zh-CN';
const names = collection => collection ? collection.map(item => item.name) : [];
function groupOf(post) {
  const categories = names(post.categories).join(' ');
  if (/^dev-notes\//.test(sourceOf(post)) || /开发笔记|Development/.test(categories)) return '开发笔记';
  if (/评测|对比|Reviews|Comparisons/i.test(categories)) return '工具比较';
  if (/本地|Local-first|Knowledge Management/i.test(categories) || /^inbox\//.test(sourceOf(post))) return '本地知识';
  return 'AI 工作流';
}
function typeOf(post) {
  if (post.article_type) return post.article_type;
  if (/^(changelog|updates)\//.test(sourceOf(post))) return '产品更新';
  if (/^license\//.test(sourceOf(post)) || /faq|incomplete|not-showing|is-missing|free-trial|free-after-trial/i.test(post.slug)) return '常见问题';
  if (/^(outline|inbox)\//.test(sourceOf(post)) || /Product-Docs|产品文档/.test(post.path)) return '教程';
  return '相关文章';
}
function articleData(post) {
  const tags = names(post.tags), categories = names(post.categories), body = plainText(post.content);
  const href = '/' + post.path.replace(/^\/+/, '');
  const guide = ['/Outline/outline/getting-started/', '/Product-Docs/en/how-to-organize-long-chatgpt-conversations-with-outlinesave/'].includes(href);
  return { title: post.title, summary: plainText(post.description || post.excerpt || body).slice(0,180), href,
    date: post.date.format('YYYY-MM-DD'), updated: (post.updated || post.date).format('YYYY-MM-DD'),
    lang: languageOf(post), group: groupOf(post), type: typeOf(post), tags, categories,
    pin: Number(post.pin) || (guide ? 100 : 0), translationKey: post.translation_key || (guide ? 'outline-guide' : ''),
    keywords: [...categories,...tags,...(Array.isArray(post.keywords) ? post.keywords : [])].join(' '), body };
}
module.exports = { plainText, sourceOf, languageOf, groupOf, typeOf, articleData };

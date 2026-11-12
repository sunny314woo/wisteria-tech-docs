'use strict';
const { parseDocument } = require('htmlparser2');
const dom = require('domutils');
const { escapeHTML: e } = require('hexo-util');
const { articleData, languageOf, plainText } = require('../lib/site-content');
const { head, header, json, pinIcon, version } = require('../lib/site-shell');
const categories = [['all','全部文章','All articles'],['教程','使用教程','Guides'],['产品更新','产品更新','Updates'],['常见问题','常见问题','FAQ'],['相关文章','博客文章','Blog articles']];
const t = (zh,en) => `<span data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</span>`;
const dataOnly = item => { const { body,...rest } = item; return rest; };
function row(item) {
  return `<li class="post-row${item.pin ? ' is-pinned' : ''}"><a class="post-link" href="${e(item.href)}"${item.pin ? ` aria-label="${e(item.title)}（置顶）"` : ''}><span class="row-marker" aria-hidden="true">${item.pin ? pinIcon : ''}</span><span class="post-title">${e(item.title)}</span><time class="post-updated" datetime="${item.updated}" aria-label="更新时间 ${item.updated}">${item.updated.replaceAll('-','.')}</time></a></li>`;
}
function categorySidebar(items, context) {
  const count = new Map();
  items.filter(item=>item.lang==='zh-CN').forEach(item=>item.tags.forEach(tag=>count.set(tag,(count.get(tag)||0)+1)));
  const tags = [...count].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
  return `<nav class="article-categories" aria-label="分类">${categories.map(([type,zh,en])=>`<button class="category" type="button" data-type="${type}" aria-pressed="${String(context.type===type)}">${t(zh,en)}</button>`).join('')}</nav><section class="sidebar-tags" aria-labelledby="tags-label"><div class="tag-heading"><h2 id="tags-label">${t('标签','Tags')} <span class="tag-total">${tags.length}</span></h2><button id="clear-tag" type="button" hidden>${t('清除','Clear')}</button></div><div class="tag-cloud">${tags.map(([tag])=>`<button class="tag-filter" type="button" data-tag="${e(tag)}" aria-pressed="${String(context.tag===tag)}">${e(tag)}</button>`).join('')}</div></section>`;
}
function fixedSidebar(items,current,lang) {
  return `<div class="fixed-articles">${items.filter(item=>item.lang===lang&&item.pin).map(item=>`<a class="fixed-link" href="${e(item.href)}"${current===item.href?' aria-current="page"':''}>${pinIcon}<span>${item.pin>=100?t('插件使用指南','Usage guide'):t('最新产品更新','Latest update')}</span></a>`).join('')}</div>`;
}
function prepareContent(html, title, utility) {
  const document = parseDocument(html || '');
  const toc = [], used = new Set();
  dom.findAll(node=>!!node.attribs?.id,document.children).forEach(node=>used.add(node.attribs.id));
  const h1s = dom.findAll(node=>node.name==='h1',document.children);
  h1s.forEach(node=>{if(utility||plainText(dom.textContent(node))===plainText(title))dom.removeElement(node);else node.name='h2';});
  dom.findAll(node=>node.attribs?.class?.split(' ').includes('wt-docs-breadcrumb'),document.children).forEach(node=>dom.removeElement(node));
  let index=0;
  dom.findAll(node=>node.name==='h2'||node.name==='h3',document.children).forEach(node=>{
    if (!node.attribs.id) { let id; do {id='section-'+(++index);} while(used.has(id)); node.attribs.id=id;used.add(id); }
    node.attribs.tabindex='-1';
    let ancestor=node.parent,lang='';
    while(ancestor){if(ancestor.attribs?.lang){lang=ancestor.attribs.lang;break;}ancestor=ancestor.parent;}
    toc.push({id:node.attribs.id,title:dom.textContent(node),level:node.name,lang});
  });
  dom.findAll(node=>node.name==='pre',document.children).forEach(node=>{node.attribs.tabindex='0';node.attribs.role='region';node.attribs['aria-label']='Code';});
  return {html:dom.getInnerHTML(document),toc};
}
function contextMatches(item,context) {
  return (context.type==='all'||item.type===context.type) && (!context.tag||item.tags.includes(context.tag)) && (!context.category||item.categories.includes(context.category)) && (!context.year||item.date.startsWith(context.year+(context.month?'-'+context.month:'')));
}
function documentPage(hexo,{route,title,description='',lang='zh-CN',active='articles',sidebar,body,payload}) {
  return head(hexo,title,route,description,lang)+`<body id="top" data-page="${payload.kind}"><a class="skip-link" href="#main-content">${t('跳到正文','Skip to content')}</a>${header(hexo,active)}<div class="wrap reader-shell"><aside class="directory" id="directory" aria-label="内容导航"><button class="directory-close" type="button" aria-label="关闭目录">×</button>${sidebar}</aside><main class="document" id="main-content" tabindex="-1"><button class="directory-toggle" type="button" aria-controls="directory" aria-expanded="false"><svg class="icon" aria-hidden="true" viewBox="0 0 16 16"><path d="M1 3h2m2 0h10M1 8h2m2 0h10M1 13h2m2 0h10" stroke="currentColor" fill="none"/></svg>${t('目录','Contents')}</button>${body}</main></div><button class="directory-shade" type="button" aria-label="关闭目录" hidden></button><script type="application/json" id="article-data">${json(payload)}</script><script defer src="/js/article-center.js?v=${version}"></script></body></html>`;
}
function listing(hexo,route,items,context={}) {
  context={type:'all',tag:'',category:'',year:'',month:'',...context};
  const title=context.title || (context.tag?'标签：'+context.tag:context.category || (context.type==='all'?'全部文章':context.type==='教程'?'使用指南':context.type));
  const language=items.some(item=>item.lang==='zh-CN'&&contextMatches(item,context))?'zh-CN':items.some(item=>item.lang==='en'&&contextMatches(item,context))?'en':'zh-CN';
  const visible=items.filter(item=>item.lang===language&&contextMatches(item,context));
  const body=`<div class="list-title"><h1 id="list-heading">${e(title)}</h1><form class="compact-search" role="search"><label class="sr-only" for="article-query">搜索文章</label><svg class="icon" aria-hidden="true" viewBox="0 0 16 16"><circle cx="6.5" cy="6.5" r="5.5" fill="none" stroke="currentColor"/><path d="m10.5 10.5 4.5 4.5" stroke="currentColor"/></svg><input id="article-query" type="search" placeholder="搜索文章"></form><span class="updated-heading">${t('更新时间','Updated')}</span></div><ul class="post-list" id="post-list" aria-label="文章列表">${visible.slice(0,20).map(row).join('')}</ul><p id="list-empty" class="list-empty" role="status"${visible.length?' hidden':''}>${t('没有找到相关文章。','No matching articles.')}</p><div class="more-articles"><button class="button button-secondary" id="load-more" type="button"${visible.length<=20?' hidden':''}>${t('加载更多','Load more')}</button></div>`;
  return documentPage(hexo,{route,title,lang:language,active:context.type==='教程'?'guides':context.type==='产品更新'?'updates':'articles',sidebar:categorySidebar(items,context),body,payload:{kind:'list',lang:language,items:items.map(dataOnly),context}});
}
function reader(hexo,post,items,isPost=true) {
  const route=post.path.replace(/^\/+/,''),lang=languageOf(post),meta=isPost?articleData(post):null;
  const body=prepareContent(post.content, post.title, !isPost);
  const sidebar=fixedSidebar(items,'/'+route,lang)+`<nav class="article-toc" aria-label="本文目录"><h2>${t('本篇目录','On this page')}</h2>${body.toc.map(link=>`<a href="#${e(link.id)}" class="${link.level==='h3'?'toc-sub':''}"${link.lang?` data-content-lang="${e(link.lang)}"`:''}>${e(link.title)}</a>`).join('')}</nav><div class="directory-bottom"><a href="/articles/">${t('全部文章','All articles')} →</a></div>`;
  const peers=meta?.translationKey?items.filter(item=>item.translationKey===meta.translationKey):[];
  const active=meta?.type==='产品更新'?'updates':meta?.type==='常见问题'||route==='faq/index.html'?'faq':meta?.type==='教程'?'guides':'articles';
  return documentPage(hexo,{route,title:post.title,description:post.description||'',lang,active,sidebar,body:`<article class="reading-article"><h1>${e(post.title)}</h1>${meta?.type==='产品更新'?`<p class="article-date"><time datetime="${meta.date}">${meta.date.replaceAll('-','.')}</time></p>`:''}<div class="prose">${body.html}</div></article>`,payload:{kind:'reader',lang,peers:peers.map(dataOnly)}});
}
hexo.extend.filter.register('after_generate',function(){
  const posts=this.locals.get('posts').toArray(),pages=this.locals.get('pages').toArray();
  const items=posts.map(articleData).sort((a,b)=>b.pin-a.pin||b.updated.localeCompare(a.updated)||a.title.localeCompare(b.title));
  posts.forEach(post=>this.route.set(post.path.replace(/^\/+/,''),reader(this,post,items)));
  const taxonomy=[];
  for (const [kind,collection] of [['category',this.locals.get('categories')],['tag',this.locals.get('tags')]]) collection.forEach(item=>taxonomy.push({prefix:item.path.replace(/^\/+/,''),[kind]:item.name}));
  taxonomy.sort((a,b)=>b.prefix.length-a.prefix.length);
  const routes=new Set([...this.route.list().filter(route=>/^(articles|categories|tags|archives)\//.test(route)&&route.endsWith('.html')),'articles/index.html','help/index.html','updates/index.html']);
  for(const route of routes){
    let context={type:'all'};
    if(route==='help/index.html')context.type='教程';
    if(route==='updates/index.html')context.type='产品更新';
    const found=taxonomy.find(item=>route.startsWith(item.prefix));
    if(found)context={...context,...found};
    const archive=route.match(/^archives\/(\d{4})(?:\/(\d{2}))?\//);
    if(archive)Object.assign(context,{year:archive[1],month:archive[2]||'',title:archive[1]+(archive[2]?'.'+archive[2]:'')+' · 归档'});
    this.route.set(route,listing(this,route,items,context));
  }
  pages.filter(page=>/index\.html$/.test(page.path)&&!['help/index.html','updates/index.html'].includes(page.path.replace(/^\/+/,''))&&!/^(categories|tags)\//.test(page.path.replace(/^\//,''))).forEach(page=>this.route.set(page.path.replace(/^\/+/, ''),reader(this,page,items,false)));
},20);

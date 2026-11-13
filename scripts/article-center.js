'use strict';
const { parseDocument } = require('htmlparser2');
const dom = require('domutils');
const { escapeHTML: e } = require('hexo-util');
const { articleData, languageOf, plainText } = require('../lib/site-content');
const { head, header, json, pinIcon, version, searchDialog, icon } = require('../lib/site-shell');
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
const hasClass=(node,name)=>node.attribs?.class?.split(/\s+/).includes(name);
const fragment=html=>parseDocument(html).children[0];
function hasAncestor(node,test){for(let parent=node.parent;parent;parent=parent.parent)if(test(parent))return true;return false;}
function codeBlock(pre,label){
  const content=dom.textContent(parseDocument(dom.getInnerHTML(pre).replace(/<br\s*\/?\s*>/gi,'\n'))).replace(/\n$/,'');
  return fragment(`<div class="code-block"><div class="code-head"><span>${e(label||'Code')}</span><button type="button" class="copy-code">${icon('copy')}${t('复制','Copy')}</button></div><pre tabindex="0" role="region" aria-label="${e(label||'Code')}"><code>${e(content)}</code></pre></div>`);
}
function prepareContent(html, title, utility,meta) {
  const document = parseDocument(html || '');
  const toc = [], related=[], used = new Set();
  dom.findAll(node=>!!node.attribs?.id,document.children).forEach(node=>used.add(node.attribs.id));
  const h1s = dom.findAll(node=>node.name==='h1',document.children);
  h1s.forEach(node=>{if(utility||plainText(dom.textContent(node))===plainText(title))dom.removeElement(node);else node.name='h2';});
  dom.findAll(node=>node.attribs?.class?.split(' ').includes('wt-docs-breadcrumb'),document.children).forEach(node=>dom.removeElement(node));
  dom.findAll(node=>hasClass(node,'outlinesave-core-related'),document.children).forEach(node=>{
    dom.findAll(child=>child.name==='a'&&child.attribs.href,node.children).forEach(link=>related.push({href:link.attribs.href,title:dom.textContent(link)}));
    dom.removeElement(node);
  });
  if(meta?.pin>=100&&meta.lang==='zh-CN'){
    const repeated=dom.findAll(node=>node.name==='h2'&&/^OutlineSave\s*怎么用/.test(dom.textContent(node)),document.children)[0];
    if(repeated){if(repeated.attribs.id)dom.replaceElement(repeated,fragment(`<span id="${e(repeated.attribs.id)}" tabindex="-1" aria-hidden="true"></span>`));else dom.removeElement(repeated);}
    const exportHeading=dom.findAll(node=>node.name==='h2'&&/导出 Markdown/.test(dom.textContent(node)),document.children)[0];
    let paragraph=exportHeading?.next;
    while(paragraph&&paragraph.name!=='p'&&paragraph.name!=='h2')paragraph=paragraph.next;
    if(paragraph?.name==='p')dom.append(paragraph,fragment(`<figure class="reading-figure"><img src="/images/homepage/export-preview.jpg" width="1470" height="693" loading="lazy" alt="OutlineSave 导出的离线 HTML，包含目录、书签、高亮与备注"><figcaption>离线 HTML 导出效果，点击图片查看原图。</figcaption></figure>`));
  }
  dom.findAll(node=>node.name==='figure'&&hasClass(node,'highlight'),document.children).forEach(node=>{
    const codeCell=dom.findOne(child=>hasClass(child,'code'),node.children),pre=codeCell&&dom.findOne(child=>child.name==='pre',codeCell.children);
    if(pre)dom.replaceElement(node,codeBlock(pre,node.attribs.class.split(/\s+/).find(value=>value!=='highlight')));
  });
  dom.findAll(node=>node.name==='pre'&&!hasAncestor(node,parent=>hasClass(parent,'code-block')),document.children).forEach(node=>dom.replaceElement(node,codeBlock(node,'Code')));
  dom.findAll(node=>node.name==='table',document.children).forEach(node=>{
    dom.findAll(child=>child.name==='th',node.children).forEach(cell=>{if(!cell.attribs.scope)cell.attribs.scope='col';});
    dom.replaceElement(node,fragment(`<div class="prose-table" tabindex="0" role="region" aria-label="${meta?.lang==='en'?'Article table':'文章表格'}">${dom.getOuterHTML(node)}</div>`));
  });
  dom.findAll(node=>node.name==='img',document.children).forEach(node=>{
    if(hasAncestor(node,parent=>parent.name==='a'||parent.name==='button'))return;
    node.attribs.loading=node.attribs.loading||'lazy';
    dom.replaceElement(node,fragment(`<button class="article-image" type="button" aria-label="${meta?.lang==='en'?'Enlarge image':'放大图片'}">${dom.getOuterHTML(node)}<span class="zoom-icon">${icon('zoom')}</span></button>`));
  });
  let index=0;
  dom.findAll(node=>node.name==='h2'||node.name==='h3',document.children).forEach(node=>{
    if (!node.attribs.id) { let id; do {id='section-'+(++index);} while(used.has(id)); node.attribs.id=id;used.add(id); }
    node.attribs.tabindex='-1';
    let ancestor=node.parent,lang='';
    while(ancestor){if(ancestor.attribs?.lang){lang=ancestor.attribs.lang;break;}ancestor=ancestor.parent;}
    toc.push({id:node.attribs.id,title:dom.textContent(node),level:node.name,lang});
  });
  dom.findAll(node=>node.name==='pre',document.children).forEach(node=>{node.attribs.tabindex='0';node.attribs.role='region';node.attribs['aria-label']='Code';});
  return {html:dom.getInnerHTML(document),toc:toc.some(link=>link.level==='h2')?toc.filter(link=>link.level==='h2'):toc,related};
}
function contextMatches(item,context) {
  return (context.type==='all'||item.type===context.type) && (!context.tag||item.tags.includes(context.tag)) && (!context.category||item.categories.includes(context.category)) && (!context.year||item.date.startsWith(context.year+(context.month?'-'+context.month:'')));
}
function documentPage(hexo,{route,title,description='',lang='zh-CN',active='articles',sidebar,body,payload}) {
  const imageDialog=payload.kind==='reader'?`<dialog class="article-image-dialog" id="article-image-dialog" closedby="any" aria-label="${lang==='en'?'Image viewer':'查看图片原图'}"><form method="dialog"><button class="image-close" aria-label="${lang==='en'?'Close image':'关闭图片'}">${icon('close')}</button></form><img alt=""></dialog><div class="copy-status sr-only" role="status" aria-live="polite"></div>`:'';
  return head(hexo,title,route,description,lang)+`<body id="top" data-page="${payload.kind}"><a class="skip-link" href="#main-content">${t('跳到正文','Skip to content')}</a>${header(hexo,active)}<div class="wrap reader-shell"><aside class="directory" id="directory" aria-label="内容导航"><button class="directory-close" type="button" aria-label="关闭目录">${icon('close')}</button>${sidebar}</aside><main class="document" id="main-content" tabindex="-1">${payload.kind==='list'?directoryButton():''}${body}</main></div><button class="directory-shade" type="button" aria-label="关闭目录" hidden></button>${searchDialog(hexo)}${imageDialog}<script type="application/json" id="article-data">${json(payload)}</script><script defer src="/js/site-shell.js?v=${version}"></script><script defer src="/js/article-center.js?v=${version}"></script>${payload.kind==='reader'?`<script defer src="/js/article-reading.js?v=${version}"></script>`:''}</body></html>`;
}
function directoryButton(){return `<button class="directory-toggle" type="button" aria-controls="directory" aria-expanded="false">${icon('list')}${t('目录','Contents')}</button>`;}
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
  const body=prepareContent(post.content, post.title, !isPost,meta);
  const guideLabels=[[/安装后打开/,'安装与开始使用'],[/用 Full TOC/,'目录与跳转'],[/目录和书签/,'书签与筛选'],[/Highlight、Underline 和 Note/,'高亮与备注'],[/导出 Markdown/,'导出与离线阅读'],[/OutlineSave 不见了/,'恢复工具栏'],[/隐私方面/,'隐私说明'],[/遇到问题怎么反馈/,'问题反馈']];
  const tocTitle=link=>meta?.pin>=100&&lang==='zh-CN'?(guideLabels.find(([pattern])=>pattern.test(link.title))?.[1]||link.title):link.title;
  const sidebar=`<a class="back-articles" href="/articles/">${icon('back')}${t('全部文章','All articles')}</a><nav class="article-toc" aria-label="本文目录">${body.toc.length?`<h2>${t('本篇目录','On this page')}</h2>`:''}${body.toc.map(link=>`<a href="#${e(link.id)}"${link.lang?` data-content-lang="${e(link.lang)}"`:''}>${e(tocTitle(link).replace(/^\d+\s*[.、]\s*/,''))}</a>`).join('')}</nav>${meta?`<div class="article-tags">${meta.tags.slice(0,4).map(tag=>`<a href="/articles/?tag=${encodeURIComponent(tag)}">${e(tag)}</a>`).join('')}</div>`:''}`;
  const peers=meta?.translationKey?items.filter(item=>item.translationKey===meta.translationKey):[];
  const active=meta?.type==='产品更新'?'updates':meta?.type==='常见问题'||route==='faq/index.html'?'faq':meta?.type==='教程'?'guides':'articles';
  const displayTitle=meta?.pin>=100?(lang==='en'?'OutlineSave usage guide':'OutlineSave 使用指南'):post.title;
  const related=relatedArticles(meta,items,body.related);
  const relatedHTML=related.length?`<section class="related-articles" aria-labelledby="article-related-heading"><h2 id="article-related-heading">${t('相关文章','Related articles')}</h2><ul>${related.map(item=>`<li><a href="${e(item.href)}"><span>${e(item.label||item.title)}</span>${item.updated?`<time datetime="${item.updated}">${item.updated.replaceAll('-','.')}</time>`:''}</a></li>`).join('')}</ul></section>`:'';
  return documentPage(hexo,{route,title:post.title,description:post.description||'',lang,active,sidebar,body:`<article class="reading-article"><header class="article-header"><h1>${e(displayTitle)}</h1><div class="article-meta">${meta?`<span>${t('更新于','Updated')} <time datetime="${meta.updated}">${meta.updated.replaceAll('-','.')}</time></span>`:'<span></span>'}${directoryButton()}</div></header><div class="prose">${body.html}</div></article>${relatedHTML}<footer class="reading-footer"><a href="/articles/">${icon('back')}${t('全部文章','All articles')}</a><a href="#top">${t('回到顶部','Back to top')}${icon('up')}</a></footer>`,payload:{kind:'reader',lang,peers:peers.map(dataOnly)}});
}
function relatedArticles(meta,items,explicit){
  if(!meta)return[];
  const candidates=items.filter(item=>item.lang===meta.lang&&item.href!==meta.href),result=[];
  const add=(item,label)=>{if(item&&!result.some(value=>value.href===item.href))result.push({...item,label});};
  if(meta.pin)add(candidates.find(item=>item.pin&&(meta.pin>=100?item.pin<100:item.pin>=100)));
  explicit.forEach(link=>{const item=candidates.find(value=>value.href===link.href);if(item)add(item,link.title);});
  candidates.map(item=>({item,score:item.tags.filter(tag=>meta.tags.includes(tag)).length*3+item.categories.filter(category=>meta.categories.includes(category)).length*2+(item.type===meta.type?1:0)})).sort((a,b)=>b.score-a.score||b.item.updated.localeCompare(a.item.updated)).forEach(({item})=>add(item));
  return result.slice(0,Math.max(3,explicit.length+(meta.pin?1:0)));
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

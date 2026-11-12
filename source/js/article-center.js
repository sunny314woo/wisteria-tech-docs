(()=>{
'use strict';
const $=selector=>document.querySelector(selector),payload=JSON.parse($('#article-data').textContent);
let language=payload.lang||'zh-CN';
try{language=localStorage.getItem('wisteria-ui-language')||language;}catch(_){}
const text=(zh,en)=>language==='en'?en:zh;
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const navLabels={guides:['使用指南','Guides'],demos:['功能演示','Demos'],updates:['产品更新','Updates'],faq:['常见问题','FAQ'],articles:['文章','Articles']};
const typeLabels={all:['全部文章','All articles'],'教程':['使用指南','Guides'],'产品更新':['产品更新','Updates'],'常见问题':['常见问题','FAQ'],'相关文章':['博客文章','Blog articles']};
const directory=$('#directory'),toggle=$('.directory-toggle'),shade=$('.directory-shade'),close=$('.directory-close'),nav=$('#site-nav'),menu=$('.mobile-toggle');
const narrow=matchMedia('(max-width:850px)');
function openDirectory(open){
  directory.dataset.open=String(open);shade.hidden=!open;shade.dataset.open=String(open);toggle.setAttribute('aria-expanded',String(open));
  $('.document').inert=open;$('.site-header').inert=open;
  if(open){directory.setAttribute('role','dialog');directory.setAttribute('aria-modal','true');close.focus();}
  else{directory.removeAttribute('role');directory.removeAttribute('aria-modal');}
}
const closeDirectory=()=>{openDirectory(false);toggle.focus();};
toggle.addEventListener('click',()=>openDirectory(true));close.addEventListener('click',closeDirectory);shade.addEventListener('click',closeDirectory);
narrow.addEventListener('change',()=>openDirectory(false));
document.addEventListener('keydown',event=>{
  if(directory.dataset.open==='true'){
    if(event.key==='Escape'){event.preventDefault();closeDirectory();}
    if(event.key==='Tab'){const controls=[...directory.querySelectorAll('a[href],button:not([hidden])')].filter(el=>el.getClientRects().length);const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  }
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search();}
});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.dataset.open=String(open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.dataset.open='false';}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){nav.dataset.open='false';menu.setAttribute('aria-expanded','false');menu.focus();}});
$('.home-theme').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('wisteria-ui-theme',theme);}catch(_){}});
const search=()=>{if(payload.kind==='list'){$('#article-query').focus();$('#article-query').scrollIntoView({block:'center'});}else location.href='/articles/#article-query';};
$('[data-open-search]').addEventListener('click',search);
function applyLanguage(){
  document.documentElement.dataset.uiLang=language;
  if(payload.kind==='list')document.documentElement.lang=language;
  document.querySelectorAll('[data-zh][data-en]').forEach(el=>el.textContent=el.dataset[language==='en'?'en':'zh']);
  document.querySelectorAll('[data-nav]').forEach(el=>el.textContent=text(...navLabels[el.dataset.nav]));
  $('.header-search>span').textContent=text('搜索','Search');$('.header-search').setAttribute('aria-label',text('搜索文章','Search articles'));
  $('.official').firstChild.textContent=text('产品官网 ','Product website ');
  $('.home-language').textContent=text('EN','中文');$('.home-language').setAttribute('aria-label',text('切换语言','Switch language'));
  $('.home-theme').textContent=text('外观','Theme');$('.home-theme').setAttribute('aria-label',text('切换明暗模式','Toggle color theme'));
  menu.setAttribute('aria-label',text('展开导航','Open navigation'));close.setAttribute('aria-label',text('关闭目录','Close contents'));
  directory.setAttribute('aria-label',text('内容导航','Content navigation'));
  if(payload.kind==='reader'){
    document.querySelectorAll('.wt-home-lang-zh,.wt-home-lang-en').forEach(el=>el.hidden=el.classList.contains(language==='en'?'wt-home-lang-zh':'wt-home-lang-en'));
    document.querySelectorAll('.article-toc>[data-content-lang]').forEach(el=>el.hidden=(el.dataset.contentLang.startsWith('en')?'en':'zh-CN')!==language);
    if($('.wt-home-lang-zh')){$('.reading-article>h1').textContent=text('常见问题与支持','FAQ & support');}
    refreshToc();
  }else{renderTags();render();}
}
$('.home-language').addEventListener('click',()=>{
  const next=language==='en'?'zh-CN':'en';try{localStorage.setItem('wisteria-ui-language',next);}catch(_){}
  const peer=payload.peers?.find(item=>item.lang===next);
  if(peer){location.href=peer.href;return;}
  language=next;applyLanguage();
});
let tocLinks=[];
function refreshToc(){tocLinks=[...document.querySelectorAll('.article-toc>a')].filter(link=>!link.hidden);syncToc();}
function syncToc(){if(!tocLinks.length)return;let current=tocLinks[0];for(const link of tocLinks){const heading=document.getElementById(decodeURIComponent(link.hash.slice(1)));if(heading&&heading.getBoundingClientRect().top<=140)current=link;}tocLinks.forEach(link=>link.setAttribute('aria-current',String(link===current)));}
let frame=false;
document.addEventListener('scroll',()=>{if(!frame){frame=true;requestAnimationFrame(()=>{frame=false;syncToc();});}},{passive:true});
directory.addEventListener('click',event=>{const link=event.target.closest('.article-toc>a');if(link&&narrow.matches){openDirectory(false);document.getElementById(decodeURIComponent(link.hash.slice(1)))?.focus();}});
if(payload.kind==='reader'){applyLanguage();return;}
const items=payload.items,context=payload.context,params=new URLSearchParams(location.search),validTypes=new Set(Object.keys(typeLabels));
let type=validTypes.has(params.get('type'))?params.get('type'):context.type,tag=params.get('tag')||context.tag||'',category=params.get('category')??context.category,limit=20;
if(params.get('q'))$('#article-query').value=params.get('q');
if((tag||category)&&!items.some(item=>item.lang===language&&(!tag||item.tags.includes(tag))&&(!category||item.categories.includes(category))))language=payload.lang;
const pinIcon='<svg class="pin-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M8 3h8l-1 6 4 4v2H5v-2l4-4-1-6Z"/><path d="M12 15v7"/></svg>';
function renderTags(){
  const counts=new Map();items.filter(item=>item.lang===language).forEach(item=>item.tags.forEach(value=>counts.set(value,(counts.get(value)||0)+1)));
  const tags=[...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
  $('.tag-total').textContent=String(tags.length);
  $('.tag-cloud').innerHTML=tags.map(([value,count])=>`<button class="tag-filter" type="button" data-tag="${escapeHTML(value)}" aria-pressed="${String(tag===value)}" aria-label="${escapeHTML(value)} (${count})">${escapeHTML(value)}</button>`).join('');
}
function syncUrl(){const url=new URL(location.href);if((context.tag&&!tag)||(context.category&&!category))url.pathname='/articles/';for(const [key,value]of Object.entries({type:type===context.type?'':type,tag:tag||'',q:$('#article-query').value.trim(),category:category===context.category?'':category||''})){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);}history.replaceState(null,'',url);}
function render(){
  const query=$('#article-query').value.trim().toLowerCase();const words=query.split(/\s+/u).filter(Boolean);
  const filtered=items.filter(item=>(item.lang===language||words.length>0)&&(type==='all'||item.type===type)&&(!tag||item.tags.includes(tag))&&(!category||item.categories.includes(category))&&(!context.year||item.date.startsWith(context.year+(context.month?'-'+context.month:'')))&&words.every(word=>(item.title+' '+item.summary+' '+item.keywords+' '+(item.body||'')).toLowerCase().includes(word)));
  const visible=filtered.slice(0,limit);
  $('#post-list').innerHTML=visible.map(item=>`<li class="post-row${item.pin?' is-pinned':''}"><a class="post-link" href="${escapeHTML(item.href)}"${item.pin?' aria-label="'+escapeHTML(item.title)+text('（置顶）',' (pinned)')+'"':''}><span class="row-marker" aria-hidden="true">${item.pin?pinIcon:''}</span><span class="post-title">${escapeHTML(item.title)}</span><time class="post-updated" datetime="${item.updated}" aria-label="${text('更新时间 ','Updated ')}${item.updated}">${item.updated.replaceAll('-','.')}</time></a></li>`).join('');
  $('#list-empty').hidden=filtered.length>0;$('#load-more').hidden=visible.length>=filtered.length;$('#clear-tag').hidden=!tag;
  $('#list-heading').textContent=tag||category||context.title||text(...typeLabels[type]);
  $('#article-query').placeholder=text('搜索文章','Search articles');
  document.querySelectorAll('.category').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.type===type)));
  document.querySelectorAll('.tag-filter').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tag===tag)));
  syncUrl();
}
let fullSearch;
async function loadFullSearch(){
  if(!fullSearch)fullSearch=fetch('/home-search.json').then(response=>{if(!response.ok)throw Error('Search unavailable');return response.json();}).then(index=>{const bodies=new Map(index.map(item=>[item.href,item.body]));items.forEach(item=>item.body=bodies.get(item.href)||'');render();}).catch(()=>{fullSearch=null;});
  await fullSearch;
}
$('.article-categories').addEventListener('click',event=>{const button=event.target.closest('[data-type]');if(!button)return;type=button.dataset.type;category='';limit=20;render();if(narrow.matches)closeDirectory();});
$('.tag-cloud').addEventListener('click',event=>{const button=event.target.closest('[data-tag]');if(!button)return;tag=tag===button.dataset.tag?'':button.dataset.tag;limit=20;render();if(narrow.matches)closeDirectory();});
$('#clear-tag').addEventListener('click',()=>{tag='';limit=20;render();});
$('.compact-search').addEventListener('submit',event=>event.preventDefault());
$('#article-query').addEventListener('input',()=>{limit=20;render();if($('#article-query').value.trim())void loadFullSearch();});
$('#load-more').addEventListener('click',()=>{limit+=20;render();});
applyLanguage();if(params.get('q'))void loadFullSearch();if(location.hash==='#article-query')$('#article-query').focus();
})();

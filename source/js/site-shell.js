(()=>{
'use strict';
const $=selector=>document.querySelector(selector);
const dialog=$('#site-search-dialog'),input=$('#site-search-query'),menu=$('.mobile-toggle'),nav=$('#site-nav');
let language=document.documentElement.lang.startsWith('en')?'en':'zh-CN';
try{language=localStorage.getItem('wisteria-ui-language')||language;}catch(_){}
const t=(zh,en)=>language==='en'?en:zh;
const labels={home:['文档首页','Docs home'],guides:['使用指南','Guides'],demos:['功能演示','Demos'],updates:['产品更新','Updates'],faq:['常见问题','FAQ'],articles:['文章','Articles']};
const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\s._+\-]/gu,' ').replace(/\s+/g,' ').trim();
let items,request,limit=20,composing=false;
function closeMenu(){delete nav.dataset.open;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('展开导航','Open navigation'));}
function setLanguage(next){
  language=next==='en'?'en':'zh-CN';
  document.documentElement.dataset.uiLang=language;
  document.querySelectorAll('.site-header [data-zh],#site-search-dialog [data-zh]').forEach(el=>el.textContent=el.dataset[language==='en'?'en':'zh']);
  document.querySelectorAll('[data-nav]').forEach(el=>el.textContent=t(...labels[el.dataset.nav]));
  $('.brand').setAttribute('aria-label',t('Wisteria 文档首页','Wisteria documentation home'));
  $('.brand').title=t('返回文档首页','Back to documentation home');
  $('.header-search>span').textContent=t('搜索','Search');$('.header-search').setAttribute('aria-label',t('搜索文档','Search documentation'));
  $('.official-desktop').textContent=t('官网首页','Website');$('.official-mobile').textContent=t('官网','Website');
  $('.home-language').textContent=t('EN','中文');$('.home-language').setAttribute('aria-label',t('切换语言','Switch language'));
  $('.home-theme').textContent=t('外观','Theme');$('.home-theme').setAttribute('aria-label',t('切换明暗模式','Toggle color theme'));
  $('.site-dialog-close').setAttribute('aria-label',t('关闭搜索','Close search'));
  nav.setAttribute('aria-label',t('主要导航','Main navigation'));
  input.placeholder=t('搜索文章、教程、更新…','Search articles, guides, updates…');
  menu.setAttribute('aria-label',menu.getAttribute('aria-expanded')==='true'?t('收起导航','Close navigation'):t('展开导航','Open navigation'));
  if(items&&dialog.open)render();
  try{localStorage.setItem('wisteria-ui-language',language);}catch(_){}
}
function loadSearch(){
  if(!request)request=fetch('/home-search.json').then(response=>{
    if(!response.ok)throw Error('Search unavailable');return response.json();
  }).then(index=>{
    items=index.map(item=>({...item,titleText:normalize(item.title),summaryText:normalize(item.summary),keywordsText:normalize(item.keywords),bodyText:normalize(item.body)}));return items;
  }).catch(error=>{request=null;throw error;});
  return request;
}
function snippet(item,words){
  const body=(item.body||item.summary||'').replace(/\s+/g,' '),found=words.find(word=>body.toLowerCase().includes(word));
  if(!found&&item.summary)return item.summary;
  const position=found?body.toLowerCase().indexOf(found):0,start=Math.max(0,position-22);
  return(start?'…':'')+body.slice(start,start+115)+(body.length>start+115?'…':'');
}
function render(){
  if(!items)return;
  const words=normalize(input.value).split(' ').filter(Boolean);
  const found=items.map(item=>{
    let score=item.lang===language?(words.length?8:1000):0;
    for(const word of words){
      const title=item.titleText.includes(word),summary=item.summaryText.includes(word),keywords=item.keywordsText.includes(word),body=item.bodyText.includes(word);
      if(!title&&!summary&&!keywords&&!body)return null;
      score+=(title?40:0)+(summary?12:0)+(keywords?16:0)+(body?1:0);
    }
    if(!words.length)score+=item.pin||0;
    return{item,score};
  }).filter(Boolean).sort((a,b)=>b.score-a.score||(b.item.updated||b.item.date||'').localeCompare(a.item.updated||a.item.date||''));
  $('.site-search-meta').textContent=words.length?t(`找到 ${found.length} 篇结果`,`${found.length} results`):t(`全部文档 · ${items.length} 篇`,`All documentation · ${items.length}`);
  $('#site-search-results').replaceChildren(...found.slice(0,limit).map(({item})=>{
    const li=document.createElement('li'),link=document.createElement('a'),title=document.createElement('span'),description=document.createElement('p');
    link.href=item.href;title.className='site-search-result-title';title.textContent=item.title;description.textContent=snippet(item,words);
    link.append(title,description);li.append(link);return li;
  }));
  $('.site-search-empty').hidden=found.length>0;$('.site-search-more').hidden=found.length<=limit;
}
async function fetchResults(){
  $('.site-search-meta').textContent=t('正在加载文档…','Loading documentation…');$('.site-search-retry').hidden=true;
  try{await loadSearch();render();}catch(_){$('.site-search-meta').textContent=t('文档加载失败，请重试','Unable to load documentation. Please retry.');$('.site-search-retry').hidden=false;}
}
function openSearch(value=''){
  if(document.querySelector('dialog[open]')&&!dialog.open)return;
  if(document.querySelector('.directory[data-open="true"]'))return;
  closeMenu();input.value=typeof value==='string'?value:'';limit=20;$('.site-search-scroll').scrollTop=0;
  if(!dialog.open)dialog.showModal();input.focus({preventScroll:true});
  if(items)render();else void fetchResults();
}
menu.addEventListener('click',()=>{
  if(menu.getAttribute('aria-expanded')==='true')closeMenu();else{nav.dataset.open='true';menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label',t('收起导航','Close navigation'));}
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
$('.home-theme').addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;
  try{localStorage.setItem('wisteria-ui-theme',theme);}catch(_){}
});
document.querySelectorAll('[data-open-search]').forEach(button=>button.addEventListener('click',()=>openSearch()));
input.addEventListener('input',()=>{limit=20;$('.site-search-scroll').scrollTop=0;render();});
input.addEventListener('compositionstart',()=>{composing=true;});input.addEventListener('compositionend',()=>{composing=false;render();});
$('#site-search-form').addEventListener('submit',event=>{event.preventDefault();if(!composing)$('#site-search-results a')?.click();});
$('.site-search-more').addEventListener('click',()=>{limit+=20;render();});$('.site-search-retry').addEventListener('click',fetchResults);
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'&&!document.querySelector('dialog[open]')){event.preventDefault();openSearch();}
  if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}
});
if(!('closedBy'in HTMLDialogElement.prototype)){
  const outside=(event,target)=>{const box=target.getBoundingClientRect();return event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom;};
  document.querySelectorAll('dialog[closedby="any"]').forEach(target=>{let pressedOutside=false;target.addEventListener('pointerdown',event=>{pressedOutside=outside(event,target);});target.addEventListener('pointerup',event=>{if(pressedOutside&&outside(event,target))target.close();});});
}
window.WisteriaSite={openSearch,loadSearch,setLanguage};setLanguage(language);
})();

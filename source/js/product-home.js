  (()=>{
    'use strict';
    const base='';
    const content=JSON.parse(document.getElementById('home-content').textContent);
    let items=content.search;
    let searchLoaded=false;let searchRequest=null;
    const relatedArticles=content.articles;
    const articleGrid=document.getElementById('related-article-grid');
    const articleTemplate=document.getElementById('article-template');
    const articleMore=document.getElementById('article-more');
    let articleTopic='all';let expandedArticles=false;
    let language='zh-CN';
    const t=(zh,en)=>language==='en'?en:zh;
    const groupLabel=group=>({ 'AI 工作流':'AI workflows','工具比较':'Tool comparisons','本地知识':'Local knowledge','开发笔记':'Developer notes' })[group]||group;
    const typeLabel=type=>({'教程':'Guides','常见问题':'FAQ','产品更新':'Updates','相关文章':'Articles'})[type]||type;
    function renderArticles(){
      const filtered=relatedArticles.filter(article=>(article.lang===language)&&(articleTopic==='all'||article.group===articleTopic));
      const visible=expandedArticles?filtered:filtered.slice(0,6);
      const cards=visible.map(article=>{
        const fragment=articleTemplate.content.cloneNode(true);
        fragment.querySelector('[data-article-group]').textContent=t(article.group,groupLabel(article.group));
        fragment.querySelector('[data-article-link]').firstChild.textContent=t('阅读文章 ','Read article ');
        const title=fragment.querySelector('[data-article-title]');title.textContent=article.title;title.href=base+article.href;
        fragment.querySelector('[data-article-summary]').textContent=article.summary;
        const date=fragment.querySelector('[data-article-date]');date.dateTime=article.date;date.textContent=article.date.replaceAll('-','.');
        fragment.querySelector('[data-article-link]').href=base+article.href;
        return fragment;
      });
      articleGrid.replaceChildren(...cards);
      if(!cards.length){const empty=document.createElement('p');empty.className='empty-state';empty.style.gridColumn='1 / -1';empty.textContent=t('这个主题暂时没有当前语言的文章，可以浏览全部文章。','No articles in this language yet. Browse all articles in the archive.');articleGrid.append(empty);}
      document.getElementById('article-count').textContent=articleTopic==='all'?t('精选 '+filtered.length+' 篇 · 更多内容见全部文章',filtered.length+' articles · Browse the archive for more'):t(articleTopic+' · '+filtered.length+' 篇',groupLabel(articleTopic)+' · '+filtered.length+' articles');
      articleMore.hidden=filtered.length<=6;
      articleMore.textContent=expandedArticles?t('收起文章','Show fewer'):t('展开更多文章（'+(filtered.length-6)+'）','Show '+(filtered.length-6)+' more articles');
    }
    document.querySelectorAll('.article-filter').forEach(button=>button.addEventListener('click',()=>{articleTopic=button.dataset.topic;expandedArticles=false;document.querySelectorAll('.article-filter').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));renderArticles();}));
    articleMore.addEventListener('click',()=>{expandedArticles=!expandedArticles;renderArticles();});
    const searchDialog=document.getElementById('search-dialog');
    const query=document.getElementById('search-query');
    const results=document.getElementById('search-results');
    let activeType='all';
    function renderSearch(){
      const term=query.value.trim().toLocaleLowerCase();
      const words=term.split(/\s+/u).filter(Boolean);
      const found=items.filter(item=>(activeType==='all'||item.type===activeType)&&words.every(word=>(item.title+' '+item.summary+' '+item.keywords+' '+(item.body||'')).toLocaleLowerCase().includes(word)))
        .map(item=>({item,score:(item.lang===language?100:0)+(term&&item.title.toLocaleLowerCase().includes(term)?40:0)+(item.type==='常见问题'||item.type==='教程'?5:0)}))
        .sort((a,b)=>b.score-a.score).map(result=>result.item);
      results.replaceChildren();
      document.getElementById('search-count').textContent=found.length?t('找到 '+found.length+' 条相关内容',found.length+' results'):t('没有找到匹配内容','No matching content');
      if(!found.length){const p=document.createElement('p');p.className='empty-state';p.textContent=t('试试更短的关键词，例如“目录”“导出”或“授权”。也可以从首页的任务入口浏览指南。','Try a shorter keyword, or browse guides and articles from the homepage.');results.append(p);return;}
      found.forEach(item=>{
        const a=document.createElement('a');a.className='search-result';a.href=item.href;
        const type=document.createElement('span');type.className='search-result-type';type.textContent=t(item.type,typeLabel(item.type));
        const title=document.createElement('h3');title.textContent=item.title;
        const summary=document.createElement('p');
        const match=words.length&&item.body?item.body.toLocaleLowerCase().indexOf(words[0]):-1;
        summary.textContent=match>=0?(match>45?'…':'')+item.body.slice(Math.max(0,match-45),match+135):item.summary;
        a.append(type,title,summary);results.append(a);
      });
    }
    async function loadSearch(){
      if(searchLoaded)return;
      if(!searchRequest)searchRequest=fetch('/home-search.json').then(response=>{if(!response.ok)throw new Error('Search index unavailable');return response.json();});
      try{items=await searchRequest;searchLoaded=true;if(searchDialog.open)renderSearch();}
      catch(error){searchRequest=null;document.getElementById('search-count').textContent=t('全文索引暂时不可用，仍可按标题检索。','Full-text search is unavailable. Title search still works.');}
    }
    function openSearch(value=''){query.value=value;activeType='all';document.querySelectorAll('.filter').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.type==='all')));renderSearch();if(!searchDialog.open)searchDialog.showModal();query.focus();void loadSearch();}
    document.getElementById('hero-search-form').addEventListener('submit',event=>{event.preventDefault();openSearch(document.getElementById('hero-query').value);});
    document.querySelectorAll('[data-open-search]').forEach(button=>button.addEventListener('click',()=>openSearch()));
    document.querySelectorAll('[data-query]').forEach(button=>button.addEventListener('click',()=>openSearch(language==='en'?({'目录不完整':'incomplete','免费':'free'}[button.dataset.query]||button.dataset.query):button.dataset.query)));
    query.addEventListener('input',renderSearch);
    document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{activeType=button.dataset.type;document.querySelectorAll('.filter').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));renderSearch();}));
    document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'&&!document.querySelector('dialog[open]')){event.preventDefault();openSearch();}});
    const menuToggle=document.querySelector('.mobile-toggle');const nav=document.getElementById('site-nav');
    menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?t('收起导航','Close navigation'):t('展开导航','Open navigation'));nav.dataset.open=String(open);});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label',t('展开导航','Open navigation'));nav.dataset.open='false';}));
    document.querySelectorAll('[data-release]').forEach(button=>button.addEventListener('click',()=>document.getElementById('release-dialog').showModal()));
    const demoDialog=document.getElementById('demo-dialog');const demoContent=document.getElementById('demo-content');
    const searchImage='/images/homepage/outline-search.webp';
    const demoUrl='/images/homepage/export-demo.html';
    document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
      demoContent.replaceChildren();
      if(button.dataset.demo==='export'){
        document.getElementById('demo-title').textContent=t('离线 HTML 交互演示','Offline HTML: interactive demo');document.getElementById('demo-subtitle').textContent=t('实际导出样例 · 可体验目录、搜索和书签','Real export · Try the outline, search and bookmarks');
        const iframe=document.createElement('iframe');iframe.title=t('OutlineSave 中文离线导出交互样例','OutlineSave interactive HTML sample (Chinese)');iframe.setAttribute('sandbox','allow-scripts');iframe.src=demoUrl;demoContent.append(iframe);
        const note=document.createElement('div');note.className='demo-instruction';const text=document.createElement('span');text.textContent=t('试试目录和搜索；书签更改仅用于本次体验。','Try the outline and search. Bookmark changes last for this session.');const link=document.createElement('a');link.href=base+t('/Outline/outline/offline-html-export/','/Product-Docs/en/how-to-save-chatgpt-as-searchable-offline-html/');link.target='_blank';link.rel='noopener';link.textContent=t('阅读导出教程','Read the export guide');note.append(text,link);demoContent.append(note);
      }else{
        document.getElementById('demo-title').textContent=t('从关键词找回原回答','Find an earlier answer with a keyword');document.getElementById('demo-subtitle').textContent=t('OutlineSave 检索界面与操作步骤','OutlineSave search interface and steps');
        const image=document.createElement('img');image.src=searchImage;image.alt='OutlineSave 的关键词检索面板';demoContent.append(image);
        const steps=document.createElement('div');steps.className='search-steps';const ol=document.createElement('ol');(language==='en'?['Open the outline sidebar and choose search.','Enter a keyword and review matching prompts or headings.','Choose an item to return to the answer and its context.']:['打开目录侧边栏，点击搜索入口。','输入记得的关键词，查看匹配的提问或标题。','选择对应条目，回到原始回答并阅读上下文。']).forEach(text=>{const li=document.createElement('li');li.textContent=text;ol.append(li);});steps.append(ol);demoContent.append(steps);
      }
      demoDialog.showModal();
    }));
    demoDialog.addEventListener('close',()=>demoContent.replaceChildren());

    const translations={
  "跳到主要内容": "Skip to main content",
  "产品信息中心": "Product information center",
  "使用指南": "Guides",
  "功能演示": "Demos",
  "产品更新": "Updates",
  "常见问题": "FAQ",
  "相关文章": "Articles",
  "文章": "Articles",
  "精选文章": "Featured articles",
  "搜索": "Search",
  "产品官网": "Product website",
  "WISTERIA SOFTWARE · 官方指南": "WISTERIA SOFTWARE · OFFICIAL GUIDES",
  "产品指南与动态，": "Product guides & updates.",
  "一站找到。": "All in one place.",
  "从第一次上手，到长对话整理与内容保存。": "From getting started to organizing and saving long conversations.",
  "教程、实际演示和产品更新，都在这里。": "Guides, real demos and product updates, together.",
  "热门问题": "Popular",
  "目录不完整": "Incomplete outline",
  "离线 HTML": "Offline HTML",
  "免费版与 PRO": "Free & PRO",
  "长对话整理与保存": "Organize and keep long conversations",
  "打开交互演示": "Try the interactive demo",
  "真实导出效果 · 可体验目录、搜索与书签": "A real export · Try outlines, search and bookmarks",
  "导出额度与免费目录范围调整": "Export credits and Free outline access",
  "OutlineSave 3.11.0 · 每周 3 次 HTML/PDF 导出、免费目录前 100 条跳转及导航与界面优化。": "OutlineSave 3.11.0 · 3 shared weekly exports, first 100 Free outline entries, navigation and UI improvements.",
  "阅读更新公告": "Read the update",
  "开始使用": "GET STARTED",
  "你想了解什么？": "What would you like to do?",
  "按使用任务找教程，从这里开始。": "Start with the guide for your task.",
  "全部使用指南": "All guides",
  "安装与快速入门": "Installation & first steps",
  "完成首次设置，": "Set up the extension",
  "了解基本操作。": "and learn the basics.",
  "目录与关键词检索": "Outline & keyword search",
  "理清对话结构，": "See the conversation structure",
  "找回以前的回答。": "and return to earlier answers.",
  "高亮、备注与书签": "Highlights, notes & bookmarks",
  "留下重点与想法，": "Keep key points and ideas",
  "方便下一次回看。": "for your next review.",
  "导出与离线保存": "Export & offline copies",
  "了解导出格式，": "Choose an export format",
  "保存有价值的对话。": "and keep valuable conversations.",
  "购买授权与支持": "Licensing & support",
  "试用、激活说明，": "Trials, activation",
  "以及常见问题排查。": "and troubleshooting.",
  "看见效果，再开始操作。": "See it in action. Then try it.",
  "从真实界面了解产品，也可以亲手试一试。": "Explore real examples and try the product experience.",
  "观看功能视频": "Watch the feature video",
  "交互体验": "Interactive demo",
  "可直接操作": "Try it yourself",
  "保存后的对话，是什么样子？": "What does an exported conversation look like?",
  "打开一个真实导出样例，试试两级目录、全文搜索与书签。": "Open a real export and try its outline, full-text search and bookmarks.",
  "图文演示": "Visual walkthrough",
  "目录与检索": "Outline & search",
  "界面与操作步骤": "Interface and steps",
  "记得关键词，如何找到原回答？": "Remember a keyword? Find the original answer.",
  "从关键词找到相关目录，再回到原始上下文继续阅读。": "Find matching outline items, then return to their original context.",
  "查看检索步骤": "View the search steps",
  "功能视频": "Feature video",
  "目录、搜索与导出": "Outline, search and export",
  "把长对话变成容易回看的内容": "Make long conversations easier to revisit",
  "观看完整功能演示，了解目录导航、查找、书签和内容保存。": "Watch an overview of navigation, search, bookmarks and exports.",
  "前往 YouTube 观看": "Watch on YouTube",
  "全部 FAQ": "All FAQs",
  "为什么长对话的目录不完整？": "Why is my long-chat outline incomplete?",
  "HTML、PDF 和 Markdown 应该怎么选？": "Should I choose HTML, PDF or Markdown?",
  "试用结束后，还可以继续使用吗？": "Can I keep using it after the trial?",
  "购买后如何激活，或找回授权？": "How can I activate or recover a license?",
  "遇到问题，怎样提交反馈？": "How can I report a problem?",
  "完整更新记录": "All release notes",
  "调整免费 HTML/PDF 导出额度与目录跳转范围，优化导航稳定性与部分 UI。": "Updated Free export credits and outline access, plus navigation stability and UI improvements.",
  "2026 年 11 月 12 日 · OutlineSave": "November 12, 2026 · OutlineSave",
  "授权读取与兼容性修复": "License and compatibility fixes",
  "改善更新后的授权读取等问题。": "Improved license recovery after updates.",
  "2026 年 10 月 30 日 · OutlineSave": "October 30, 2026 · OutlineSave",
  "超长对话目录加载改进": "Better loading for long outlines",
  "改进历史内容加载与远距离定位体验。": "Improved history loading and navigation to distant messages.",
  "2026 年 9 月 22 日 · OutlineSave": "September 22, 2026 · OutlineSave",
  "阅读与探索": "READ & EXPLORE",
  "产品教程之外，还有 AI 工作流、工具比较、本地知识与开发笔记。": "Beyond product guides: AI workflows, tool comparisons, local knowledge and developer notes.",
  "浏览分类": "Browse categories",
  "全部文章": "All articles",
  "全部主题": "All topics",
  "AI 工作流": "AI workflows",
  "工具比较": "Tool comparisons",
  "本地知识": "Local knowledge",
  "开发笔记": "Developer notes",
  "没有找到想要的答案？": "Still looking for an answer?",
  "告诉我们你遇到的问题，或前往官网了解更多产品信息。": "Tell us what happened, or visit our website to explore our products.",
  "联系支持": "Contact support",
  "前往产品官网": "Visit product website",
  "隐私": "Privacy",
  "支持": "Support",
  "返回顶部": "Back to top",
  "© 2026 Wisteria Software Ltd · 官方产品指南与实用教程": "© 2026 Wisteria Software Ltd · Official guides and practical tutorials",
  "查找教程、问题与文章": "Search guides, questions and articles",
  "使用教程": "Guides",
  "博客文章": "Articles",
  "全部": "All",
  "搜索教程、功能或文章": "Search guides, features or articles",
  "试试“目录”“本地知识”或“开发笔记”": "Try “outline”, “local knowledge” or “developer notes”",
  "切换语言": "Switch language",
  "主要导航": "Main navigation",
  "页脚导航": "Footer navigation",
  "按主题筛选相关文章": "Filter articles by topic",
  "筛选搜索结果": "Filter search results",
  "搜索文档": "Search documentation",
  "切换明暗模式": "Toggle color theme",
  "外观": "Theme",
  "展开导航": "Open navigation",
  "收起导航": "Close navigation",
  "关闭搜索": "Close search",
  "关闭更新公告": "Close update",
  "关闭演示": "Close demo",
  "打开 OutlineSave 离线 HTML 交互演示": "Open the OutlineSave interactive HTML demo",
  "体验离线 HTML 的目录、搜索与书签": "Try the offline HTML outline, search and bookmarks",
  "查看长对话关键词检索的界面与步骤": "View the keyword-search interface and steps",
  "在 YouTube 观看 OutlineSave 目录、搜索与导出功能视频": "Watch OutlineSave navigation, search and export on YouTube",
  "2026 年 11 月": "November 2026",
  "本次更新调整免费版的使用范围，并改善日常操作体验：": "This update changes Free allowances and improves everyday use:",
  "免费 HTML/PDF 每周共用 3 次导出额度，每周一恢复。": "3 shared Free HTML/PDF exports per week, resetting every Monday.",
  "免费用户每个对话前 100 条目录可跳转；PRO 可使用全部目录跳转。": "Free navigation covers the first 100 entries per chat; PRO unlocks all entries.",
  "优化导航稳定性和部分 UI，统一账户权益展示。": "Improved navigation stability, selected UI and account benefits display.",
  "功能可用范围与具体说明，请以当前安装的插件版本及完整发布记录为准。": "Check your installed version and the full release notes for availability and details.",
  "查看完整更新说明": "Read the full release notes",
  "目录排查指南": "outline troubleshooting guide",
  "导出与保存指南": "export and saving guide",
  "免费版与 PRO 问答": "Free & PRO FAQ",
  "官方支持页面": "support page",
  "长对话的历史内容可能还在分段加载。先确认插件已启用并等待目录获取完成；仍然缺失时，可按": "Older messages may still be loading in stages. Check that the extension is active and wait for the outline to complete. If items are still missing, follow the ",
  "继续检查。": " for further checks.",
  "交互式离线回看可选 HTML；固定版式阅读和打印可选 PDF；继续编辑或进入笔记工作流可选 Markdown。查看": "Choose HTML for interactive offline reading, PDF for fixed-layout reading and printing, or Markdown for editing. See the ",
  "了解使用方式。": " to learn more.",
  "可以继续使用免费版。不同功能的可用范围与额度，请以当前插件内的说明为准；已有许可证按购买时承诺的权益执行。详细说明见": "Yes, you can continue on the Free plan. See the extension for current allowances. Existing licenses retain their purchased rights. Read the ",
  "。": ".",
  "请检查购买时使用的邮箱，按照授权邮件完成激活。找不到邮件或激活异常时，可以通过": "Check the email address used at purchase and follow the activation email. If it is missing or activation fails, contact us through the ",
  "联系我们。请不要公开分享激活码。": ". Keep activation codes private.",
  "可以从插件弹窗进入 BUG 反馈，或访问": "Open BUG feedback from the extension popup, or visit the ",
  "。说明使用的网站、插件版本与复现步骤；如需附截图，请先检查其中的私人内容。": ". Include the website, extension version and steps to reproduce. Check screenshots for private content before sending."
};
    const originalText=new WeakMap();
    const originalAttributes=new WeakMap();
    function applyLanguage(next){
      language=next==='en'?'en':'zh-CN';
      document.documentElement.lang=language;
      document.documentElement.dataset.uiLang=language;
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      while(walker.nextNode()){
        const node=walker.currentNode;
        if(node.parentElement.closest('script,style,template,#related-article-grid,#search-results,#demo-content'))continue;
        const original=originalText.get(node)||node.nodeValue;originalText.set(node,original);
        const key=original.trim();if(translations[key])node.nodeValue=language==='en'?original.replace(key,translations[key]):original;
      }
      document.querySelectorAll('[placeholder],[aria-label]').forEach(element=>{
        const original=originalAttributes.get(element)||{placeholder:element.getAttribute('placeholder'),label:element.getAttribute('aria-label')};originalAttributes.set(element,original);
        if(original.placeholder&&translations[original.placeholder])element.setAttribute('placeholder',language==='en'?translations[original.placeholder]:original.placeholder);
        if(original.label&&translations[original.label])element.setAttribute('aria-label',language==='en'?translations[original.label]:original.label);
      });
      document.querySelector('.home-language').textContent=language==='en'?'中文':'EN';
      document.querySelectorAll('[data-original-href],a[href^="/Outline/"],a[href^="/Product-Docs/zh/"],a[href^="/faq/#"],a[href^="/Updates/"]').forEach(link=>{
        if(!link.dataset.originalHref)link.dataset.originalHref=link.getAttribute('href');
        const href=link.dataset.originalHref;
        const english={
          '/faq/#free-pro':'/faq/#free-pro-en',
          '/Updates/outline/3-11-0/':'/Updates/en/outline/3-11-0/',
          '/faq/#subscription':'/faq/#subscription-en',
          '/Outline/outline/getting-started/':'/Product-Docs/en/how-to-organize-long-chatgpt-conversations-with-outlinesave/',
          '/Outline/outline/long-conversation-outline/':'/Product-Docs/en/how-to-add-an-outline-sidebar-to-chatgpt-for-faster-navigation/',
          '/Outline/outline/bookmarks-and-highlights/':'/Product-Docs/en/05-how-to-bookmark-important-chatgpt-answers/',
          '/Outline/outline/offline-html-export/':'/Product-Docs/en/how-to-save-chatgpt-as-searchable-offline-html/',
          '/Product-Docs/zh/chatgpt-long-conversation-outline-incomplete-or-missing/':'/Product-Docs/en/faq-chatgpt-outline-incomplete-long-conversation/'
        };
        link.href=language==='en'?(english[href]||href):href;
      });
      renderArticles();if(searchDialog.open)renderSearch();
      try{localStorage.setItem('wisteria-ui-language',language);}catch(_){}
    }
    document.querySelector('.home-language').addEventListener('click',()=>applyLanguage(language==='en'?'zh-CN':'en'));
    document.querySelector('.home-theme').addEventListener('click',()=>{
      const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;
      try{localStorage.setItem('wisteria-ui-theme',theme);}catch(_){}
    });
    let savedLanguage;try{savedLanguage=localStorage.getItem('wisteria-ui-language');}catch(_){}
    applyLanguage(savedLanguage||(navigator.language.startsWith('zh')?'zh-CN':'en'));
    if(!('closedBy' in HTMLDialogElement.prototype)){
      const outside=(event,dialog)=>{const r=dialog.getBoundingClientRect();return event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom;};
      document.querySelectorAll('dialog[closedby="any"]').forEach(dialog=>{let pressedOutside=false;dialog.addEventListener('pointerdown',event=>{pressedOutside=outside(event,dialog);});dialog.addEventListener('pointerup',event=>{if(pressedOutside&&outside(event,dialog))dialog.close();});});
    }
  })();

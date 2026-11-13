'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {parseDocument}=require('htmlparser2');
const dom=require('domutils');
const root=path.resolve('public');
const htmlFiles=[];
function walk(directory){for(const item of fs.readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,item.name);if(item.isDirectory())walk(file);else if(file.endsWith('.html'))htmlFiles.push(file);}}
walk(root);
const find=(tree,test)=>dom.findAll(test,tree.children);
const byClass=(tree,name)=>find(tree,node=>node.attribs?.class?.split(' ').includes(name));
const header=html=>html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0].replace(/ aria-current="page"/g,'');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const expectedHeader=header(home);assert(expectedHeader,'Shared home header missing');
const broken=[];let interiorCount=0,linkCount=0;
for(const file of htmlFiles){
  const relative=path.relative(root,file);
  if(relative.startsWith('images/'))continue;
  const html=fs.readFileSync(file,'utf8');
  assert(!html.includes('__SITE_HEADER__'),'Unresolved header in '+relative);
  const tree=parseDocument(html);
  assert.equal(find(tree,node=>node.attribs?.id==='site-search-dialog').length,1,'Missing shared search at '+relative);
  assert(html.includes('src="/js/site-shell.js?'),'Missing shared behavior at '+relative);
  assert(html.includes('href="/images/wisteria-docs.svg"'),'Missing shared favicon at '+relative);
  if(relative!=='index.html'){
    assert(html.includes('reader-shell'),'Legacy inner layout at '+relative);
    assert.equal(header(html),expectedHeader,'Header differs in '+relative);interiorCount++;
    const ids=find(tree,node=>node.attribs?.id).map(node=>node.attribs.id);
    assert.equal(ids.length,new Set(ids).size,'Duplicate IDs in '+relative);
    assert.equal(find(tree,node=>node.name==='h1').length,1,'Expected one title in '+relative);
    assert(byClass(tree,'directory').length===1,'Missing left directory in '+relative);
    const payloadNode=find(tree,node=>node.attribs?.id==='article-data')[0];
    const payload=JSON.parse(dom.textContent(payloadNode));
    if(payload.kind==='reader'){
      assert.equal(byClass(tree,'fixed-articles').length,0,'Pinned navigation repeated in reader');
      assert.equal(byClass(tree,'article-meta').length,1,'Missing compact article metadata');
      const toc=byClass(tree,'article-toc')[0];
      find(toc,node=>node.name==='a').forEach(link=>assert(ids.includes(link.attribs.href.slice(1)),'Broken article contents at '+relative));
      byClass(tree,'code-block').forEach(block=>{assert.equal(byClass(block,'copy-code').length,1);assert.equal(find(block,node=>node.name==='code').length,1);});
    }
    if(payload.kind==='list'){
      assert.equal(find(tree,node=>node.name==='input'&&node.attribs.type==='search').length,1,'Duplicate article search at '+relative);
      assert(payload.items.length>=89,'Article index lost posts');
      const rows=byClass(tree,'post-row');
      rows.forEach(row=>{assert.equal(find(row,node=>node.name==='p').length,0,'Article summary in compact list');assert.equal(find(row,node=>node.name==='time').length,1,'Missing update date');});
      if(relative==='articles/index.html'){
        const titles=rows.slice(0,2).map(row=>dom.textContent(byClass(row,'post-title')[0]));
        assert(titles[0].includes('怎么用'),'Usage guide is not first');assert(titles[1].includes('3.11.0'),'Current update is not second');
        assert.equal(rows.filter(row=>row.attribs.class.includes('is-pinned')).length,2,'Expected two pinned articles');
        assert(byClass(tree,'tag-filter').length>=41,'Missing existing tags');
      }
    }
  }
  for(const node of find(tree,node=>node.name==='a'&&node.attribs?.href)){
    const href=node.attribs.href;if(!href.startsWith('/'))continue;
    const clean=decodeURIComponent(href.split(/[?#]/)[0]);const target=path.join(root,clean.endsWith('/')?clean+'index.html':clean);
    linkCount++;if(!fs.existsSync(target))broken.push(relative+' → '+href);
  }
}
assert.equal(broken.length,0,'Broken internal links:\n'+broken.join('\n'));
for(const source of ['css/product-home.css','css/site-shell.css','css/article-center.css','css/article-reading.css','js/article-center.js','js/product-home.js','js/site-shell.js','js/article-reading.js'])assert.equal(fs.readFileSync('source/'+source,'utf8'),fs.readFileSync(path.join(root,source),'utf8'),'Static asset was rendered as a page: '+source);
const update=fs.readFileSync(path.join(root,'Updates/outline/3-11-0/index.html'),'utf8');
const updateText=dom.textContent(parseDocument(update));
for(const token of ['3.11.0','前 100 条目录','每周一恢复','3 次 HTML','导航稳定性','界面优化'])assert(updateText.includes(token),'Release announcement missing '+token);
assert(home.includes('href="/articles/"'),'Home Article menu is not a page link');
console.log(`Interiors validated: ${interiorCount} pages, shared headers, two pinned articles, ${linkCount} links checked; all internal targets exist.`);

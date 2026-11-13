(()=>{
'use strict';
const english=()=>document.documentElement.dataset.uiLang==='en';
const viewer=document.getElementById('article-image-dialog');
document.querySelectorAll('.article-image').forEach(button=>button.addEventListener('click',()=>{
  const image=button.querySelector('img'),enlarged=viewer.querySelector('img');
  enlarged.src=image.currentSrc||image.src;enlarged.alt=image.alt;
  viewer.setAttribute('aria-label',english()?'Image viewer':'查看图片原图');
  viewer.querySelector('button').setAttribute('aria-label',english()?'Close image':'关闭图片');
  viewer.showModal();
}));
document.querySelectorAll('.copy-code').forEach(button=>button.addEventListener('click',async()=>{
  const code=button.closest('.code-block').querySelector('code');
  try{
    await navigator.clipboard.writeText(code.textContent);
    button.querySelector('span').textContent=english()?'Copied':'已复制';
    document.querySelector('.copy-status').textContent=english()?'Code copied':'代码已复制';
    setTimeout(()=>{button.querySelector('span').textContent=english()?'Copy':'复制';},1600);
  }catch(_){
    const range=document.createRange();range.selectNodeContents(code);
    const selection=getSelection();selection.removeAllRanges();selection.addRange(range);
    document.querySelector('.copy-status').textContent=english()?'Code selected. Use your system copy shortcut.':'已选中代码，可使用系统复制快捷键';
  }
}));
})();

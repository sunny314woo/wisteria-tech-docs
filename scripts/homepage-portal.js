'use strict';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  if (!value) return '';
  if (typeof value.format === 'function') return value.format('YYYY-MM-DD');
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

function latestUpdatesHtml() {
  const posts = hexo.locals.get('posts');
  if (!posts || typeof posts.sort !== 'function') return '';

  return posts.sort('-updated').limit(3).toArray().map(post => {
    const title = escapeHtml(post.title);
    const date = formatDate(post.updated || post.date);
    const path = '/' + String(post.path || '').replace(/^\/+/, '');
    return `<a class="wt-home-update" href="${path}"><time>${date}</time><span>${title}</span><span class="wt-home-arrow" aria-hidden="true">→</span></a>`;
  }).join('');
}

function homePortalHtml() {
  const updates = latestUpdatesHtml();

  return `
<section class="wt-docs-home-portal" aria-labelledby="wt-docs-home-title">
  <div class="wt-home-lang wt-home-lang-zh">
    <div class="wt-home-hero">
      <div class="wt-home-eyebrow">Wisteria Software</div>
      <h1 id="wt-docs-home-title">Wisteria Docs</h1>
      <p>关于 AI 对话整理、导航、导出与长期保存的实用指南。</p>
      <button class="wt-home-search popup-trigger" type="button" aria-label="搜索文档">
        <span class="wt-home-search-icon" aria-hidden="true">⌕</span>
        <span>搜索教程、FAQ 与故障排查</span>
        <kbd>⌘K / Ctrl K</kbd>
      </button>
    </div>

    <section class="wt-home-section" aria-labelledby="wt-home-popular-zh">
      <div class="wt-home-section-head"><h2 id="wt-home-popular-zh">常用指南</h2></div>
      <div class="wt-home-list wt-home-list-two">
        <a href="/Product-Docs/zh/chatgpt-long-conversation-outline-incomplete-or-missing/"><span>ChatGPT 长对话目录不完整或不显示？</span><span class="wt-home-arrow">→</span></a>
        <a href="/Outline/outline/offline-html-export/"><span>把 ChatGPT 保存成可搜索的离线 HTML</span><span class="wt-home-arrow">→</span></a>
        <a href="/Product-Docs/zh/why-chatgpt-official-outline-not-showing/"><span>为什么 ChatGPT 官方目录没有出现？</span><span class="wt-home-arrow">→</span></a>
      </div>
    </section>

    <section class="wt-home-section" aria-labelledby="wt-home-outlinesave-zh">
      <div class="wt-home-section-head">
        <div>
          <div class="wt-home-product-label">OUTLINESAVE</div>
          <h2 id="wt-home-outlinesave-zh">整理和保存长 AI 对话</h2>
          <p>目录导航、标注、搜索筛选，以及 HTML / Markdown 导出。</p>
        </div>
        <a class="wt-home-text-link" href="/categories/产品指南/">查看全部指南 →</a>
      </div>
      <div class="wt-home-topic-grid">
        <a href="/Product-Docs/zh/chatgpt-long-conversation-outline-incomplete-or-missing/"><strong>长对话导航</strong><span>理解长对话为什么难以完整加载，并快速定位旧回答。</span></a>
        <a href="/Outline/outline/offline-html-export/"><strong>离线 HTML</strong><span>把重要对话保存成本地、可搜索的知识页。</span></a>
        <a href="/Outline/outline/markdown-export/"><strong>Markdown 导出</strong><span>继续编辑、版本管理，或进入自己的知识库工作流。</span></a>
        <a href="/categories/FAQ/"><strong>FAQ</strong><span>查找目录、加载、导出和使用过程中的常见问题。</span></a>
      </div>
    </section>

    <section class="wt-home-section" aria-labelledby="wt-home-trouble-zh">
      <div class="wt-home-section-head"><h2 id="wt-home-trouble-zh">故障排查</h2><a class="wt-home-text-link" href="/categories/FAQ/">全部 FAQ →</a></div>
      <div class="wt-home-list">
        <a href="/Product-Docs/zh/why-chatgpt-official-outline-not-showing/"><span>ChatGPT 官方目录没有出现</span><span class="wt-home-arrow">→</span></a>
        <a href="/Product-Docs/zh/chatgpt-long-conversation-outline-incomplete-or-missing/"><span>长对话目录不完整、旧内容暂时无法定位</span><span class="wt-home-arrow">→</span></a>
      </div>
    </section>

    <section class="wt-home-section wt-home-latest" aria-labelledby="wt-home-latest-zh">
      <div class="wt-home-section-head"><h2 id="wt-home-latest-zh">最近更新</h2><a class="wt-home-text-link" href="/archives/">查看归档 →</a></div>
      <div class="wt-home-updates">${updates}</div>
    </section>
  </div>

  <div class="wt-home-lang wt-home-lang-en">
    <div class="wt-home-hero">
      <div class="wt-home-eyebrow">Wisteria Software</div>
      <h1>Wisteria Docs</h1>
      <p>Practical guides for navigating, organizing, exporting and keeping your AI conversations.</p>
      <button class="wt-home-search popup-trigger" type="button" aria-label="Search documentation">
        <span class="wt-home-search-icon" aria-hidden="true">⌕</span>
        <span>Search guides, FAQ and troubleshooting</span>
        <kbd>⌘K / Ctrl K</kbd>
      </button>
    </div>

    <section class="wt-home-section" aria-labelledby="wt-home-popular-en">
      <div class="wt-home-section-head"><h2 id="wt-home-popular-en">Popular guides</h2></div>
      <div class="wt-home-list wt-home-list-two">
        <a href="/Product-Docs/en/why-chatgpt-table-of-contents-is-not-showing/"><span>Why is the ChatGPT table of contents not showing?</span><span class="wt-home-arrow">→</span></a>
        <a href="/Product-Docs/en/how-to-save-chatgpt-as-searchable-offline-html/"><span>Save ChatGPT as searchable offline HTML</span><span class="wt-home-arrow">→</span></a>
        <a href="/Product-Docs/en/how-to-add-an-outline-sidebar-to-chatgpt-for-faster-navigation/"><span>Add an outline sidebar for faster navigation</span><span class="wt-home-arrow">→</span></a>
      </div>
    </section>

    <section class="wt-home-section" aria-labelledby="wt-home-outlinesave-en">
      <div class="wt-home-section-head">
        <div>
          <div class="wt-home-product-label">OUTLINESAVE</div>
          <h2 id="wt-home-outlinesave-en">Organize and keep long AI conversations</h2>
          <p>Outline navigation, annotations, search and filters, plus HTML and Markdown export.</p>
        </div>
        <a class="wt-home-text-link" href="/categories/Product-Guides/">View all guides →</a>
      </div>
      <div class="wt-home-topic-grid">
        <a href="/Product-Docs/en/how-to-add-an-outline-sidebar-to-chatgpt-for-faster-navigation/"><strong>Navigation</strong><span>Jump through long conversations without endless scrolling.</span></a>
        <a href="/Product-Docs/en/how-to-save-chatgpt-as-searchable-offline-html/"><strong>Offline HTML</strong><span>Keep a local, searchable knowledge page with structure and annotations.</span></a>
        <a href="/Product-Docs/en/how-to-export-chatgpt-to-markdown-with-outlinesave/"><strong>Markdown export</strong><span>Continue editing, versioning or moving content into your knowledge workflow.</span></a>
        <a href="/categories/FAQ/"><strong>FAQ</strong><span>Find answers for outline, loading, export and everyday usage problems.</span></a>
      </div>
    </section>

    <section class="wt-home-section" aria-labelledby="wt-home-trouble-en">
      <div class="wt-home-section-head"><h2 id="wt-home-trouble-en">Troubleshooting</h2><a class="wt-home-text-link" href="/categories/FAQ/">View all FAQ →</a></div>
      <div class="wt-home-list">
        <a href="/Product-Docs/en/why-chatgpt-table-of-contents-is-not-showing/"><span>ChatGPT outline or table of contents is missing</span><span class="wt-home-arrow">→</span></a>
        <a href="/Product-Docs/en/how-to-add-an-outline-sidebar-to-chatgpt-for-faster-navigation/"><span>Navigating a very long ChatGPT conversation is too slow</span><span class="wt-home-arrow">→</span></a>
      </div>
    </section>

    <section class="wt-home-section wt-home-latest" aria-labelledby="wt-home-latest-en">
      <div class="wt-home-section-head"><h2 id="wt-home-latest-en">Latest updates</h2><a class="wt-home-text-link" href="/archives/">View archive →</a></div>
      <div class="wt-home-updates">${updates}</div>
    </section>
  </div>
</section>`;
}

function addHomeBodyClass(html) {
  return html.replace(/<body([^>]*)>/, (match, attrs) => {
    if (/\sclass=(['"])/.test(attrs)) {
      return `<body${attrs.replace(/class=(['"])(.*?)\1/, (classMatch, quote, value) => `class=${quote}${value} wt-docs-home${quote}`)}>`;
    }
    return `<body${attrs} class="wt-docs-home">`;
  });
}

hexo.extend.filter.register('after_render:html', (html, data) => {
  const outputPath = String(data && data.path || '').replace(/^\/+/, '');
  if (outputPath !== 'index.html') return html;
  if (html.includes('wt-docs-home-portal')) return html;

  const marker = '<div class="main-inner index posts-expand">';
  if (!html.includes(marker)) {
    hexo.log.warn('[homepage-portal] NexT index marker not found; homepage was left unchanged.');
    return html;
  }

  return addHomeBodyClass(html).replace(marker, `${marker}${homePortalHtml()}`);
});

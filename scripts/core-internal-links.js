'use strict';

/**
 * Contextual internal-link graph for the 16 audited Outlinesave core guides.
 *
 * Why this is generated here instead of adding the same generic block to every
 * Markdown file:
 * - every page gets only a small set of genuinely relevant next steps;
 * - old unaudited SEO posts are deliberately excluded;
 * - Chinese and English clusters stay separate;
 * - links are emitted in final HTML, so crawlers and readers can follow them.
 */

const ZH = {
  start: '/Outline/outline/getting-started/',
  toolbar: '/Outline/outline/floating-toolbar-and-full-outline/',
  long: '/Outline/outline/long-conversation-outline/',
  bookmark: '/Outline/outline/bookmarks-and-highlights/',
  markdown: '/Outline/outline/markdown-export/',
  html: '/Outline/outline/offline-html-export/',
  incomplete: '/Product-Docs/zh/chatgpt-long-conversation-outline-incomplete-or-missing/',
  official: '/Product-Docs/zh/why-chatgpt-official-outline-not-showing/'
};

const EN = {
  organize: '/Product-Docs/en/how-to-organize-long-chatgpt-conversations-with-outlinesave/',
  sidebar: '/Product-Docs/en/how-to-add-an-outline-sidebar-to-chatgpt-for-faster-navigation/',
  long: '/Product-Docs/en/01-how-to-navigate-long-chatgpt-conversations-without-endless-scrolling/',
  bookmark: '/Product-Docs/en/05-how-to-bookmark-important-chatgpt-answers/',
  markdown: '/Product-Docs/en/how-to-export-chatgpt-to-markdown-with-outlinesave/',
  html: '/Product-Docs/en/how-to-save-chatgpt-as-searchable-offline-html/',
  incomplete: '/Product-Docs/en/faq-chatgpt-outline-incomplete-long-conversation/',
  official: '/Product-Docs/en/why-chatgpt-table-of-contents-is-not-showing/'
};

const graph = {
  // Chinese: product/manual cluster
  [ZH.start]: {
    title: '继续阅读',
    links: [
      [ZH.long, 'ChatGPT 对话太长怎么快速找到以前的回答？'],
      [ZH.bookmark, 'ChatGPT 怎么加书签？'],
      [ZH.markdown, 'ChatGPT 怎么导出 Markdown？'],
      [ZH.html, 'ChatGPT 怎么导出 HTML？']
    ]
  },
  [ZH.toolbar]: {
    title: '相关教程',
    links: [
      [ZH.long, '长对话目录与跳转教程'],
      [ZH.bookmark, 'Bookmark 与 Bookmark Filter 怎么用？'],
      [ZH.start, 'Outlinesave 完整入门教程']
    ]
  },
  [ZH.long]: {
    title: '遇到相关问题？',
    links: [
      [ZH.official, 'ChatGPT 官方目录为什么没有出现？'],
      [ZH.incomplete, '长对话目录为什么不完整或不显示？'],
      [ZH.bookmark, '找到旧回答后，怎样用 Bookmark 避免下次再找？']
    ]
  },
  [ZH.bookmark]: {
    title: '下一步',
    links: [
      [ZH.long, '先用长对话目录找到重要回答'],
      [ZH.markdown, '把 Bookmark 重点导出为 Markdown'],
      [ZH.html, '把 Bookmark 重点保存为离线 HTML']
    ]
  },
  [ZH.markdown]: {
    title: '相关导出教程',
    links: [
      [ZH.html, 'Markdown 还是离线 HTML？查看 HTML 导出教程'],
      [ZH.bookmark, '只想导出重点？先了解 Bookmark Filter'],
      [ZH.start, '返回 Outlinesave 完整使用教程']
    ]
  },
  [ZH.html]: {
    title: '相关导出教程',
    links: [
      [ZH.markdown, '需要继续编辑？查看 Markdown 导出教程'],
      [ZH.bookmark, '只保存重点？了解 Bookmark Filter'],
      [ZH.long, '超长对话先用目录定位和整理']
    ]
  },
  [ZH.incomplete]: {
    title: '继续排查与使用',
    links: [
      [ZH.official, '如果是 ChatGPT 官方目录完全没有出现'],
      [ZH.long, '如果你需要实际导航超长对话'],
      [ZH.bookmark, '找到重要回答后用 Bookmark 保存位置']
    ]
  },
  [ZH.official]: {
    title: '继续阅读',
    links: [
      [ZH.incomplete, '目录出现了但内容不完整、编号变化怎么办？'],
      [ZH.long, '怎样导航超长 ChatGPT 对话？'],
      [ZH.start, '了解 Outlinesave 的完整工作流']
    ]
  },

  // English: search/product-guide cluster
  [EN.organize]: {
    title: 'Related guides',
    links: [
      [EN.long, 'Navigate long ChatGPT conversations without endless scrolling'],
      [EN.bookmark, 'Bookmark important ChatGPT answers'],
      [EN.markdown, 'Export ChatGPT to Markdown'],
      [EN.html, 'Save ChatGPT as searchable offline HTML']
    ]
  },
  [EN.sidebar]: {
    title: 'Related guides',
    links: [
      [EN.long, 'Navigate very long ChatGPT conversations'],
      [EN.bookmark, 'Use bookmarks and Bookmark Filter'],
      [EN.organize, 'Organize a long ChatGPT conversation from start to finish']
    ]
  },
  [EN.long]: {
    title: 'Related troubleshooting and workflow guides',
    links: [
      [EN.official, 'Why is the native ChatGPT Table of Contents not showing?'],
      [EN.incomplete, 'Why can a long-conversation outline be incomplete?'],
      [EN.bookmark, 'Bookmark answers you want to revisit']
    ]
  },
  [EN.bookmark]: {
    title: 'Related guides',
    links: [
      [EN.long, 'Find old answers in a long conversation'],
      [EN.markdown, 'Export bookmarked turns to Markdown'],
      [EN.html, 'Save bookmarked turns as offline HTML']
    ]
  },
  [EN.markdown]: {
    title: 'Related export guides',
    links: [
      [EN.html, 'Choose searchable offline HTML for richer offline reading'],
      [EN.bookmark, 'Use Bookmark Filter before a focused export'],
      [EN.organize, 'See the complete Outlinesave organization workflow']
    ]
  },
  [EN.html]: {
    title: 'Related export guides',
    links: [
      [EN.markdown, 'Choose Markdown when you want to keep editing'],
      [EN.bookmark, 'Use bookmarks to create a focused archive'],
      [EN.long, 'Organize and navigate the long conversation before archiving it']
    ]
  },
  [EN.incomplete]: {
    title: 'Related troubleshooting guides',
    links: [
      [EN.official, 'If the native ChatGPT Table of Contents is completely missing'],
      [EN.long, 'If you need to navigate a very long conversation'],
      [EN.sidebar, 'If you want an additional outline sidebar']
    ]
  },
  [EN.official]: {
    title: 'Related guides',
    links: [
      [EN.incomplete, 'If the outline appears but is incomplete or still loading'],
      [EN.long, 'Navigate long ChatGPT conversations without endless scrolling'],
      [EN.sidebar, 'Add an outline sidebar for an additional navigation layer']
    ]
  }
};

function normalizePath(value) {
  if (!value) return '';
  try {
    const url = new URL(value, 'https://blog.wisteriasoftware.uk');
    let path = url.pathname || '/';
    if (!path.endsWith('/')) path += '/';
    return path;
  } catch (_) {
    let path = String(value).split('#')[0].split('?')[0];
    if (!path.startsWith('/')) path = '/' + path;
    if (!path.endsWith('/')) path += '/';
    return path;
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

hexo.extend.filter.register('after_post_render', function addCoreInternalLinks(data) {
  const key = normalizePath(data.permalink || data.path);
  const node = graph[key];
  if (!node || !data.content) return data;

  // Avoid duplicate injection in unusual multi-pass builds.
  if (data.content.includes('data-outlinesave-core-links="1"')) return data;

  const items = node.links
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join('\n');

  data.content += `\n<section class="outlinesave-core-related" data-outlinesave-core-links="1">\n<h2>${escapeHtml(node.title)}</h2>\n<ul>\n${items}\n</ul>\n</section>\n`;
  return data;
});

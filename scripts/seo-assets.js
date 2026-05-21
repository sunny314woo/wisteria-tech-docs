'use strict';

function siteUrlFor(hexo, pathname) {
  const siteUrl = String(hexo.config.url || '').replace(/\/$/, '');
  const root = String(hexo.config.root || '/').replace(/\/$/, '');
  const cleanPath = String(pathname || '').replace(/^\//, '');
  return `${siteUrl}${root}/${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
}

function xmlEscape(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function plainText(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/\s+/g, ' ')
    .trim();
}

function toIsoDate(value) {
  if (!value) return '';
  if (typeof value.toISOString === 'function') return value.toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

function namesFromCollection(collection) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection.map(item => item.name || item);
  if (typeof collection.toArray === 'function') {
    return collection.toArray().map(item => item.name || item.slug || item);
  }
  return [];
}

function uniqueByPath(items) {
  const seen = new Set();
  return items.filter(item => {
    if (item.path === null || item.path === undefined || seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

function sitemapEntry(hexo, item, fallbackPriority) {
  const updated = toIsoDate(item.updated || item.date);
  const priority = item.priority || fallbackPriority;
  return [
    '  <url>',
    `    <loc>${xmlEscape(siteUrlFor(hexo, item.path))}</loc>`,
    updated ? `    <lastmod>${updated}</lastmod>` : '',
    `    <priority>${priority}</priority>`,
    '  </url>'
  ].filter(Boolean).join('\n');
}

hexo.extend.generator.register('seo-sitemap', function(locals) {
  const posts = locals.posts.sort('-date').toArray().map(post => ({
    path: post.path,
    date: post.date,
    updated: post.updated,
    priority: '0.8'
  }));
  const pages = locals.pages.toArray().map(page => ({
    path: page.path,
    date: page.date,
    updated: page.updated,
    priority: page.path === 'about/' ? '0.6' : '0.5'
  }));
  const sections = [
    { path: '', priority: '1.0' },
    { path: 'archives/', priority: '0.4' },
    { path: 'categories/', priority: '0.4' },
    { path: 'tags/', priority: '0.4' }
  ];
  const categories = locals.categories.toArray().map(category => ({
    path: category.path,
    updated: category.updated,
    priority: '0.4'
  }));
  const tags = locals.tags.toArray().map(tag => ({
    path: tag.path,
    updated: tag.updated,
    priority: '0.3'
  }));

  const entries = uniqueByPath([...sections, ...pages, ...posts, ...categories, ...tags])
    .map(item => sitemapEntry(hexo, item, '0.5'))
    .join('\n');

  return {
    path: 'sitemap.xml',
    data: [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      entries,
      '</urlset>'
    ].join('\n')
  };
});

hexo.extend.generator.register('seo-robots', function() {
  return {
    path: 'robots.txt',
    data: [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${siteUrlFor(hexo, 'sitemap.xml')}`
    ].join('\n')
  };
});

hexo.extend.generator.register('seo-atom-feed', function(locals) {
  const latestPost = locals.posts.sort('-date').first();
  const updated = toIsoDate(latestPost?.updated || latestPost?.date);
  const entries = locals.posts.sort('-date').limit(30).toArray().map(post => {
    const summary = post.description || plainText(post.excerpt || post.content).slice(0, 220);
    const categories = namesFromCollection(post.categories);
    const tags = namesFromCollection(post.tags);
    return [
      '  <entry>',
      `    <title>${xmlEscape(post.title)}</title>`,
      `    <link href="${xmlEscape(siteUrlFor(hexo, post.path))}"/>`,
      `    <id>${xmlEscape(siteUrlFor(hexo, post.path))}</id>`,
      `    <published>${toIsoDate(post.date)}</published>`,
      `    <updated>${toIsoDate(post.updated || post.date)}</updated>`,
      categories[0] ? `    <category term="${xmlEscape(categories[0])}"/>` : '',
      ...tags.slice(0, 8).map(tag => `    <category term="${xmlEscape(tag)}"/>`),
      `    <summary>${xmlEscape(summary)}</summary>`,
      '  </entry>'
    ].filter(Boolean).join('\n');
  }).join('\n');

  return {
    path: 'atom.xml',
    data: [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<feed xmlns="http://www.w3.org/2005/Atom">',
      `  <title>${xmlEscape(hexo.config.title)}</title>`,
      `  <subtitle>${xmlEscape(hexo.config.description)}</subtitle>`,
      `  <link href="${xmlEscape(siteUrlFor(hexo, 'atom.xml'))}" rel="self"/>`,
      `  <link href="${xmlEscape(siteUrlFor(hexo, ''))}"/>`,
      `  <id>${xmlEscape(siteUrlFor(hexo, ''))}</id>`,
      `  <updated>${updated}</updated>`,
      `  <author><name>${xmlEscape(hexo.config.author || 'Wisteria Software')}</name></author>`,
      entries,
      '</feed>'
    ].join('\n')
  };
});

hexo.extend.generator.register('seo-llms', function(locals) {
  const posts = locals.posts.sort('-date').limit(40).toArray().map(post => {
    const summary = post.description || plainText(post.excerpt || post.content).slice(0, 180);
    return `- [${post.title}](${siteUrlFor(hexo, post.path)}): ${summary}`;
  }).join('\n');

  return {
    path: 'llms.txt',
    data: [
      '# Wisteria Blog',
      '',
      '> Wisteria Software blog about AI conversation workflows, ChatGPT, Gemini, outline navigation, structured Markdown export, bookmarks, local-first archiving, and privacy-friendly knowledge management.',
      '',
      '## Core Links',
      '',
      '- Official website: https://wisteriasoftware.uk',
      '- Chrome Web Store: https://chromewebstore.google.com/detail/opbngifmlnoahbhjhgmngkggedlofddj',
      '- GitHub: https://github.com/sunny314woo',
      '- Sitemap: https://blog.wisteriasoftware.uk/sitemap.xml',
      '- Feed: https://blog.wisteriasoftware.uk/atom.xml',
      '',
      '## Product Scope',
      '',
      '- ChatGPT Gemini Outline & Export is a browser extension for ChatGPT and Gemini.',
      '- It creates outline navigation for long conversations.',
      '- It supports bookmarks, highlighted messages, and structured Markdown export.',
      '- It is local-first: conversation processing happens locally and user conversation content is not uploaded by the extension.',
      '',
      '## Recent Articles',
      '',
      posts
    ].join('\n')
  };
});

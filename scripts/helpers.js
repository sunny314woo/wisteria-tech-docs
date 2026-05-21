'use strict';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function namesFromCollection(collection) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection.map(item => item.name || item);
  if (typeof collection.toArray === 'function') {
    return collection.toArray().map(item => item.name || item.slug || item);
  }
  return [];
}

function absoluteUrl(pathname) {
  const siteUrl = String(hexo.config.url || '').replace(/\/$/, '');
  const root = String(hexo.config.root || '/').replace(/\/$/, '');
  const cleanPath = String(pathname || '').replace(/^\//, '');
  return `${siteUrl}${root}/${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
}

function stripHtml(value) {
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

function markdownToPlainText(value) {
  return stripHtml(String(value || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/[*_~>]/g, ' '));
}

function extractFaqItems(post) {
  const raw = post.raw || post._content || post.content || '';
  const faqStart = String(raw).search(/^##\s+(FAQ|常见问题)/im);
  if (faqStart < 0) return [];

  const faqSection = String(raw).slice(faqStart).replace(/^##\s+.+$/m, '');
  const endMatch = faqSection.search(/\n##\s+(?!#)/);
  const body = endMatch >= 0 ? faqSection.slice(0, endMatch) : faqSection;
  let matches = [...body.matchAll(/^###\s+(.+?)\s*\n([\s\S]*?)(?=\n###\s+|\n##\s+|$)/gm)];
  if (!matches.length) {
    matches = [...body.matchAll(/^\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*.+?\*\*\s*\n|\n##\s+|$)/gm)];
  }

  return matches
    .map(match => ({
      '@type': 'Question',
      name: markdownToPlainText(match[1]),
      acceptedAnswer: {
        '@type': 'Answer',
        text: markdownToPlainText(match[2]).slice(0, 900)
      }
    }))
    .filter(item => item.name && item.acceptedAnswer.text)
    .slice(0, 8);
}

function dateToIso(value) {
  if (!value) return undefined;
  if (typeof value.toISOString === 'function') return value.toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function postSchema(post) {
  const categories = namesFromCollection(post.categories);
  const tags = namesFromCollection(post.tags);
  const keywords = Array.isArray(post.keywords) ? post.keywords : tags;
  const url = absoluteUrl(post.path);

  const graph = [{
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.title,
    description: post.description || stripHtml(post.excerpt || '').slice(0, 180),
    inLanguage: post.lang || hexo.config.language || 'zh-CN',
    datePublished: dateToIso(post.date),
    dateModified: dateToIso(post.updated || post.date),
    author: {
      '@type': 'Organization',
      name: hexo.config.author || 'Wisteria Software',
      url: 'https://wisteriasoftware.uk/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wisteria Software',
      url: 'https://wisteriasoftware.uk/',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/favicon-32x32.png')
      }
    },
    articleSection: categories[0],
    keywords: keywords.join(', '),
    url
  }];

  const faqItems = extractFaqItems(post);
  if (faqItems.length >= 2) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

hexo.extend.filter.register('after_post_render', data => {
  if (!data || !data.content || !data.title || !data.date || !data.path) return data;
  const jsonLd = '<script type="application/ld+json">' + JSON.stringify(postSchema(data)) + '</script>';
  data.content += `\n${jsonLd}`;
  return data;
});

hexo.extend.helper.register('recent_posts_sidebar', function(limit) {
  limit = limit || 10;
  const posts = this.site.posts.sort('-date').limit(limit).toArray();
  if (!posts.length) return '';

  let html = '<div class="links-of-blogroll animated">';
  html += '<div class="links-of-blogroll-title" data-i18n="recent_posts">近期文章</div>';
  html += '<ul class="links-of-blogroll-list">';
  posts.forEach(function(post) {
    html += '<li class="links-of-blogroll-item">';
    html += '<a href="' + hexo.config.root + post.path + '" title="' + post.title + '">' + post.title + '</a>';
    html += '</li>';
  });
  html += '</ul></div>';
  return html;
});

hexo.extend.helper.register('related_posts_sidebar', function(limit) {
  limit = limit || 5;
  const current = this.page;
  if (!current || current.layout !== 'post') return '';

  const currentTags = new Set(namesFromCollection(current.tags));
  const currentCategories = new Set(namesFromCollection(current.categories));
  const currentPathParts = String(current.path || '').split('/');
  const currentLanguage = currentPathParts[1] === 'zh' || currentPathParts[1] === 'en' ? currentPathParts[1] : '';

  const related = this.site.posts.toArray()
    .filter(post => post.path && post.path !== current.path)
    .map(post => {
      const tags = namesFromCollection(post.tags);
      const categories = namesFromCollection(post.categories);
      const pathParts = String(post.path || '').split('/');
      const language = pathParts[1] === 'zh' || pathParts[1] === 'en' ? pathParts[1] : '';
      let score = 0;

      tags.forEach(tag => {
        if (currentTags.has(tag)) score += 3;
      });
      categories.forEach(category => {
        if (currentCategories.has(category)) score += 2;
      });
      if (currentLanguage && language === currentLanguage) score += 1;

      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.date - a.post.date;
    })
    .slice(0, limit)
    .map(item => item.post);

  if (!related.length) return '';

  let html = '<div class="wt-related-posts links-of-blogroll animated" data-sidebar-related>';
  html += '<div class="links-of-blogroll-title" data-i18n="related_posts">相关文章</div>';
  html += '<ul class="links-of-blogroll-list">';
  related.forEach(post => {
    html += '<li class="links-of-blogroll-item">';
    html += '<a href="' + this.url_for(post.path) + '" title="' + escapeHtml(post.title) + '">' + escapeHtml(post.title) + '</a>';
    html += '</li>';
  });
  html += '</ul></div>';
  return html;
});

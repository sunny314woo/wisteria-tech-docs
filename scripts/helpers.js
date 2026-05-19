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

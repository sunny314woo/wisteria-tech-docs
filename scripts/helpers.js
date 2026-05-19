'use strict';

hexo.extend.helper.register('recent_posts_sidebar', function(limit) {
  limit = limit || 10;
  const posts = this.site.posts.sort('-date').limit(limit).toArray();
  if (!posts.length) return '';

  let html = '<div class="links-of-blogroll animated">';
  html += '<div class="links-of-blogroll-title">近期文章</div>';
  html += '<ul class="links-of-blogroll-list">';
  posts.forEach(function(post) {
    html += '<li class="links-of-blogroll-item">';
    html += '<a href="' + hexo.config.root + post.path + '" title="' + post.title + '">' + post.title + '</a>';
    html += '</li>';
  });
  html += '</ul></div>';
  return html;
});

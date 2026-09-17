'use strict';

function addBodyClass(html, className) {
  return html.replace(/<body([^>]*)>/, (match, attrs) => {
    if (/\sclass=(['"])/.test(attrs)) {
      return `<body${attrs.replace(/class=(['"])(.*?)\1/, (classMatch, quote, value) => `class=${quote}${value} ${className}${quote}`)}>`;
    }
    return `<body${attrs} class="${className}">`;
  });
}

function transformRelatedGuides(block) {
  return block
    .replace('class="wt-related-posts links-of-blogroll animated" data-sidebar-related', 'class="wt-article-related"')
    .replace(/<div class="links-of-blogroll-title" data-i18n="related_posts">[\s\S]*?<\/div>/, '<h2 class="wt-article-related-title" data-i18n="related_posts">相关文章</h2>')
    .replace('class="links-of-blogroll-list"', 'class="wt-article-related-list"')
    .replace(/class="links-of-blogroll-item"/g, 'class="wt-article-related-item"');
}

hexo.extend.filter.register('after_render:html', (html, data) => {
  const outputPath = String(data && data.path || '').replace(/^\/+/, '');
  if (!outputPath || outputPath === 'index.html' || !html.includes('main-inner post posts-expand')) return html;

  let nextHtml = addBodyClass(html, 'wt-docs-article');

  const relatedPattern = /<div class="wt-related-posts links-of-blogroll animated" data-sidebar-related>[\s\S]*?<\/ul><\/div>/;
  const relatedMatch = nextHtml.match(relatedPattern);

  if (relatedMatch) {
    const related = transformRelatedGuides(relatedMatch[0]);
    nextHtml = nextHtml.replace(relatedPattern, '');
    nextHtml = nextHtml.replace('<footer class="post-footer">', `${related}<footer class="post-footer">`);
  }

  return nextHtml;
});

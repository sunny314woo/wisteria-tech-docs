(() => {
  const copy = {
    'zh-CN': {
      note: 'Wisteria Software 官方产品文档与实用指南。',
      products: '产品',
      docs: '文档',
      support: '支持',
      privacy: '隐私'
    },
    en: {
      note: 'Official product documentation and practical guides.',
      products: 'Products',
      docs: 'Docs',
      support: 'Support',
      privacy: 'Privacy'
    }
  };

  const apply = () => {
    const lang = document.documentElement.dataset.uiLang === 'en' ? 'en' : 'zh-CN';
    const t = copy[lang];
    document.querySelectorAll('[data-footer-i18n]').forEach(node => {
      const key = node.dataset.footerI18n;
      if (t[key]) node.textContent = t[key];
    });
  };

  const init = () => {
    apply();
    const observer = new MutationObserver(mutations => {
      if (mutations.some(m => m.attributeName === 'data-ui-lang')) apply();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-ui-lang']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

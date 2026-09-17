(() => {
  const labels = {
    'zh-CN': {
      outlinesave: 'Outlinesave',
      guides: '指南',
      faq: 'FAQ',
      about: '关于',
      language: '语言',
      onThisPage: '本页目录',
      openMenu: '打开菜单',
      closeMenu: '关闭菜单'
    },
    en: {
      outlinesave: 'Outlinesave',
      guides: 'Guides',
      faq: 'FAQ',
      about: 'About',
      language: 'Language',
      onThisPage: 'On this page',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    }
  };

  const currentLanguage = () => document.documentElement.dataset.uiLang === 'en' ? 'en' : 'zh-CN';

  const applyMobileLabels = () => {
    const lang = currentLanguage();
    const t = labels[lang];
    const outlinesaveHref = lang === 'en' ? '/categories/Product-Guides/' : '/categories/产品指南/';

    document.querySelectorAll('[data-doc-route="outlinesave"]').forEach(link => {
      link.setAttribute('href', outlinesaveHref);
    });
    document.querySelectorAll('[data-i18n="nav_outlinesave"]').forEach(el => { el.textContent = t.outlinesave; });
    document.querySelectorAll('[data-i18n="nav_guides"]').forEach(el => { el.textContent = t.guides; });
    document.querySelectorAll('[data-i18n="nav_faq"]').forEach(el => { el.textContent = t.faq; });
    document.querySelectorAll('[data-i18n="nav_about"]').forEach(el => { el.textContent = t.about; });
    document.querySelectorAll('[data-i18n="mobile_language"]').forEach(el => { el.textContent = t.language; });
    document.querySelectorAll('[data-mobile-toc-label]').forEach(el => { el.textContent = t.onThisPage; });

    const toggle = document.querySelector('.wt-mobile-menu-toggle');
    if (toggle) {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', expanded ? t.closeMenu : t.openMenu);
    }
  };

  const setupMenu = () => {
    const toggle = document.querySelector('.wt-mobile-menu-toggle');
    const menu = document.querySelector('.wt-mobile-menu');
    if (!toggle || !menu) return;

    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      document.body.classList.toggle('wt-mobile-menu-open', open);
      applyMobileLabels();
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', event => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (event.target.closest('.wt-topbar')) return;
      setOpen(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.querySelectorAll('.wt-mobile-search.popup-trigger').forEach(button => {
      button.addEventListener('click', () => setOpen(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  };

  const setupMobileToc = () => {
    if (!document.body.classList.contains('wt-docs-article')) return;
    if (document.querySelector('.wt-mobile-toc')) return;

    const sourceNav = document.querySelector('.post-toc .nav');
    const postHeader = document.querySelector('.main-inner.post .post-header');
    if (!sourceNav || !postHeader) return;

    const details = document.createElement('details');
    details.className = 'wt-mobile-toc';

    const summary = document.createElement('summary');
    const label = document.createElement('span');
    label.dataset.mobileTocLabel = '';
    summary.appendChild(label);
    details.appendChild(summary);

    const clonedNav = sourceNav.cloneNode(true);
    clonedNav.querySelectorAll('.nav-number').forEach(node => node.remove());
    details.appendChild(clonedNav);
    postHeader.insertAdjacentElement('afterend', details);

    details.addEventListener('click', event => {
      if (event.target.closest('a.nav-link')) details.open = false;
    });
  };

  const observeLanguage = () => {
    const observer = new MutationObserver(mutations => {
      if (mutations.some(mutation => mutation.attributeName === 'data-ui-lang')) applyMobileLabels();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-ui-lang'] });
  };

  const init = () => {
    setupMenu();
    setupMobileToc();
    applyMobileLabels();
    observeLanguage();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

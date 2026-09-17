'use strict';

(() => {
  const isSidebarPanelScroll = options => {
    if (!options || !Object.prototype.hasOwnProperty.call(options, 'scrollTop')) return false;
    const target = options.targets;
    return target instanceof Element && target.classList.contains('sidebar-panel-container');
  };

  const patchTocAutoScroll = () => {
    const utils = window.NexT && window.NexT.utils;
    if (!utils || typeof utils.activateNavByIndex !== 'function') return;
    if (utils.activateNavByIndex.__wisteriaNoAutoScroll) return;

    const originalActivateNavByIndex = utils.activateNavByIndex;

    const patchedActivateNavByIndex = function(index) {
      const originalAnime = window.anime;
      const originalScrollTo = utils.scrollTo;

      if (typeof originalAnime === 'function') {
        window.anime = function(options) {
          if (isSidebarPanelScroll(options)) return null;
          return originalAnime.apply(this, arguments);
        };
      }

      if (typeof originalScrollTo === 'function') {
        utils.scrollTo = function(target, top) {
          if (target instanceof Element && target.classList.contains('sidebar-panel-container')) return;
          return originalScrollTo.call(this, target, top);
        };
      }

      try {
        return originalActivateNavByIndex.call(this, index);
      } finally {
        if (typeof originalAnime === 'function') window.anime = originalAnime;
        if (typeof originalScrollTo === 'function') utils.scrollTo = originalScrollTo;
      }
    };

    patchedActivateNavByIndex.__wisteriaNoAutoScroll = true;
    utils.activateNavByIndex = patchedActivateNavByIndex;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchTocAutoScroll, { once: true });
  } else {
    patchTocAutoScroll();
  }
})();

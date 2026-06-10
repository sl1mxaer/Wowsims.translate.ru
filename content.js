// Wowsims RU Tooltip Fix - v5 (Advanced Russian tooltips force)
console.log('%c[Wowsims RU] Content script loaded v5 - Advanced Russian tooltips', 'color: #00ff00; font-weight: bold');

function replaceWowheadLinks() {
  const selectors = [
    'a[href*="wowhead.com"]',
    '[data-wowhead]',
    '[data-tooltip-href]',
    '.item', '.gem', '.enchant', '[class*="item"]', '[class*="gear"]',
    '[data-wowhead*="item"]', '[data-wowhead*="spell"]'
  ];

  document.querySelectorAll(selectors.join(', ')).forEach(el => {
    let attr = 'data-wowhead';
    let value = el.getAttribute(attr) || el.getAttribute('href') || el.getAttribute('data-tooltip-href');
    if (!value || !value.includes('wowhead.com')) return;

    let newValue = value;

    // Force Russian tooltips - Best method
    if (newValue.includes('wowhead.com')) {
      // Add domain=ru parameter
      if (newValue.includes('?')) {
        if (!newValue.includes('domain=')) {
          newValue += '&domain=ru';
        } else {
          newValue = newValue.replace(/domain=[^&]*/, 'domain=ru');
        }
      } else {
        newValue += '?domain=ru';
      }

      // Force /ru/ in path
      if (newValue.includes('/mop-classic/') && !newValue.includes('/mop-classic/ru/')) {
        newValue = newValue.replace('/mop-classic/', '/mop-classic/ru/');
      }

      // Spell/enchant support
      if (newValue.includes('/spell=') && !newValue.includes('/ru/spell=')) {
        newValue = newValue.replace('/spell=', '/ru/spell=');
      }
    }

    // Update all possible attributes
    if (el.getAttribute('data-wowhead')) el.setAttribute('data-wowhead', newValue);
    if (el.getAttribute('href')) el.setAttribute('href', newValue);
    if (el.getAttribute('data-tooltip-href')) el.setAttribute('data-tooltip-href', newValue);

    if (value !== newValue) {
      console.log('[Wowsims RU] Replaced link:', value, '→', newValue);
    }
  });
}

// Run multiple times for dynamic content
function init() {
  replaceWowheadLinks();
  setTimeout(replaceWowheadLinks, 500);
  setTimeout(replaceWowheadLinks, 1500);
  setTimeout(replaceWowheadLinks, 4000);
}

window.addEventListener('load', init);

// Strong MutationObserver
const observer = new MutationObserver(() => {
  replaceWowheadLinks();
});

observer.observe(document.body, { childList: true, subtree: true });

console.log('%c[Wowsims RU] v5 observer active', 'color: #00ff00');
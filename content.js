// Wowsims Translate RU - основной content script

console.log('🚀 Wowsims Translate RU загружен');

// Основная функция замены wowhead ссылок и tooltips
function replaceWowheadLinks() {
  // Заменяем все ссылки wowhead.com на ru.wowhead.com
  const links = document.querySelectorAll('a[href*="wowhead.com"]');
  links.forEach(link => {
    if (link.href.includes('wowhead.com') && !link.href.includes('ru.wowhead.com')) {
      let newHref = link.href.replace('www.wowhead.com', 'www.wowhead.com/ru');
      // Для MOP Classic
      newHref = newHref.replace('/mop-classic/item=', '/mop-classic/ru/item=');
      newHref = newHref.replace('/mop-classic/spell=', '/mop-classic/ru/spell=');
      link.href = newHref;
      console.log('🔗 Заменена ссылка:', link.href);
    }
  });

  // Для data-wowhead атрибутов
  const elements = document.querySelectorAll('[data-wowhead]');
  elements.forEach(el => {
    const data = el.getAttribute('data-wowhead');
    if (data && data.includes('item=')) {
      // Можно модифицировать data-wowhead если нужно
      console.log('📋 Найден data-wowhead:', data);
    }
  });
}

// Наблюдатель за изменениями DOM (wowsims динамически подгружает контент)
const observer = new MutationObserver(() => {
  replaceWowheadLinks();
});

// Запуск
function init() {
  replaceWowheadLinks();
  observer.observe(document.body, { childList: true, subtree: true });

  // Перехват создания tooltips Wowhead
  const originalCreateTooltip = window.whTooltips;
  if (originalCreateTooltip) {
    console.log('🔧 Wowhead tooltips обнаружены');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Периодический запуск на случай динамических обновлений
setInterval(replaceWowheadLinks, 2000);
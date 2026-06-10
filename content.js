// Wowsims.translate.ru - v7 (исправлено для MOP Classic)
console.log('[Wowsims RU] v7 загружен - MOP Classic fix');

function fixWowheadTooltips() {
    // 1. data-wowhead: добавляем domain=ru
    document.querySelectorAll('[data-wowhead]').forEach(el => {
        let val = el.getAttribute('data-wowhead') || '';
        if (val && !val.includes('domain=ru')) {
            const sep = val.includes('?') ? '&' : '?';
            val = val.replace(/&?domain=[^&]*/g, '') + sep + 'domain=ru';
            el.setAttribute('data-wowhead', val);
        }
    });

    // 2. Исправляем ссылки (сохраняем /mop-classic/ + /ru/)
    document.querySelectorAll('a[href*="wowhead.com"]').forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href.includes('ru.wowhead.com')) return;

        // Правильная замена для mop-classic
        href = href.replace(
            /(https?:\/\/)(www\.)?wowhead\.com\/(mop-classic\/)?/,
            '$1$2wowhead.com/mop-classic/ru/'
        );
        link.setAttribute('href', href);
    });
}

// Первый запуск
fixWowheadTooltips();

// Мониторинг динамики
const observer = new MutationObserver(fixWowheadTooltips);
observer.observe(document.body, { childList: true, subtree: true });

// Дополнительные запуски
setInterval(fixWowheadTooltips, 1000);

console.log('[Wowsims RU] v7 Observer запущен');

// Wowsims.translate.ru - v8 (MOP Classic fix)
console.log('[Wowsims RU] v8 загружен - MOP Classic + anti-duplicate');

function fixWowheadTooltips() {
    // 1. data-wowhead — добавляем domain=ru один раз
    document.querySelectorAll('[data-wowhead]').forEach(el => {
        let val = el.getAttribute('data-wowhead') || '';
        if (val && !val.includes('domain=ru')) {
            val = val.replace(/&?domain=[^&]*/g, '');
            const sep = val.includes('?') ? '&' : '?';
            el.setAttribute('data-wowhead', val + sep + 'domain=ru');
        }
    });

    // 2. Исправляем ссылки — БЕЗ дублирования /ru/
    document.querySelectorAll('a[href*="wowhead.com"]').forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href.includes('ru.wowhead.com')) return;

        // Убираем лишние /ru/ если уже есть
        href = href.replace(/\/ru(\/ru)+/g, '/ru');

        // Правильная замена для mop-classic
        if (href.includes('wowhead.com/mop-classic')) {
            href = href.replace(
                /(https?:\/\/)(www\.)?wowhead\.com\/(mop-classic\/)?/,
                '$1$2wowhead.com/mop-classic/ru/'
            );
        } else {
            // Для spell/item без mop-classic
            href = href.replace(
                /(https?:\/\/)(www\.)?wowhead\.com\//,
                '$1$2wowhead.com/ru/'
            );
        }

        link.setAttribute('href', href);
    });
}

// Первый запуск + частые обновления для Wowsims
fixWowheadTooltips();
const observer = new MutationObserver(fixWowheadTooltips);
observer.observe(document.body, { childList: true, subtree: true });
setInterval(fixWowheadTooltips, 700);

console.log('[Wowsims RU] v8 Observer активен');

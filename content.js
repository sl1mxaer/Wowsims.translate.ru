// Wowsims.translate.ru - v9 (MOP Classic + ru)
console.log('[Wowsims RU] v9 загружен - Force MOP Classic');

function fixWowheadTooltips() {
    // 1. data-wowhead — force mop-classic + ru
    document.querySelectorAll('[data-wowhead]').forEach(el => {
        let val = el.getAttribute('data-wowhead') || '';
        if (val) {
            // Убираем старые domain
            val = val.replace(/&?domain=[^&]*/g, '');
            
            // Force MOP Classic Russian
            const sep = val.includes('?') ? '&' : '?';
            val = val + sep + 'domain=mop-classic&domain=ru';
            
            el.setAttribute('data-wowhead', val);
        }
    });

    // 2. Исправляем ссылки (mop-classic/ru/)
    document.querySelectorAll('a[href*="wowhead.com"]').forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href.includes('ru.wowhead.com')) return;

        href = href.replace(/\/ru(\/ru)+/g, '/ru');

        if (href.includes('/mop-classic/')) {
            href = href.replace(
                /(https?:\/\/)(www\.)?wowhead\.com\/mop-classic\/?/,
                '$1$2wowhead.com/mop-classic/ru/'
            );
        } else {
            href = href.replace(
                /(https?:\/\/)(www\.)?wowhead\.com\//,
                '$1$2wowhead.com/mop-classic/ru/'
            );
        }

        href = href.replace(/\/ru(\/ru)+/g, '/ru');
        link.setAttribute('href', href);
    });
}

// Запуски
fixWowheadTooltips();
const observer = new MutationObserver(fixWowheadTooltips);
observer.observe(document.body, { childList: true, subtree: true });
setInterval(fixWowheadTooltips, 700);

console.log('[Wowsims RU] v9 MOP Classic + ru Observer активен');

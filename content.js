// Wowsims.translate.ru - v6
console.log('[Wowsims RU] Расширение загружено v6');

function replaceWowheadLinks() {
    // Замена data-wowhead атрибутов
    document.querySelectorAll('[data-wowhead]').forEach(el => {
        let val = el.getAttribute('data-wowhead');
        if (val && !val.includes('domain=ru')) {
            val = val.replace(/&?domain=\w+/, '') + (val.includes('?') ? '&' : '?') + 'domain=ru';
            el.setAttribute('data-wowhead', val);
        }
    });

    // Замена обычных ссылок wowhead.com → ru.wowhead.com
    document.querySelectorAll('a[href*="wowhead.com"]').forEach(link => {
        let href = link.getAttribute('href');
        if (href && href.includes('wowhead.com') && !href.includes('ru.wowhead.com')) {
            let newHref = href.replace(
                /(https?:\/\/)(www\.)?wowhead\.com\/(mop-classic\/)?/,
                '$1$2wowhead.com/mop-classic/ru/'
            );
            link.setAttribute('href', newHref);
        }
    });
}

// Запуск при загрузке
replaceWowheadLinks();

// Мониторинг динамического контента
const observer = new MutationObserver(() => {
    replaceWowheadLinks();
});

observer.observe(document.body, { childList: true, subtree: true });

// Дополнительный запуск
setInterval(replaceWowheadLinks, 800);

console.log('[Wowsims RU] Observer и замены активированы');
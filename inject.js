(function () {
    console.log('[Wowsims RU] inject.js загружен (MAIN world)');

    const LOCALE = '7'; // русский

    function setParam(url, name, value) {
        const re = new RegExp('([?&])' + name + '=[^&]*', 'i');
        if (re.test(url)) return url.replace(re, '$1' + name + '=' + value);
        const sep = url.includes('?') ? '&' : '?';
        return url + sep + name + '=' + value;
    }

    function fixWowheadUrl(url) {
        try {
            // ВАЖНО: трогаем только запросы тултипов.
            // Служебные /data/...&json НЕ трогаем (у них нет ? и мы их сломаем).
            if (!url.includes('/tooltip/')) return url;

            url = setParam(url, 'locale', LOCALE);
            url = url.replace(/[?&]{2,}/g, m => m[0]);
        } catch (e) {
            console.warn('[Wowsims RU] Ошибка обработки URL', e);
        }
        return url;
    }

    function isWowhead(url) {
        return typeof url === 'string' && url.includes('wowhead.com');
    }

    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        try {
            let url = typeof input === 'string' ? input : (input && input.url) || '';
            if (isWowhead(url)) {
                const newUrl = fixWowheadUrl(url);
                if (newUrl !== url) {
                    console.log('[Wowsims RU] fetch:', url, '->', newUrl);
                    if (typeof input === 'string') input = newUrl;
                    else if (input instanceof Request) input = new Request(newUrl, input);
                }
            }
        } catch (e) {}
        return originalFetch.call(this, input, init);
    };

    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        try {
            if (isWowhead(url)) {
                const newUrl = fixWowheadUrl(url);
                if (newUrl !== url) {
                    console.log('[Wowsims RU] XHR:', url, '->', newUrl);
                    url = newUrl;
                }
            }
        } catch (e) {}
        return originalXHROpen.call(this, method, url, ...rest);
    };

    console.log('[Wowsims RU] Перехват установлен (locale=' + LOCALE + ', только /tooltip/)');
})();
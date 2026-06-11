console.log('[Wowsims RU] content.js загружен (ISOLATED world)');

// Внедряем inject.js в MAIN world вручную (Яндекс не поддерживает world:MAIN)
(function injectScript() {
    try {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('inject.js');
        s.onload = function () { this.remove(); };
        (document.head || document.documentElement).appendChild(s);
        console.log('[Wowsims RU] inject.js внедрён в страницу');
    } catch (e) {
        console.warn('[Wowsims RU] Не удалось внедрить inject.js', e);
    }
})();

// Правим data-wowhead в DOM (для тех тултипов, что рендерятся из атрибутов)
const LOCALE = '7';

function setParam(str, name, value) {
    const re = new RegExp('(^|&)' + name + '=[^&]*', 'i');
    if (re.test(str)) return str.replace(re, '$1' + name + '=' + value);
    return str + '&' + name + '=' + value;
}

function fixVal(val) {
    if (!val) return val;
    // data-wowhead имеет вид "item=102246&ilvl=608&..." (разделитель &, без ?)
    val = setParam(val, 'locale', LOCALE);
    return val.replace(/&{2,}/g, '&').replace(/^&|&$/g, '');
}

function forceRu() {
    document.querySelectorAll('[data-wowhead]').forEach(el => {
        const val = el.getAttribute('data-wowhead') || '';
        const fixed = fixVal(val);
        if (val && fixed !== val) el.setAttribute('data-wowhead', fixed);
    });
}

function init() {
    forceRu();
    const observer = new MutationObserver(forceRu);
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.body) init();
else document.addEventListener('DOMContentLoaded', init);

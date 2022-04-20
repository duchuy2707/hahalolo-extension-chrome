'use strict';

(() => {
    let btnReload = document.getElementById('btnReload');

    if (btnReload) {
        btnReload.onclick = function () {
            chrome.runtime.reload();
        };
    }
})();
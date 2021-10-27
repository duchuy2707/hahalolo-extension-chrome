'use strict';
'use strict';

let btnReload = document.getElementById('btnReload');

btnReload.onclick = function () {
    chrome.runtime.reload();
};
'use strict';

let btnReload = document.getElementById('btnReload');

btnReload.onclick = function () {
    chrome.runtime.reload();
};


// accept friend
// setInterval(() => {
//     [...document.querySelectorAll('span')].filter(item => item.innerHTML === 'Confirm' || item.innerHTML === 'See more').map(item => item.closest('button')).forEach(item => item.click());
// }, 5000);
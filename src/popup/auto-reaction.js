'use strict';

(() => {
    const btnStart = document.getElementById('btnStartAutoReaction');
    const btnStop = document.getElementById('btnStopAutoReaction');

    btnStart.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                let countReaction = 0;
                let menuIndex = 0;
                window.autoReaction = setInterval(() => {
                    const allPost = document.querySelectorAll('div[id].MuiPaper-root.MuiCard-root:not([data-reaction])');

                    if (document.querySelectorAll('div[id].MuiPaper-root.MuiCard-root[data-reaction]').length >= 50) {
                        const menu = document.querySelectorAll('[aria-label="Hahalolo main menu"] a');

                        if (menu.length > menuIndex) {
                            menu[menuIndex].click();
                            menuIndex = menuIndex === 0 ? 1 : 0;
                        }
                    } else if (allPost.length > 0) {
                        allPost.forEach((item) => {
                            // const btnReaction = item.querySelectorAll('.MuiGrid-align-items-xs-center')[1].querySelectorAll('button');
                            const btnReaction = item.querySelectorAll('.MuiCollapse-container.MuiCollapse-entered')[0].previousSibling.previousSibling.querySelectorAll('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-true')[0].querySelectorAll('button');
                            if (btnReaction.length > 0 && btnReaction[0].querySelectorAll('svg:not([xmlns])').length > 0) {
                                btnReaction[0].click();
                                countReaction++;
                            }

                            item.setAttribute('data-reaction', 'done');
                        });
                    } else {
                        // window.scrollTo(0, document.body.scrollHeight);
                        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                    }
                }, 2000);
            },
        });
    };

    btnStop.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                clearInterval(window.autoReaction);
            },
        });
    };
})();

'use strict';

(() => {
    const btnDiggingCoins = document.getElementById('btnDiggingCoins');

    console.log('\n--------\n', btnDiggingCoins, '\n--------\n');

    if (btnDiggingCoins) {
        btnDiggingCoins.onclick = async function () {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    let count = 0;
                    let timeout = 0;
                    let time = 5000;
                    console.log(`%c----------------------:: [START] ::----------------------`, `color:Green`)
                    setInterval(() => {
                        const coinBox = document.querySelector('[viewBox="0 0 800 800"]');
                        if (coinBox && !timeout) {
                            timeout = setTimeout(() => {
                                const button = coinBox.closest("div");
                                const autoClick = new MouseEvent("click", {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window,
                                });

                                button.dispatchEvent(autoClick);

                                button.focus();
                                button.click();
                                count += 1;
                                console.log(`%c ::[Click]:: ${count} - ${time}`, `color:Green`)

                                clearTimeout(timeout);
                                timeout = 0;
                            }, time);

                            time = Math.floor(Math.random() * (15000 - 10000)) + 10000; // random time click between 10s ~ 15s
                        }
                    }, time);
                },
            });
        };
    }
})();

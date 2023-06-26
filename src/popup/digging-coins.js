'use strict';

(() => {
    chrome.storage.sync.get(['totalCoins', 'oldDay', 'table'], function (data) {
        const today = new Date().toISOString().slice(0, 10);
        let { totalCoins = 0, table = {} } = data;

        if (!data.oldDay || today !== data.oldDay) {
            chrome.storage.sync.set({ totalCoins: 0 });
            chrome.storage.sync.set({ table: {} });
            chrome.storage.sync.set({ oldDay: today });
            totalCoins = 0;
            table = {};
        }

        const spanTotalCoins = document.getElementById('totalCoins');
        if (spanTotalCoins) spanTotalCoins.innerHTML = totalCoins;

        const keys = Object.keys(table);

        for (let i = 0; i < keys.length; i++) {
            const td = document.getElementById(keys[i]);
            td.innerHTML = table[keys[i]] || 0;
        }
    });

    const btnDiggingCoins = document.getElementById('btnDiggingCoins');

    if (btnDiggingCoins) {
        btnDiggingCoins.onclick = async function () {
            btnDiggingCoins.setAttribute('disabled', 'disabled');
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    let count = 0;
                    let timeout = 0;
                    let time = 5000;

                    const coolConsole = () => {
                        const logo = `
                          ██╗  ██╗██╗   ██╗██╗   ██╗
                          ██║  ██║██║   ██║██║   ██║
                          ███████║██║   ██║╚██╗ ██╔╝
                          ██╔══██║╚██╗ ██╔╝ ╚═██╔═╝ 
                          ██║  ██║ ╚████╔╝    ██║   
                          ╚═╝  ╚═╝  ╚═══╝    ╚══╝   
                                           
                        `;
                        console.log(`%c${logo}`, 'color: #ff8a00; font-family: monospace');
                    };
                    coolConsole();
                
                    console.log(`%c----------------------:: [START] ::----------------------`, `color:Green`)
                    setInterval(() => {
                        const coinBox = document.querySelector('[viewBox="0 0 800 800"]');

                        if (coinBox && !timeout) {
                            const button = coinBox.closest("div");
                            if (button) {
                                timeout = setTimeout(() => {
                                    const autoClick = new MouseEvent("click", {
                                        // bubbles: true,
                                        cancelable: true,
                                        view: window,
                                    });

                                    button.dispatchEvent(autoClick);

                                    button.focus();
                                    button.click();
                                    count += 1;

                                    clearTimeout(timeout);
                                    timeout = 0;

                                    setTimeout(() => {
                                        // show số coin
                                        const hostname = window.location.href;

                                        const coins = window.localStorage ? parseInt(window.localStorage.getItem('coinNumber') || 0, 10) : 0;

                                        if (coins) {
                                            chrome.storage.sync.get(['totalCoins', 'oldDay', 'table'], function (data) {
                                                const today = new Date().toISOString().slice(0, 10);
                                                let totalCoins = (data.totalCoins || 0) + coins;

                                                if (!data.oldDay || today !== data.oldDay) {
                                                    totalCoins = 0;
                                                    chrome.storage.sync.set({ 'oldDay': today });
                                                }

                                                console.log(`%c::[Click]:: ${count}\n::[Url]:: ${hostname}\n::[Coins]:: ${coins}\n::[Total]:: ${totalCoins}\n::[Time]:: ${time}`, `color:Green`)

                                                chrome.storage.sync.set({ totalCoins });

                                                // add vào table count
                                                const { table = {} } = data;
                                                if (hostname.indexOf('experience') !== -1) {
                                                    table.ex = (table.ex || 0) + 1;
                                                } else if (hostname.indexOf('tour') !== -1) {
                                                    table.tu = (table.tu || 0) + 1;
                                                } else if (hostname.indexOf('hotel') !== -1) {
                                                    table.ho = (table.ho || 0) + 1;
                                                } else if (hostname.indexOf('shopping') !== -1) {
                                                    table.sh = (table.sh || 0) + 1;
                                                } else if (hostname.indexOf('flight') !== -1) {
                                                    table.fl = (table.fl || 0) + 1;
                                                } else if (hostname.indexOf('car') !== -1) {
                                                    table.ca = (table.ca || 0) + 1;
                                                } else if (hostname.indexOf('newsfeed') !== -1) {
                                                    table.nf = (table.nf || 0) + 1;
                                                } else {
                                                    table.ex = (table.ex || 0) + 1;
                                                }

                                                chrome.storage.sync.set({ table });

                                                if (window.localStorage) window.localStorage.setItem('coinNumber', 0)
                                            });
                                        } else console.log(`%c::[Click]:: ${count}\n::[Url]:: ${hostname}\n::[Status]:: Don't get coin number\n::[Time]:: ${time}`, `color:Green`)

                                        // const boxCoin = document.querySelectorAll('[class*="MuiBackdrop-root"');
                                        // if (boxCoin[0]) {
                                        //     const divContent = boxCoin[0].querySelectorAll('div');

                                        //     if (divContent.length > 0) {
                                        //         const coins = parseInt(divContent[divContent.length - 1].textContent.split(' ')[0], 10);
                                        //         if (coins !== NaN && Number.isInteger(coins)) {

                                        //         } else console.log(`%c::[Click]:: ${count}\n::[Url]:: ${hostname}\n::[Status]:: Don't get coin number\n::[Time]:: ${time}`, `color:Green`)
                                        //     } else console.log(`%c::[Click]:: ${count}\n::[Url]:: ${hostname}\n::[Status]:: No box coin\n::[Time]:: ${time}`, `color:Green`)
                                        // } else console.log(`%c::[Click]:: ${count}\n::[Url]:: ${hostname}\n::[Status]:: No box coin\n::[Time]:: ${time}`, `color:Green`)
                                    }, 3000);


                                }, time);

                                time = Math.floor(Math.random() * (15000 - 10000)) + 10000; // random time click between 10s ~ 15s
                            }
                        }
                    }, time);
                },
            });
        };
    }
})();

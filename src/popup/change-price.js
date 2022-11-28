'use strict';

(() => {
    const btnChangePrice = document.getElementById('btnChangePrice');
    const btnChangeUp = document.getElementById('btnChangeUp');
    const btnChangeDown = document.getElementById('btnChangeDown');
    const btnPriceRestore = document.getElementById('btnPriceRestore');
    const elPrice = document.getElementById('input-price');

    if (elPrice) {
        elPrice.addEventListener('focusout', (event) => {
            elPrice.value = parseInt(event.target.value.replace(/( ₫|\.)/g, ''), 10).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })
        });
    }

    const setPrice = () => {
        const price = parseInt(elPrice.value.replace(/( ₫|\.)/g, ''), 10);

        if (price) {
            chrome.storage.sync.set({ price });
            elPrice.style.borderColor = "";
        } else {
            elPrice.style.borderColor = "red";
            chrome.storage.sync.set({ price: 0 });
        }
    };

    const changePrice = (state) => {
        chrome.storage.sync.get('price', ({ price }) => {
            const listPrices = document.querySelectorAll('h6.MuiTypography-root.notranslate.MuiTypography-h6.MuiTypography-gutterBottom');
            const saveOldPrice = (listPrices) => {
                // save old prices
                if (document.querySelectorAll('input[name="old-price"]').length === 0) {
                    for (let i = 0; i < listPrices.length; i++) {
                        const hidePrice = document.createElement('input');
                        hidePrice.setAttribute("type", "hidden");
                        hidePrice.setAttribute("name", "old-price");
                        hidePrice.setAttribute("value", listPrices[i].innerText);
                        listPrices[i].parentNode.insertBefore(hidePrice, listPrices[i].nextSibling);
                    }
                }
            };

            saveOldPrice(listPrices);

            for (let i = 0; i < listPrices.length; i++) {
                const oldPrice = parseInt(listPrices[i].nextSibling.value.replace(/( ₫|\.)/g, ''), 10);

                switch (state) {
                    case 'change':
                        if (parseInt(price, 10) > 0) {
                            listPrices[i].innerHTML = (parseInt(price, 10)).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            });
                        }
                        break;
                    case 'up':
                        if (oldPrice > 0 && parseInt(price, 10) > 0) {
                            listPrices[i].innerHTML = (parseInt(price, 10) + oldPrice).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })
                        }
                        break;
                    case 'down':
                        if (oldPrice > 0 && parseInt(price, 10) > 0) {
                            listPrices[i].innerHTML = (oldPrice - parseInt(price, 10)).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })
                        }
                        break;
                    case 'restore':
                        listPrices[i].innerHTML = listPrices[i].nextSibling.value;
                        break;
                }

            }
        })
    }

    if (btnChangePrice) {
        btnChangePrice.onclick = async function () {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            setPrice();

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: changePrice,
                args: ['change'],
            });
        }

        if (btnChangeUp) {
            btnChangeUp.onclick = async function () {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

                setPrice();

                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: changePrice,
                    args: ['up'],
                });
            };
        }

        if (btnChangeDown) {
            btnChangeDown.onclick = async function () {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

                setPrice();

                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: changePrice,
                    args: ['down'],
                });
            }

            if (btnPriceRestore) {
                btnPriceRestore.onclick = async function () {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: changePrice,
                        args: ['restore'],
                    });
                };
            }
        }
    }
})();

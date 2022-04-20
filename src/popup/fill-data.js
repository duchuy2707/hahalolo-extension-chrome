'use strict';

(() => {
    const btnFillData = document.getElementById('btnFillData');

    if (btnFillData) {
        btnFillData.onclick = async function () {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    const setInput = (el, val) => {
                        el.value = val;
                        const event = new Event('input', { bubbles: true, cancelable: true });
                        el.dispatchEvent(event);

                        const combobox = document.querySelectorAll('.MuiAutocomplete-popper li');
                        if (combobox.length > 0) {
                            combobox[0].click();
                        }
                    };

                    const arrContentInfo = document.querySelectorAll('input[data-test]');

                    for (let i = 0; i < arrContentInfo.length; i++) {
                        const val = arrContentInfo[i].getAttribute('data-test');
                        if (val) setInput(arrContentInfo[i], val);
                    }

                    // button, radio, checkbox
                    const arrActionClick = document.querySelectorAll('[data-test="onClick"]');

                    for (let i = 0; i < arrActionClick.length; i++) {
                        arrActionClick[i].click();
                    }
                },
            });
        };
    }
})();

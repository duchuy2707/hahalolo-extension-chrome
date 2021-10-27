'use strict';

let btnFillData = document.getElementById('btnFillData');
let elProjectBooking = document.getElementById('project-booking');
let projectBooking = {};
let selectProjectBooking = '';

const createRadio = (name, value, text) => {
    const input = document.createElement('input'), label = document.createElement('label'), div = document.createElement('div');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', name);
    input.classList.add('selectRadio');
    input.value = value;

    label.innerHTML = `<span class="selectRadio" style="font-weight: bold;">${text}</span>`;

    div.setAttribute('style', 'display: flex;');
    div.appendChild(input);
    div.appendChild(label);
    div.classList.add('selectRadio');

    div.addEventListener("click", (el) => {
        if (el.target.getAttribute('type') !== 'radio') {
            const divParent = el.target.closest('div.selectRadio');
            if (divParent) divParent.querySelector('input[type="radio"]').checked = true;
        }
    });

    return div;
}

const onClickFillData = () => `
    (() => {
        // input text, area, auto complete
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
    })();
`;

btnFillData.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: onClickFillData() });
    });
}
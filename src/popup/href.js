'use strict';

(() => {
    const domains = [
        {
            "path": "https://l-seller-api.hahalolo.com:2708",
            "projectName": "AFF Seller"
        },
        {
            "path": "https://l-vendor-api.hahalolo.com:4321",
            "projectName": "AFF vendor"
        },
        {
            "path": "https://l-aff-supplier-api.hahalolo.com:6001",
            "projectName": "AFF Supplier"
        },
        {
            "path": "https://l-car-api.hahalolo.com:2021",
            "projectName": "Car"
        },
        {
            "path": "https://l-flight-api.hahalolo.com:7645",
            "projectName": "Flight"
        },
        {
            "path": "https://l-hotel-api.hahalolo.com:7654",
            "projectName": "Hotel"
        },
        {
            "path": "https://l-backend-hotel-api.hahalolo.com:8321",
            "projectName": "Backend hotel"
        },
        {
            "path": "https://l-newsfeed-api.hahalolo.com:1505",
            "projectName": "Newsfeed"
        },
        {
            "path": "https://l-social-api-prototype.hahalolo.com:2022",
            "projectName": "Social prototype"
        },
        {
            "path": "https://l-sso-api.hahalolo.com:4444",
            "projectName": "SSO"
        },
        {
            "path": "https://l-tour-api.hahalolo.com:8313",
            "projectName": "Tour"
        },
        {
            "path": "https://l-tour-business-api.hahalolo.com:6012",
            "projectName": "Tour business"
        },
        {
            "path": "https://l-wallet-api.hahalolo.com:1605",
            "projectName": "Wallet"
        }
    ];

    const btnFillData = document.getElementById('btnHref');

    const onClickHref = (domains) => `
        (() => {
            const domains = ${domains};
            console.log(window.location.hostname.split('.')[0] + '-api');
            const urlApi = domains.find((item) => item.path.indexOf(window.location.hostname.split('.')[0] + '-api') > -1);
            console.log(urlApi);
            if (urlApi) window.location.href = urlApi.path + '/_docs_';
        })();
    `;

    btnFillData.onclick = function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: onClickHref(JSON.stringify(domains)) });
        });
    }
})();
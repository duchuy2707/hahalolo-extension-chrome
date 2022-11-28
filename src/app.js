chrome.runtime.onInstalled.addListener(function () {
    // var xhr = new XMLHttpRequest;
    // xhr.open("GET", chrome.runtime.getURL('../data/account.json'));
    // xhr.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         const iter = [], str = [], accounts = {}, data = JSON.parse(xhr.responseText), keys = Object.keys(data);

    //         keys.forEach(function (item) {
    //             if (typeof parseInt(item) == 'number' && !isNaN(parseInt(item))) iter.push(item);
    //             else str.push(item);
    //         });

    //         iter.sort(function (a, b) {
    //             return parseInt(a) < parseInt(b);
    //         });

    //         str.sort();

    //         iter.forEach(function (item) {
    //             accounts[item] = data[item];
    //         })

    //         str.forEach(function (item) {
    //             accounts[item] = data[item];
    //         })

    //         chrome.storage.sync.set({ accounts, keys: iter.concat(str) });
    //     }
    // };
    // xhr.send();

    // fetch('../data/account.json')
    //     .then(response => response.json())
    //     .then(json => {
    //         const iter = [], str = [], accounts = {}, data = json, keys = Object.keys(data);

    //         keys.forEach(function (item) {
    //             if (typeof parseInt(item) == 'number' && !isNaN(parseInt(item))) iter.push(item);
    //             else str.push(item);
    //         });

    //         iter.sort(function (a, b) {
    //             return parseInt(a) < parseInt(b);
    //         });

    //         str.sort();

    //         iter.forEach(function (item) {
    //             accounts[item] = data[item];
    //         })

    //         str.forEach(function (item) {
    //             accounts[item] = data[item];
    //         })

    //         chrome.storage.sync.set({ accounts, keys: iter.concat(str) });
    //     });

    chrome.runtime.onInstalled.addListener(function () {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
            chrome.declarativeContent.onPageChanged.addRules([{
                conditions: [new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'hahalolo.com' },
                })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }]);
        });
    });
});
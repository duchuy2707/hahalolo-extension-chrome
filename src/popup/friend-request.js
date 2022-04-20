'use strict';

(() => {
    const btnAcceptFriendRequest = document.getElementById('btnAcceptFriendRequest');
    const btnDeleteFriendRequest = document.getElementById('btnDeleteFriendRequest');

    function action(typeAction, callAutoRun = false) {
        // check xem đang ở url nào, nếu đang ở url friend thì chả cần đièu hướng làm con mẹ gì
        const path = '/friends#received';

        function autoRun(type) {
            window[`${type}Friend`] = setInterval(() => {
                if (window.location.href.indexOf(path) > -1) {

                    document.querySelectorAll('[aria-labelledby="scrollable-force-tab-1"] .MuiGrid-align-items-xs-center').forEach(item => {
                        const button = item.querySelectorAll('button')[type === 'accept' ? 0 : 1]; // 0 accept, 1 delete

                        if (button && button.getAttribute('data-clicked') !== 'true') {
                            setTimeout(() => {
                                button.click();
                                button.setAttribute('data-clicked', true);
                            }, 1000);
                        }
                    });

                    const btnLoadmore = document.querySelectorAll('button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-disableElevation');
                    if (btnLoadmore[0]) btnLoadmore[0].click();

                } else {
                    clearInterval(window[`${type}Friend`]);
                }

            }, 5000);
        }

        if (callAutoRun) { // ở 1 chổ khác, reload tới chổ này
            chrome.storage.sync.get('acceptFriend', ({ acceptFriend }) => {
                if (acceptFriend) {
                    chrome.storage.sync.set({ acceptFriend: false });
                    autoRun('accept');
                }
            });

            chrome.storage.sync.get('deleteFriend', ({ deleteFriend }) => {
                if (deleteFriend) {
                    chrome.storage.sync.set({ deleteFriend: false });
                    autoRun('delete');
                }
            });
        } else {
            if (window.location.href.indexOf(path) === -1) { // reload tới màn hình friend
                document.querySelectorAll('#js-dropdown-notif-message')[0].nextSibling.querySelectorAll('button')[0].click();
                const iconUser = document.querySelector('#simple-popper ul a[href]');
                if (iconUser) chrome.storage.sync.set({ acceptFriend: iconUser.getAttribute('href') });
                window.location.href = window.location.origin + iconUser.getAttribute('href') + path;
            } else {
                autoRun(typeAction);
            }
        }

    }


    btnAcceptFriendRequest.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: action,
            args: ['accept'],
        });
    };

    btnDeleteFriendRequest.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: action,
            args: ['delete'],
        });
    };

    chrome.tabs.onUpdated.addListener(function (tabId) {
        chrome.scripting.executeScript({
            target: { tabId },
            function: action,
            args: ['', true],
        });
    });
})();
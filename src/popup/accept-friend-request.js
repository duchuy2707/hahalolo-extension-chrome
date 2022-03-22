'use strict';

(() => {
    const btnAcceptFriendRequest = document.getElementById('btnAcceptFriendRequest');


    btnAcceptFriendRequest.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                // open popup user
                document.querySelectorAll('#js-dropdown-notif-message')[0].nextSibling.querySelectorAll('button')[0].click();

                const iconUser = document.querySelector('#simple-popper ul a[href]');

                if (iconUser) chrome.storage.sync.set({ acceptFriend: true });

                window.location.href = window.location.origin + iconUser.getAttribute('href') + '/friends#received';
            },
        });
    };

    chrome.tabs.onUpdated.addListener(function (tabId) {
        chrome.scripting.executeScript({
            target: { tabId },
            function: () => {
                chrome.storage.sync.get('acceptFriend', ({ acceptFriend }) => {
                    if (acceptFriend) {
                        chrome.storage.sync.set({ acceptFriend: false });
                        setInterval(() => {
                            // [...document.querySelectorAll('span')].filter(item => item.innerHTML === 'Confirm' || item.innerHTML === 'See more').map(item => item.closest('button')).forEach(item => item.click());
                            document.querySelectorAll('[aria-labelledby="scrollable-force-tab-1"] .MuiGrid-align-items-xs-center').forEach(item => {
                                const button = item.querySelectorAll('button')[0];
                                if (button) {
                                    setTimeout(() => {
                                        button.click();
                                    }, 1000);
                                }
                            });

                            const btn = document.querySelectorAll('button');
                            btn[btn.length - 1].click();

                        }, 5000);
                    }
                })
            },
        });
    });
})();
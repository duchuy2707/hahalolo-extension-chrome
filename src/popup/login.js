'use strict';

(() => {
    let accounts = {};

    chrome.storage.sync.get(['accounts'], function (data) {
        ({ accounts } = data);
    });

    const btnLogin = document.getElementById('btnLogin');

    const account = {
        username: 'duchuy2707@gmail.com',
        password: 'abc123'
    };

    if (btnLogin) {
        btnLogin.onclick = async function () {
            chrome.storage.sync.set({ accounts });

            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.storage.sync.set({ account });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    chrome.storage.sync.get('account', ({ account }) => {
                        // case 1: đang ở trang newsfeed
                        const avatarProfile = document.querySelectorAll('#js-dropdown-notif-message');

                        if (avatarProfile.length > 0) {
                            // chưa login
                            if (avatarProfile[0].nextSibling.querySelectorAll('img').length !== 0) chrome.storage.sync.set({ login: true });

                            avatarProfile[0].nextSibling.querySelectorAll('button')[0].click();
                            document.querySelector('#simple-popper ul').lastChild.click();

                            // đang ở sso
                        } else {
                            // ở ngay trang sso
                            chrome.storage.sync.set({ login: false });
                            const indentify = document.getElementById('accountId');
                            const password = document.getElementById('password');

                            const submit = document.querySelector('button[type="submit"]');

                            if (indentify && password && submit) {
                                indentify.value = account.username;
                                password.value = account.password;

                                indentify.dispatchEvent(new Event('change'));
                                password.dispatchEvent(new Event('change'));

                                setTimeout(() => {
                                    submit.click();
                                }, 100)
                            }

                        }
                    });
                },
            });
        };

        chrome.tabs.onUpdated.addListener(function (tabId) {
            chrome.scripting.executeScript({
                target: { tabId },
                function: () => {
                    chrome.storage.sync.get('account', ({ account }) => {
                        if (account && window.location.href.indexOf('/sign-in/') > -1) {
                            setInterval(() => {
                                const indentify = document.getElementById('accountId');
                                const password = document.getElementById('password');

                                const submit = document.querySelector('button[type="submit"]');

                                if (indentify && password && submit) {
                                    chrome.storage.sync.set({ login: false });
                                    indentify.value = account.username;
                                    password.value = account.password;

                                    indentify.dispatchEvent(new Event('change'));
                                    password.dispatchEvent(new Event('change'));

                                    setTimeout(() => {
                                        submit.click();
                                    }, 100)
                                }
                            }, 1000);
                        }
                    })

                    chrome.storage.sync.get('login', ({ login }) => {
                        if (login) {
                            const avatarProfile = document.querySelectorAll('#js-dropdown-notif-message');
                            avatarProfile[0].nextSibling.querySelectorAll('button')[0].click();
                            document.querySelector('#simple-popper ul').lastChild.click();
                        }
                    })
                },
            });
        });
    }
})();

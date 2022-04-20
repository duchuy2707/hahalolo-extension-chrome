'use strict';

(() => {
    const btnStart = document.getElementById('btnStartAutoComment');
    const btnStop = document.getElementById('btnStopAutoComment');

    btnStart.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                let menuIndex = 0;
                let index = 1;

                window.contents = {
                    'ăn,món ăn,thịt,cá,kem,trứng,đồ ăn,thực phẩm': ['ngon quá ạ', 'Nhìn cũng hấp dẫn đó :)))', 'cái này ăn có mập hông ạ ?'],
                    'trailer,phim,điện ảnh,truyền hình': ['phim này hay voãi', 'xin tên phim ạ', 'cái này coi bao ghiền luông =))', 'tối về cày :)))'],
                    'bệnh,chết,tai nạn,cháy,nổ,giết người': ['haizzz khổ chưa', 'thương quá :(', 'chia buồn :('],
                    'du lịch,phượt,tham quan,checkin': ['xinh quá bạn ơi', 'chổ này tuyệt quá', 'chia sẽ quá tuyệt', 'xứng đáng một chuyến đi <3'],
                    default: ['đừng tin nó lừa đó', 'hay quá bạn ơi <3', 'xinh quá ạ', 'tuyệt vời'],
                    'quần,áo,giày,dép,điện thoại,chất vải,full tag': ['sản phẩm này còn hàng không ạ?', 'xin giá :P', 'mình sẽ mua sẳn phẩm này <3', 'inbox mình với :P'],
                };

                const getArrContentBykey = (key = '') => {
                    key = key.toLowerCase();
                    for (let k in window.contents) {
                        const arrK = k.split(',');
                        for (let i = 0; i < arrK.length; i++) {
                            if (key.indexOf(arrK[i]) !== -1) return k;
                        }
                    }
                    return 'default';
                }

                window.autoComment = setInterval(() => {
                    const allPost = document.querySelectorAll('div[id].MuiPaper-root.MuiCard-root:not([data-comment])');

                    if (document.querySelectorAll('div[id].MuiPaper-root.MuiCard-root[data-comment]').length >= 30) {
                        const menu = document.querySelectorAll('[aria-label="Hahalolo main menu"] a');

                        if (menu.length > menuIndex) {
                            menu[menuIndex].click();
                            menuIndex = menuIndex === 0 ? 1 : 0;
                        }
                    } else if (allPost.length > 0) {
                        allPost.forEach((item) => {
                            //focus input
                            setTimeout(() => {
                                item.querySelector('.temp-comment-editor').dispatchEvent(new Event('focus', { bubbles: true, cancelable: true }));
                                const contentPost = item.querySelector('div[id]').textContent;
                                const key = getArrContentBykey(contentPost);
                                setTimeout(() => {
                                    // add value
                                    item.querySelector('div[contenteditable]').innerHTML = `<p>${window.contents[key][Math.floor(Math.random() * window.contents[key].length)] || 'hay quá ạ'}</p>`;
                                    setTimeout(() => {
                                        //enter gởi text
                                        item.querySelector('div[contenteditable]').dispatchEvent(new KeyboardEvent('keydown', {
                                            code: 'Enter',
                                            key: 'Enter',
                                            charKode: 13,
                                            keyCode: 13,
                                            view: window
                                        }))
                                        // đánh dấu lại post đó đã comment
                                        item.setAttribute('data-comment', 'done');
                                    }, 2000)
                                }, 2000);
                            }, 5000 * (index + 1));

                            item.setAttribute('data-comment', 'inprocess');
                            index++;
                        });
                    }
                    // else if (document.querySelectorAll('div[id].MuiPaper-root.MuiCard-root[data-comment="inprocess"]').length === 0) {
                    //     // window.scrollTo(0, document.body.scrollHeight);
                    //     console.log('\n----inprocess----\n', document.querySelectorAll('div[id].MuiPaper-root.MuiCard-root[data-comment="inprocess"]'), '\n--------\n');
                    //     window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                    // }
                }, 2000);
            },
        });
    };

    btnStop.onclick = async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                clearInterval(window.autoComment);
            },
        });
    };
})();

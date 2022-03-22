// chrome.storage.sync.get('account', function (data) {
//     const { account = {} } = data;

//     if (account.username) {
//         let indentify = null;
//         const inval = setInterval(() => {
//             indentify = document.getElementById('signin-identity');
//             if (indentify !== null) {
//                 clearInterval(inval);

//                 chrome.storage.sync.set({ account: {} }); // remove

//                 const password = document.getElementById('password');

//                 indentify.value = account.username;
//                 password.value = account.password;

//                 indentify.dispatchEvent(new Event('change'));
//                 password.dispatchEvent(new Event('change'));

//                 const submit = document.querySelector('#signin button[type="submit"]');

//                 setTimeout(() => {
//                     submit.click();
//                 }, 0)
//             }
//         }, 100);
//     }
// })
const FileSaver = require('file-saver');
const date = '20200510';
const filename = `nfwp.4.2.0_${date}.dat`;
const configData = `###CONFIG###
:-:
###RULES###
:-:`;
require('./main.css');

function init() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/ninjafirewall-config-browser/sw.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
}

function handleDownload(evt) {
    evt.preventDefault();
    const email = document.querySelector('[name="email"]').value;
    const blob = new Blob([configData.replace('notifications@example.com', email)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}

init();
document.getElementById('download').addEventListener('submit', handleDownload, false);
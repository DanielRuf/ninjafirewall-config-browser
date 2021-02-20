const FileSaver = require('file-saver');
const date = '20201214';
const version = '4.3';
const filename = `nfwp.${version}_${date}`;
const configData = {
'default': {
    'text': 'default',
    'config': `###CONFIG###
:-:
###RULES###
:-:
`
    },
'silent': {
    'text': 'Silent Notification Setup (only important ones)',
    'config': `###CONFIG_SILENT###
:-:
###RULES###
:-:
`
    },
};

let currentConfig = 'default';
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

function renderDropdown() {
    const parent = document.querySelector('main');
    const options = Object.keys(configData);
    if (options.length && options.length === 1) {
        return;
    }

    const selectListWrapper = document.createElement('div');
    selectListWrapper.className = 'text-center';

    const selectListWrapperInner = document.createElement('div');
    selectListWrapperInner.innerText = 'Select configuration:';
    selectListWrapperInner.className = 'py-2';

    const selectList = document.createElement('select');
    selectList.id = 'config-select';
    selectList.style = 'width:150px;';
    selectList.className = 'bg-blue-500 text-white appearance-none border-none block rounded px-4';

    parent.appendChild(selectListWrapper);
    selectListWrapper.appendChild(selectListWrapperInner);
    selectListWrapper.appendChild(selectList);

    for (let i = 0; i < options.length; i++) {
        var option = document.createElement('option');
        option.value = options[i];
        option.text = configData[options[i]].text;
        if (i === 0) {
            option.selected = 'selected';
        }
        selectList.appendChild(option);
    }
}

function handleChangeConfig() {
    currentConfig = this.value;
}

function handleDownload(evt) {
    evt.preventDefault();
    const email = document.querySelector('[name="email"]').value;
    const blob = new Blob([configData[currentConfig].config.replace('notifications@example.com', email)], {type: "text/plain;charset=utf-8"});
    if (currentConfig === 'default') {
        FileSaver.saveAs(blob, `${filename}.dat`);
    } else {
        FileSaver.saveAs(blob, `${filename}_${currentConfig}.dat`);
    }
}

init();
renderDropdown();

const selectElement = document.getElementById('config-select');
if (selectElement) {
    selectElement.addEventListener('change', handleChangeConfig, false);;
}
document.getElementById('download').addEventListener('submit', handleDownload, false);
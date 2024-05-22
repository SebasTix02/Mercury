const qrcode = require('qrcode'); 

exports.embededQR = async (assets) => {
    let QR = '';
    let html = '';
    for(let i = 0; i < assets.length; i++){
        QR = await qrcode.toDataURL(`/QR/${assets[i].isComputer ? 'computer' : 'asset'}/${assets[i].assetKey}`);
        html +=  
        `<div class="qr-tag">
            <div class="qr">
                <img width="60px" src="${QR}">
            </div>
            <div class="asset-key">${assets[i].assetKey}</div>
        </div>`;
    }
    return html;
}
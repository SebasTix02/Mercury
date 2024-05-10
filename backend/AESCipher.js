const crypto = require('crypto');

class AESCipher {
    constructor() {
        this.algorithm = 'aes-256-ctr';
        this.ENCRYPTION_KEY = Buffer.from('ProyectoFinal'.padEnd(32, '\0'), 'utf-8');
        this.IV_LENGTH = 16;
    }

    encrypt(text) {
        let iv = crypto.randomBytes(this.IV_LENGTH);
        let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.ENCRYPTION_KEY, 'hex'), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt(text) {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.ENCRYPTION_KEY, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }   
}

module.exports = AESCipher;

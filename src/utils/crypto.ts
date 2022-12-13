import CryptoJS from 'crypto-js';

interface DATA {
    [name: string]: any;
}

class Crypto {
    pubKey: String;
    priKey: String;
    
    constructor(pubKey: String, priKey: String) {
        this.pubKey = pubKey;
        this.priKey = priKey;
    }

    encrypt(data: DATA) {
        const pubKey = CryptoJS.enc.Utf8.parse(this.pubKey)
        const priKey = CryptoJS.enc.Utf8.parse(this.priKey)
        const src = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
        return CryptoJS.DES.encrypt(src, pubKey, {
            iv: priKey, // 初始向量
            mode: CryptoJS.mode.CBC, // 加密模式
            padding: CryptoJS.pad.Pkcs7, // 填充方式
        }).toString()
      }

      decrypt(data: String) {
        const pubKey = CryptoJS.enc.Utf8.parse(this.pubKey)
        const priKey = CryptoJS.enc.Utf8.parse(this.priKey)
        const jsonStr = CryptoJS.DES.decrypt(data, pubKey, {
            iv: priKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        
        console.log(jsonStr, 123);

        return JSON.parse(jsonStr);
      }
}

export default Crypto;
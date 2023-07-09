import CryptoJS from "crypto-js"
import crypto from 'crypto'


export class Encryptor {
    private securityKey:string
    constructor(securityKey:string){
        this.securityKey = securityKey
    }

    public encrypt = (value:string) => {
        return CryptoJS.AES.encrypt(value, this.securityKey).toString()
    }

    public decrypt = (encryptValue:string) => {
        return CryptoJS.AES.decrypt(encryptValue, this.securityKey).toString(CryptoJS.enc.Utf8)
    }
}


export class Md5Encryptor {
    public encrypt = (value:string) => {
        const md5 = crypto.createHash('md5')
        return md5.update(value).digest('hex')
    }
}
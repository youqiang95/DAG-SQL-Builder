import JSEncrypt from 'jsencrypt'

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAztqthhHyGqnZfD5byvA9
HWBpw5QfRwXfars7XUhczjE1X4VRUX79c9zq1Sh3M6KtYe0qs6ViuW58kOCmUBY4
+TXO6ayA9pGdYBGoq1OcEOzWIxeatfPQiDP6Nq/yX9GnkS+7wgMtUhQ5clvaS7jD
1nc0xT7I48pXhM/rTdG4tO6924JFXYRkxZlwYbD6WbNmnnusiIfxHcDWkUZsPrFX
E4U3dVX0KCStTvio5Y3n1RX1xKD2oTxGcTKziIZ3FsT7NOyDyzs+QHqzYCChcnGX
k1CEX0cSBt/Elklck+JpajBGnfaRD1jitTWbqjhUFyCVv2oHbB47L2TRK+jfZPqL
/wIDAQAB
-----END PUBLIC KEY-----`


export const encryptString = (str:string)=>{
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(PUBLIC_KEY);
    let encryptedData = encrypt.encrypt(str)
    return encryptedData
}
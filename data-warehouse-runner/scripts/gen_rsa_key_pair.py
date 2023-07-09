from Crypto.PublicKey import RSA

# 生成密钥对
key = RSA.generate(2048)

# 导出私钥
private_key = key.export_key()
with open('private_key.pem', 'wb') as f:
    f.write(private_key)

# 导出公钥
public_key = key.publickey().export_key()
with open('public_key.pem', 'wb') as f:
    f.write(public_key)
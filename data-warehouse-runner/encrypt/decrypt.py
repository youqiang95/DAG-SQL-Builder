from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
from Crypto import Random
import base64
from encrypt.key import PRIVATE_KEY, PUBLIC_KEY

def decrypt(data):
    cipher = PKCS1_v1_5.new(RSA.importKey(PRIVATE_KEY.encode()))
    encrypted_data = base64.b64decode(data.encode('utf-8'))
    decrypted_data = cipher.decrypt(encrypted_data, Random.new().read).decode()
    
    return decrypted_data


def encrypt(data):
    rsa_key = RSA.importKey(PUBLIC_KEY.encode())
    cipher = PKCS1_v1_5.new(rsa_key)
    message = data.encode()
    encrypted_data = cipher.encrypt(message)
    encoded_data = base64.b64encode(encrypted_data).decode('utf-8')

    return encoded_data

const crypto = require('crypto');

const alicePublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuvSaebP91ViFA7T+SNOs
P6LZUA2hfL2KCB2P9IfHgsVnKyeQGmOxtSfi5e2iCFWQwYKwKRp2z7rZK7XUeuMc
ydPzf6ZVB657tRiAKFrsz1sWSC3NtOJuLFnmHdQu8BWlpaOBZjgn/clyVnTiSU77
Kp8UKQup0jK8DouaWGiJKA2UIK0wU/WsHcrq7ZrgYi4L4o9Xh+4k1vgTY31pMVDA
vRo70j1uBdNlupxHqJEdwa5NK6Z2A+/k9idEf59QvhBIQKliNmqtmK917qfpjvfV
xiqOBCgVqG478Gp3grla5sjGZ3JwjCv2hHJ5lCpX4fM+Hm0tdr12lHSJgi7KZkdR
XwIDAQAB
-----END PUBLIC KEY-----`;

const alicePrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCt5QMW3Qda4JJJ
eLPL2woF7GLVvhx1lRbRncjtjBM9Y8PYolpRBp+/ZMHq5HLlnOc2pX07+94BHsF6
MCClazGfoS7F4fAx4RzGO8EN0f4ImoiDhkl4/tiGiioRVY7mC+SwrRXkV3KwuPmQ
UaaZekpRNUy6d1z7Vs4dQWktaIzCm+fZBkjk8WLHs2ig2d8dfX2PdqWWR1CbAHvz
QrqpsIOa2dIyWTMkgv2C1TTwxH3ibto910e7rGQ0XONmLzWmuGZnBidKofn6ULv9
7CUnSNwyFRkZ6SlsKyqIzzssC1oENqCRmROAwfGcdNOOA4k0uKYAMsuUR+OFr9+q
NJrHj5/DAgMBAAECggEADs28CBe+lwwe2ACzCbaMHA9Q0Ke+Y3zS3vsYOQTKOdkt
jy/ZvCPHY13wAOT8Kl5DnrbS5Pw0R5Mh3xrhb0OjYKwHlSf+sI2x9ebuBepWaSQY
CAkIEIldedf27IKEnO1D8Dh5RcxIrWZp3yaG+3IviR9I+LzNnnCi26xkXaMUt0Jg
0gSX19z3rSJ/QUTcj4P8UK+Xs3vKo9PUKTjgf6l20PXuD7r3DWKBROMG0Xb/Vd5c
1R+rNgEpKfJs2xmz/LgMUybGCbNW6R+y1DVDrfqsyK2QvVgOKoUZhMWpeJKcgexN
wz+JfMzCekVTOKnkuvKkPNBlfQ/MOq3XoqPrwx3wMQKBgQDhZn2ywEmAPtPpqGUb
OOnn5RdkoRXKC5T/pTQBHqj/mIyRuNWAx6wOBMIK1PXQO9ENqrzWlIdDaiDZEfK5
V4/YuJuF4npcGFd+aQ3yjjum7w+rvaL68y52gWnk1UrZPTpLo7KrEieprKTN/8wp
628Ih0kQhf4mpP3Uo+MyJ/KfswKBgQDFgIB4oizbl/vzIafOBhfm2ePlqoYMObNT
ohgZHqaVqbG3TUHUxpBJ3DuKoMpd3O1wRxBseOr/1vDKVWdUm2MV29p7VMYi+Usf
3hyFsx72C/Np2MT/4W6eXJx8zXu1ycU3IdvSFQIutsN+1nT6SRBjVovxdFK3yRmD
u8xWy6F3sQKBgH52ZJv/6r07guYcBu4pFoN3M5LQFkuQB/8PD4h5TVRqoKO50oA4
hz4uSTiOl4RHq1lBrEWwe9vFFbz0pvx6Nkjf+tI5aXF2btCL3Ll0N9/HTUGMWn72
JeFzZphvW1lbUvPRWpNE0mAOb0Ds/f2fDGL6lHHi29+OvqOpd/VSGHylAoGAENfN
nPwPoUaL2Qc0vVAtt6U7Vzm8psxA68/2CCZiBH9tRXmUNKYeZf4fIcpml6ygnyOg
Ve/V8q2M6WRxJHj/8TxHnJ71KsRh0LzrZ8eHy2nnf05aNowuF9lECyym8TDc3b/I
dFkQT5WMhIObhEC44g/ebWADMeM3htF8Mqa5BXECgYBv672rKtH8dmjFjU8iaFKO
1ChapJMKDqxecEgkRsMYVH3+kWX7MoSwp5p2uz55R4C+p1ihfk1kbEG1Q+jmFWRm
BJfj92+9qnpbHb/S0igctklka1ZmUh7B3ioToQvRQTirUf7M/NYGkWGUo/+2x3CI
JnS+DY6hFU/MAt0rl1QW3g==
-----END PRIVATE KEY-----`;

const bobPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuvSaebP91ViFA7T+SNOs
P6LZUA2hfL2KCB2P9IfHgsVnKyeQGmOxtSfi5e2iCFWQwYKwKRp2z7rZK7XUeuMc
ydPzf6ZVB657tRiAKFrsz1sWSC3NtOJuLFnmHdQu8BWlpaOBZjgn/clyVnTiSU77
Kp8UKQup0jK8DouaWGiJKA2UIK0wU/WsHcrq7ZrgYi4L4o9Xh+4k1vgTY31pMVDA
vRo70j1uBdNlupxHqJEdwa5NK6Z2A+/k9idEf59QvhBIQKliNmqtmK917qfpjvfV
xiqOBCgVqG478Gp3grla5sjGZ3JwjCv2hHJ5lCpX4fM+Hm0tdr12lHSJgi7KZkdR
XwIDAQAB
-----END PUBLIC KEY-----`;

const message = "I want some apples";  

const sign = crypto.createSign('SHA256');  
sign.update(message);  
sign.end();  
const signature = sign.sign(alicePrivateKeyPem, 'hex'); 

const encryptedMessage = crypto.publicEncrypt(bobPublicKey, Buffer.from(message)).toString('hex');  

console.log("Signature:", signature);
console.log("Message:", encryptedMessage);

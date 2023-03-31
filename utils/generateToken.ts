import bcrypt from 'bcrypt'
import Cryptr from "cryptr";

const saltRounds = 10;
const secretKey = "$3&17z@4z2Gx";
const salt = bcrypt.genSaltSync(saltRounds);

const generateHash = (text:string) => {
    return bcrypt.hashSync(text,salt)
}

const compareTextAndHash = (text:string,hash:string) => {
    return bcrypt.compareSync(text,hash)
}

const encryptText = (text:string) => {
    const cryptr = new Cryptr(secretKey);
    return cryptr.encrypt(text);
}

const descryptText = (text:string) => {
    const cryptr = new Cryptr(secretKey);
    return cryptr.decrypt(text);
}

const generateRandomString = (num:number) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    })
        .join('')
        .toUpperCase()
}

export {
    generateHash,
    compareTextAndHash,
    generateRandomString,
    encryptText,
    descryptText
}
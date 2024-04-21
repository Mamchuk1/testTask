const alphabet = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
export function generateName(length) {
    let word = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        word += alphabet[randomIndex];
    }
    return word;
}

export function generatePhoneNumber(length) {
    let number = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * number.length);
        number += numbers[randomIndex];
    }
    return number;
}

export function generateCompanyName(length) {
    return generateName(length)
}
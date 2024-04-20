const alphabet = "abcdefghijklmnopqrstuvwxyz";
export function generateName(length) {
    let word = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        word += alphabet[randomIndex];
    }
    return word;
}
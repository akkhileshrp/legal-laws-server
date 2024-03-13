const crypto = require('crypto');

function generateSecureRandomNumber(min, max) {
    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    if (bytesNeeded > 6) {
        throw new Error('Range too large');
    }
    const randomBytes = crypto.randomBytes(bytesNeeded);
    let randomNumber = 0;
    for (let i = 0; i < bytesNeeded; i++) {
        randomNumber <<= 8;
        randomNumber |= randomBytes[i];
    }
    randomNumber %= range;
    return min + randomNumber;
}

module.exports = generateSecureRandomNumber;
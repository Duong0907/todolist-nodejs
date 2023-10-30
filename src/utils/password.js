const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
}

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    hashPassword, 
    comparePassword
}
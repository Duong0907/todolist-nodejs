const jwt = require('jsonwebtoken');

const generateAccessToken = (claims) => {
    const token = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    console.log('expire: ' + process.env.ACCESS_TOKEN_EXPIRES_IN);
    return token;
};

const verifyAccessToken = (accessToken) => {
    var result;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        result = {
            error: err,
            user: user,
        };
    });
    return result;
};

module.exports = {
    generateAccessToken,
    verifyAccessToken,
};

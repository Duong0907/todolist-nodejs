// const jwtUtil =  require('../utils/jwt');
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json("You're not authorizated");

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json("You're not authorizated");
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, claims) => {
        if (err) {
            return res.status(401).json("You're not authorizated");
        }
        else {
            req.claims = claims;
            next();
        }
    });
}


module.exports = authMiddleware;
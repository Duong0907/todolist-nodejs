// const jwtUtil =  require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { UnauthorizedErrorResponse } = require('../global/response');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const unauthoriedResponse = new UnauthorizedErrorResponse(
            'Missing access token',
        );
        return res.status(401).json(unauthoriedResponse);
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
        const unauthoriedResponse = new UnauthorizedErrorResponse(
            'Invalid access token',
        );
        return res.status(401).json(unauthoriedResponse);
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, claims) => {
        if (err) {
            const unauthoriedResponse = new UnauthorizedErrorResponse(
                'Invalid access token',
            );
            return res.status(401).json(unauthoriedResponse);
        } else {
            req.claims = claims;
            next();
        }
    });
};

module.exports = authMiddleware;

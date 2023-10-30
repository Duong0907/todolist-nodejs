const db = require('../models/index');
const passwordUtil = require('../utils/password');
const jwtUtil = require('../utils/jwt');
const userModel = db.users;

const login = async (credentials) => {
    const user = await userModel.findOne({
        where: {
            username: credentials.username,
        }
    });

    // Check username
    if (!user) {
        return {
            message: "Wrong username or password",
            error: true,
            statusCode: 401,
        };
    }

    // Check password
    const isCorrect = await passwordUtil.comparePassword(credentials.password, user.password);
    if (!isCorrect) {
        return{
            message: "Wrong username or password",
            error: true,
            statusCode: 401,
        }; 
    }

    // Generate access token
    const claims = {
        id: user.id
    }
    const accessToken = jwtUtil.generateAccessToken(claims);

    return {
        message: "Login successfully",
        error: false,
        statusCode: 200,
        data: {
            user: user,
            access_token: accessToken
        }
    };
}

module.exports = {
    login
}
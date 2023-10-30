const authService = require('../services/authService');

const login = async (req, res) => {
    let credentials = {
        username: req.body.username,
        password: req.body.password
    }
    const response = await authService.login(credentials);
    res.status(response.statusCode).json(response);
}

module.exports = {
    login
}
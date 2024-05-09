const userService = require('../services/user.service');

const createUser = async (req, res) => {
    let newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };

    let response = await userService.createUser(newUser);
    res.status(response.statusCode).json(response);
};

const getUserByID = async (req, res) => {
    let userid = req.params.id;
    let response = await userService.getUserByID(userid);
    res.status(response.statusCode).json(response);
};

const updateUser = async (req, res) => {
    let userid = req.params.id;
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    const response = await userService.updateUser(userid, newUser);
    res.status(response.statusCode).json(response);
};

const deleteUser = async (req, res) => {
    let userid = req.params.id;
    const response = await userService.deleteUser(userid);
    res.status(response.statusCode).json(response);
};

const getCurrentUser = async (req, res) => {
    const userID = req.claims.id;
    const response = await userService.getUserByID(userID);
    res.status(response.statusCode).json(response);
};

module.exports = {
    createUser,
    getUserByID,
    getCurrentUser,
    updateUser,
    deleteUser,
};

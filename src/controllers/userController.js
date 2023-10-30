const userService = require('../services/userService');

const createUser = async (req, res) => {
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    let result = await userService.createUser(newUser);
    res.status(200).json(result);
}

const getUserByID = async (req, res) => {
    let userid = req.params.id;
    let response = await userService.getUserByID(userid);
    res.status(response.statusCode).json(response);
}

const updateUser = async (req, res) => {
    let userid = req.params.id;
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    const response = await userService.updateUser(userid, newUser);
    res.status(response.statusCode).json(response);
}

const deleteUser = async (req, res) => {
    let userid = req.params.id;
    console.log(userid);
    const response = await userService.deleteUser(userid);
    res.status(response.statusCode).json(response);
}

module.exports = {
    createUser,
    getUserByID,
    updateUser,
    deleteUser
}
const db = require('../models/index');
const passwordUtil = require('../utils/password');
const UserModel = db.users;

const createUser = async (user) => {
    // Hash password
    let hashedPassword = await passwordUtil.hashPassword(user.password);
    user.password = hashedPassword;

    const createdUser = await UserModel.create(user);
    return {
        message: "Create user successfully",
        error: false,
        statusCode: 200,
        data: {
            user_id: createdUser.id
        }
    };
}

const getUserByID = async (id) => {
    const user = await UserModel.findOne({
        where: {
            id: id
        }
    });

    if (!user) {
        return {
            message: "User not found",
            error: true,
            statusCode: 404,
        };
    }
        

    // Hide password
    user.password = '********';
    
    return {
        message: "Get user by ID successfully",
        error: false,
        statusCode: 200,
        data: {
            user: user
        }
    };
}

const updateUser = async (useid, user) => {
    await UserModel.update(user, {
        where: {
            id: useid
        }
    });

    return {
        message: "Update user successfully",
        error: false,
        statusCode: 200,
    };
}

const deleteUser = async (userid) => {
    await UserModel.destroy({
        where: {
            id: userid
        }
    });

    return {
        message: "Delete user successfully",
        error: false,
        statusCode: 200,
    };
}

module.exports = {
    createUser,
    getUserByID,
    updateUser,
    deleteUser
}
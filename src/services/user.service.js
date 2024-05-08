const {
    CreatedResponse,
    NotFoundErrorResponse,
    OKResponse,
} = require('../global/response');
const db = require('../models/index');
const passwordUtil = require('../utils/password');
const UserModel = db.users;

const createUser = async (user) => {
    // Hash password
    let hashedPassword = await passwordUtil.hashPassword(user.password);
    user.password = hashedPassword;

    const createdUser = await UserModel.create(user);
    createdUser.password = '***';

    return new CreatedResponse('Create user successfully', {
        user_id: createdUser.id,
    });
};

const getUserByID = async (id) => {
    const user = await UserModel.findOne({
        where: {
            id: id,
        },
    });

    if (!user) {
        return new NotFoundErrorResponse('User not found');
    }

    // Hide password
    user.password = '********';

    return new OKResponse('Get user by ID successfully', {
        user: user,
    });
};

const updateUser = async (useid, user) => {
    const savedUser = await UserModel.update(user, {
        where: {
            id: useid,
        },
    });

    return new OKResponse('Update user successfully', savedUser);
};

const deleteUser = async (userid) => {
    await UserModel.destroy({
        where: {
            id: userid,
        },
    });

    return new OKResponse('Delete user successfully', null);
};

module.exports = {
    createUser,
    getUserByID,
    updateUser,
    deleteUser,
};

const {
    CreatedResponse,
    NotFoundErrorResponse,
    OKResponse,
    BadRequestErrorResponse,
} = require('../global/response');
const db = require('../models/index');
const passwordUtil = require('../utils/password');
const { isValidEmail, isValidPassword } = require('../utils/validator');
const UserModel = db.users;

const createUser = async (user) => {
    const { firstname, lastname, email, password } = user;

    // Validate email
    if (!isValidEmail(email)) {
        return new BadRequestErrorResponse('Invalid email');
    }

    const existedUser = await UserModel.findOne({where: {
        email: user.email
    }});
    if (existedUser) {
        return new BadRequestErrorResponse("Existed email");
    }
    
    // Validate password
    if (!isValidPassword(password)) {
        return new BadRequestErrorResponse('Password must have min 8 letter, with at least a symbol, upper and lower case letters and a number');
    }

    // Hash password
    let hashedPassword = await passwordUtil.hashPassword(password);

    const createdUser = await UserModel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });
    createdUser.password = '***';

    return new CreatedResponse('Create user successfully', {
        user_id: createdUser.id,
    });
};` `

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

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return User;
};

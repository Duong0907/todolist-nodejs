module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return Todo;
}
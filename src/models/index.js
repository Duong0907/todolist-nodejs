const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.port,
    logging: false,
    dialectOptions: {
        ssl: {
            require: dbConfig.SSL_MODE
        }
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connect Db successfully');
    })
    .catch((err) => {
        console.log('Error when connecting to db: ', +err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./user.model.js')(sequelize, DataTypes);
db.todos = require('./todo.model.js')(sequelize, DataTypes);

// Setup foreign keys
db.users.hasMany(db.todos, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
});
db.todos.belongsTo(db.users, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
});

// If 'force' is set = true, data will be deleted when starting server
db.sequelize.sync({ force: false }).then(() => {
    console.log('Sequelize sync done');
});

module.exports = db;

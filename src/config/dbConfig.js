const dbConfig = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'secret',
    DB: 'postgres',
    dialect: 'postgres',
    port: 5433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbConfig;

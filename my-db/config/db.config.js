module.exports = {
    HOST: "localhost",
    USER: "testuser0",
    PASSWORD: "m6yb30k",
    DB: "ricknmorty0",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
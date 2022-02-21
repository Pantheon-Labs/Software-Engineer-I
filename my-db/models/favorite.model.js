module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        favorite: {
            type: Sequelize.STRING
        }
    });
    return Favorite;
};
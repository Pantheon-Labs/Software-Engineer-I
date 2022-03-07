module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define("favorite", {
        id: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
        favorite_id: {
            type: Sequelize.STRING
        }
    });
    return Favorite;
};
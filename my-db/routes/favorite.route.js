const { authJwt } = require("../middleware");
const controller = require("../controllers/favorite.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/favorite/all", controller.allAccess);
    app.get(
        "/api/favorite/user",
        [authJwt.verifyToken],
        controller.favorites
    );
    app.post(
        "/api/favorite/user",
        [authJwt.verifyToken],
        controller.add
    );
    
    app.get(
        "/api/favorite/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );
    app.get(
        "/api/favorite/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};

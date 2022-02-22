exports.allAccess = (req, res) => {
    res.status(200).send("Public Favorites.");
};

exports.add = (req, res) => {
    res.status(200).send("User Add Favorites.");
};

exports.favorites = (req, res) => {
    res.status(200).send("User List Favorites.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Favorites.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Favorites.");
};
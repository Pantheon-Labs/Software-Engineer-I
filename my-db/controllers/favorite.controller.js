exports.allAccess = (req, res) => {
    res.status(200).send("Public Favorites.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Favorites.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Favorites.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Favorites.");
};
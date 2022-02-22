const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const db = require("./models");

const Role = db.role;

//Remove force: true in production or tables will drop
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

var corsOptions = {
    origin: "http://localhost:8081"
};


function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


require('./routes/auth.route.js')(app);
require('./routes/user.route.js')(app);
require('./routes/favorite.route.js')(app);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the RickNMorty api login demo" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

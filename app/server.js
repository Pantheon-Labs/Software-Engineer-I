require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const spotify = require("./spotify");

async function run() {
  // spotify authorization & bearer token
  let id = process.env.CLIENT_ID;
  let secret = process.env.CLIENT_SECRET;
  let bearer = await spotify.returnBearer(id, secret);

  // server
  const PORT = 8888;
  const app = express();

  app.use(morgan("tiny"));
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/index.html"));
  });
  app.get("/artist", async (req, res) => {
    let data = await spotify.getArtist(bearer, req.query.search);
    res.status(200).send(data);
  });

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
  });
}
run();

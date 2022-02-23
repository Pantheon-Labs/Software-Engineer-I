require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const spotify = require("./spotify");
const path = require("path");

async function run() {
  // spotify bearer token
  let client_id = process.env.CLIENT_ID;
  console.log(client_id);
  let client_secret = process.env.CLIENT_SECRET;
  console.log(client_secret);
  let bearer = await spotify.returnBearer(client_id, client_secret);

  // server
  const PORT = 8888;
  const app = express();

  app.use(morgan("tiny"));
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/index.html"));
  });
  app.get("/artist", async (req, res) => {
    var result = await spotify.searchArtist(bearer, req.query.search);
    console.log(result);
    res.json({ status: "ok", result }).end();
  });

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
  });
}
run();

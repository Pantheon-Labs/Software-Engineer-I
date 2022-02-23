require("dotenv").config();

const express = require("express");
const spotify = require("./spotify");
const path = require("path");

async function run() {
  // spotify bearer token
  var client_id = process.env.CLIENT_ID;
  console.log(client_id);
  var client_secret = process.env.CLIENT_SECRET;
  console.log(client_secret);
  var bearer = await spotify.returnBearer(client_id, client_secret);

  // server
  const PORT = 8888;
  const app = express();

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/index.html"));
  });
  app.get("/get", async (req, res) => {
    var result = await spotify.search(bearer, req.query.search);
    console.log(result);
    res.json({ status: "ok", result }).end();
  });

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
  });
}
run();

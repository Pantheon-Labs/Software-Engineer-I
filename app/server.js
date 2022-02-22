require("dotenv").config();

const express = require("express");
const returnAPIKey = require("./key");
const path = require("path");

async function run() {
  // spotify bearer token
  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  var bearer = await returnAPIKey(client_id, client_secret);
  console.log(bearer);

  // server
  const PORT = 8888;
  const app = express();

  app.use(express.static(path.join(__dirname, "public")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/html/index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
  });
}
run();

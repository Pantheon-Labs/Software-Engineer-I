const express = require('express')
const path = require('path')

const PORT = 8888

var app = express();

app.use("/js", express.static(path.join(__dirname, "static/js/")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./static/html/index.html"));
  });


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
  });


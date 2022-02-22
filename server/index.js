const path = require("path");
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
const app = express();

// Use .env variables if not in production mode
if (process.env.NODE_ENV !== "production") {
  require("../secrets");
}

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

// Export app for testing
module.exports = app;

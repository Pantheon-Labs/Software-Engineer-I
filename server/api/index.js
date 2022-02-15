const axios = require("axios");
const router = require("express").Router();
module.exports = router;

/*
 * Routes on "/api"
 */

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/person/popular",
      {
        params: { api_key: process.env.TMDB_KEY },
      }
    );

    res.json(response.data.results);
  } catch (err) {
    next(err);
  }
});

router.get("/search/person", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/person",
      {
        params: { api_key: process.env.TMDB_KEY, query: req.query["starName"] },
      }
    );

    res.json(response.data.results);
  } catch (err) {
    next(err);
  }
});

router.get("/person/birthday", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/person/" + req.query["starId"],
      {
        params: { api_key: process.env.TMDB_KEY },
      }
    );

    res.json(response.data.birthday);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

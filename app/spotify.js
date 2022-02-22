require("dotenv").config();

const request = require("request");

function returnBearer(client_id, client_secret) {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  return new Promise((resolve) => {
    request.post(authOptions, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        var token = body.access_token;
        resolve(token);
      }
    });
  });
}

function search(token, query) {
  var options = {
    url: "https://api.spotify.com/v1/search?q=" + query,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return new Promise(function (resolve) {
    request.get(options, (err, res, body) => {
      if (!err) {
        console.log(body);
        resolve(body);
      }
    });
  });
}

module.exports = {
  returnBearer,
  search,
};

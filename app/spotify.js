require("dotenv").config();

const request = require("request");

function returnBearer(clientId, clientSecret) {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
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
  function concatURL(query) {
    return "https://api.spotify.com/v1/search?q=" + query + "&type=artist";
  }
  var options = {
    url: concatURL(query),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return new Promise(function (resolve) {
    request.get(options, (err, res, body) => {
      if (!err) {
        resolve(body);
      }
    });
  });
}

module.exports = {
  returnBearer,
  search,
};

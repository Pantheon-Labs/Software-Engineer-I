require("dotenv").config();

const axios = require("axios");
const qs = require("qs");

async function returnBearer(clientId, clientSecret) {
  let url = "https://accounts.spotify.com/api/token";
  let data = qs.stringify({ grant_type: "client_credentials" });
  let config = {
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = await axios.post(url, data, config);
  console.log(response.data.access_token);
  return response.data.access_token;
}

async function searchArtist(token, query) {
  function concatURL(query) {
    return "https://api.spotify.com/v1/search?q=" + query + "&type=artist";
  }

  let url = concatURL(query);
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(url, config);
  return response.data;
}

module.exports = {
  returnBearer,
  searchArtist,
};

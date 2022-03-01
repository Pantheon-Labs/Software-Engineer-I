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
  return response.data.access_token;
}

async function getArtist(token, query) {
  let url = "https://api.spotify.com/v1/search?q=" + query + "&type=artist";
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
  getArtist,
};

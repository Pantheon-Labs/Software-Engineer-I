require('dotenv').config()
const request = require('request')


var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

var TOKEN

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, async function(error, response, body) {
  if (!error && response.statusCode === 200) {
    TOKEN = await body.access_token;
  }
});








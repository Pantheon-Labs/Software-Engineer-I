require('dotenv').config()
const request = require('request')


function returnAPIKey(client_id, client_secret) {

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

  return new Promise(function(resolve) {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        TOKEN = body.access_token;
        resolve(TOKEN)
      }
    })
  });
};

module.exports = returnAPIKey
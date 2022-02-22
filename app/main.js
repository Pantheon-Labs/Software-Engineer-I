require('dotenv').config()

const returnAPIKey = require('./key')

async function main() {
    var client_id = process.env.CLIENT_ID;
    var client_secret = process.env.CLIENT_SECRET;

    const key = await returnAPIKey(client_id, client_secret)
    console.log(key)
}

main()

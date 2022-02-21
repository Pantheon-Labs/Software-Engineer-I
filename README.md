# Star Signs

Node.js web application to search for celebrities to find their astrological sign.

Check out the [deployed app!](https://star-star-signs.herokuapp.com)

## Set up

First install dependencies:

```
npm install
```

To build and run:

```
npm run start-dev
```

## TMDB Api

This application uses the TMDB api to access information about stars.

Setting up the api will require a unique api key. You can get your own api key by creating an account on TMDB and going to the [api settings](https://www.themoviedb.org/settings/api).

Create a `secrets.js` file and a variable in the node environment that can be accessed in the api calls of the application.

Your `secrets.js` should look someting like this:

```
process.env.TMDB_KEY = "YOUR_UNIQUE_API_KEY_FROM_TMDB"

```

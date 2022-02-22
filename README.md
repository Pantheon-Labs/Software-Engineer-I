# Star Signs

Node.js web application to search for celebrities to find their astrological sign.

Check out the [deployed app!](https://star-star-signs.herokuapp.com)

## About Me

For better or worse, this project says a lot about me. It combines all of my guilty pleasures at once: astrology, celebrity gossip, and building single-page applications.

Thanks for taking a look!

## Tech Stack

Built with React, React-Bootstrap, and Express. Testing with Mocha, Chai, and Enzyme. Deployed on Heroku.

## Set up

Install dependencies:

```
npm install
```

To build and run:

```
npm run start-dev
```

To test:

```
npm test
```

## TMDB Api

This application uses the TMDB api to access information about stars.

Setting up the api will require a unique api key. You can get your own api key by creating an account on TMDB and going to the [api settings](https://www.themoviedb.org/settings/api).

Create a `secrets.js` file and a variable in the node environment that can be accessed in the api calls of the application.

Your `secrets.js` should look someting like this:

```
process.env.TMDB_KEY = "YOUR_UNIQUE_API_KEY_FROM_TMDB"

```

## Plans for Future Versions

- More details about individual celebrities when selected. The user should be able to see their birthday and some of the work they've done!
- Search by movies! The user can search by a movie or tv show and see the list of the cast.
- Makeover! This is a playful application, and the design should reflect that! More colors and pictures are a must!
- Optimize the search. The search takes longer than is ideal because it takes a lot of requests to the api to get the birthdays of each star as they come up in the search.
- Routes to each individual actor and search result. Currently the url doesn't change as the user searches and select stars. That's fine for the MVP, but doesn't cut it when a user wants to navigate to their previous search.

# `Rick N Morty Api Viewer`

This is an app I created to view the different characters that are present in the Rick N Morty Api.

They do have an NPM module, but, I opted to just use axios and pull data from the api that way.

To run this 'cd my-app' then first install dependencies with 'yarn install', then 'yarn dev or yarn build, then yarn start'.

The api is a little tricky, out of hundreds of characters and locations, they don't provide the page numbers, only the max pages for a query. At the same time, they only show 20 results per query and the ids never match. Where we query a page the ids are always 0-19, however the actual ids for the results also start at 1 and just keep going up. Example Rick Sanchez, the 1st result is 1 whereas the reference id is 0. I now have this part working correctly.

Part 2 backend shenanigans, it took a whole day to get postgres setup on WSL2, which Ubuntu is supposed to come with, I guess not this version.

    To run backend server 'cd my-db' from initial folder. If you're new to Postgres, create a new user, I called mine testuser0, give it password. I store my passwords in a process.env file. In my files the once you have a user that will authenticate it automatically sets up a default structure for all data and drops all data once you restart it, to stop this remove force: true from line 11 of server.js

The attempt here is to allow login and allow people to favorite their favorite characters, this portion isn't complete yet.
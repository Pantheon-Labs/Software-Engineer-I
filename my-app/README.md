# `Rick N Morty Api Viewer`

This is an app I created to view the different characters that are present in the Rick N Morty Api.

They do have an NPM module, but, I opted to just use axios and pull data from the api that way.

To run this 'cd my-app' then first install dependencies with 'yarn install', then 'yarn dev or yarn build, then yarn start'.

The api is a little tricky, out of hundreds of characters and locations, they don't provide the page numbers, only the max pages for a query. At the same time, they only show 20 results per query and the ids never match. Where we query a page the ids are always 0-19, however the actual ids for the results also start at 1 and just keep going up. Example Rick Sanchez, the 1st result is 1 whereas the reference id is 0. I now have this part working correctly.

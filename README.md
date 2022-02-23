# Spotify Artist Search

An application that hosts a local server that authenticates with Spotify and requests information using bearer token.

User enters query in search bar, which the client then requests to your local server. The local server then takes the query and transforms it into an API Request to Spotify.

The goal was to practice authenticating with an API and keeping client secrets and authentication tokens away from the client.

## Installation (For Collaborators)

1. First, set up your Github account and install git

2. Clone https://github.com/dmartinezgamboa/Software-Engineer-I

   > Make sure to clone the repository.

   ```
   git clone git@github.com:dmartinezgamboa/Software-Engineer-I
   ```

3. Fork and set up your remote

   > Replace `<your_name>` with your first name and `<your_username>` with your GitHub username.

   ```
   git remote add <your_name> git@github.com:<your_username>/Software-Engineer-I
   ```

## Setup your dev environment

1. Create an Application & obtain client ID/secret from Spotify developer portal:

   > _Requires Valid Spotify Account:_

   https://developer.spotify.com/documentation/general/guides/authorization/app-settings/

2. Create .env config file in root folder

   > _Use the following format:_

   ```
   CLIENT_ID={client_id}
   CLIENT_SECRET={client_secret}
   ```

3. Install node dependencies:

   ```
   npm install
   ```

4. Run Application:

   ```
   npm start
   ```

   > Run Developer Mode

   ```
   npm run dev
   ```

5. Open you browser:
   ```
   http://localhost:{PORT}/
   ```
   > PORT = 8888 by default

Future Features:

- Testing
- Organizing routers/controllers into a separte module to clean up server.js
- Authentication Bearer Token expires after 1 hour. Implement logic to check if token is expired and request new.

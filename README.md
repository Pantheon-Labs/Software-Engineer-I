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

1. Create Application & Obtain client ID/secret from Spotify developer portal:

   > Requires Valid Spotify Account:

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

5. Run Developer Mode

   ```
   npm run dev
   ```

6. Run Test Suites:

   ```
   npm run test
   ```

   WIP:

- Add name & description of app
- draft Pull Request to show features of code, my reasoning, what i wanted to feature + wishlist if had more time
- add tests w/ jest
- add logic for refresh token after 1 hr

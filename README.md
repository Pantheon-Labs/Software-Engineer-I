## Installation (For Collaborators)

1. First, set up your Github account and install git

1. Clone https://github.com/dmartinezgamboa/Software-Engineer-I

   ```
   $ git clone git@github.com:dmartinezgamboa/Software-Engineer-I
   ```

   > Make sure to clone the roastme repository.

1. Fork roastme-bot and set up your remote
   ```
   $ git remote add <your_name> git@github.com:<your_username>/Software-Engineer-I
   ```
   > Replace `<your_name>` with your first name and `<your_username>` with your GitHub username.

## Setup your dev environment

### 1. Install node dependencies:

- Run `npm install` from root directory

### 2. Create .env config file in root folder

- Use the following format:
  ```
  CLIENT_ID={client_id}
  CLIENT_SECRET={client_secret}
  ```

### 3. Run Application:

- Run `npm start` from root directory

### 4. Run Test Suites:

- Run `npm run dev` from root directory

WIP:

- make all functions arrow func
- replace request library with axios
- change "/get" route with "/artist"
- refactor var to let/const
- create router for get method
- add morgan middleware, use tiny configuration
- add tests w/ jest
- fix app entry point on package-log npm run

# React Project Template

This is a template for an easy outline of a Node.js web application. It uses React, Redux, Bootstrap, and Express, and is already configured for web production.

## Set up

To install:

```
npm install
```

To build and run:

```
npm run start-dev
```

Open your browser to http://localhost:8080/ to view your app. Save and refresh to see changes.

## Tech Stack

### React

The react components are on in the `client` directory. This single-page application uses React Router, which can be modified in the `routes.js` file.

React-Bootstrap components help with styling and responsiveness.

### Redux

The React Redux library streamlines state management. The store can be connected to any component using the `connect()` function. You can find documentation for this function [here](https://react-redux.js.org/api/connect).

### Express

The server's Express middleware includes an Express Router for any necessary api routes.

For production deployment you can run `node server` or `npm run start`.

### Webpack and Babel

Babel transcompiles the project and Webpack bundles it for deployment into the public file `bundle.js`. Their configurations can be found in `.bablerc` and `webpack.config.js`.

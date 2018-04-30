# Cakes Technical Test

This is a simple app for viewing a list of cakes and add new ones.

## Getting Started

Commands to get a copy of the project up and running on your local machine.

``` bash
# install dependencies
npm install

# runs the app in development mode. Open http://localhost:3000 to view it in the browser.
npm start

# builds the app for production to the build folder.
npm run build

```

### Prerequisites

You’ll need to have Node >= 6 on your local development machine. Download it here: https://nodejs.org/en/

### Structure

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── actions // redux action creators and action types
    └── api // functions to communicate with the api
    └── components // react classes and stateless components
    └── reducers // redux reducers
    └── styles    
    └── App.js
    └── App.test.js
    └── index.js
    └── registerServiceWorker.js
```

## Built With

* [React 16.2.0](https://reactjs.org/)
* [React-Redux](https://github.com/reactjs/react-redux)
* [React-Router](https://reacttraining.com/react-router/web)


# React/ES6/Webpack Boilerplate

This is a heavily modified repo based off Kliment Petrov's excellent work (which can be found [here](https://github.com/KleoPetroff/react-webpack-boilerplate)), but heavily restructured to be easier to read and understand.  I prefer Vue over React for its readability, structure and syntax and tried to impose that order on this boilerplate.  

This repo includes the same as stuff included in Petrov's build, namely: 

- [x] React 16.3.2
- [x] ECMAScript 6 and JSX support
- [x] React Router v4
- [x] Component testing using [Enzyme](https://github.com/airbnb/enzyme) and [Jest](https://facebook.github.io/jest)
- [x] Code Coveragenp
- [x] Latest Webpack (v.3.11.0) and Webpack Dev Server (v.2.9.5) with Scope Hoisting enabled
- [x] Hot Module Replacement using [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- [x] ES6 linting with continuous linting on file change
- [x] SASS support
- [x] Separate CSS stylesheets generation
- [x] Automatic HTML generation
- [x] Production Config
- [x] Custom Babel Preset with Decorators, Class Properties, Rest/Spread operator support
- [x] Export Separate Vendor Files


In addition: 

- [x] Redux 4.x added
- [x] Pug added
- [x] Express 4 Support
- [x] Demo components
- [x] Reduced complexity for easy learning
- [x] Bulma CSS (can remove or replace easily)

## Preview
[Click here](https://react-webpack-boilerplate.herokuapp.com/)

## Available Commands
- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder

## Starting the dev server
```sh
$ npm run dev
```

## Build and Preview
```sh
$ npm run production
$ gulp 
// open browser, go to:  http://localhost:3030/
```

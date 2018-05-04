import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// routing
import Routing from './config/Routing';

// store
import store from './store/config';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer store={store}>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(Routing);

if (module.hot) {
  module.hot.accept('./config/Routing', () => {
    const newApp = require('./config/Routing').default;
    render(newApp);
  });
}

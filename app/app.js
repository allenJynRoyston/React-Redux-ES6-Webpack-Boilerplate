import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { AppContainer } from 'react-hot-loader';

// routing
import Routing from './config/Routing';

// configure store
import configureStore from './store/configureStore';

// store
const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
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

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  Home,
  NewCake,
  ViewCake,
} from './components';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-cake" component={NewCake} />
            <Route exact path="/view-cake/:cakeId" component={ViewCake} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

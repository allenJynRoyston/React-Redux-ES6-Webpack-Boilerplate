import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, About, Todo } from '../components/pages';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Route path="/todo" component={Todo} exact />
      </Switch>
    </Router>
  );
};

export default Root;

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Root extends React.Component {
  render() {
    return pug`
      Router
        Switch
          ${this.props.routes.map((link) => {
            return pug`Route(key=${link.location} path=${link.location} component=${link.component} exact)`
          })}
  `
  }
}

Root.propTypes = {
  // property to be used by store
  routes: PropTypes.array
};

function mapStateToProps(state) {
  return {
    routes: state.routes // needs to match what's on allReducers
  };
}

export default connect(mapStateToProps)(Root);

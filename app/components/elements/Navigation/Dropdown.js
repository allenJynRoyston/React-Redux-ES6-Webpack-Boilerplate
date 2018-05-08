import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  render() {
    return pug`
      Fragment
        ${this.props.routes.map((link) => {
          return pug`Link.navbar-item(key=${link.label} to=${link.location}) ${link.label}`
        })}
        hr.nav-bar-divider
        a.navbar-item Version 0.1    
    `
  }
}

Dropdown.propTypes = {
  // property to be used by store
  routes: PropTypes.array
};

function mapStateToProps(state) {
  return {
    routes: state.routes // needs to match what's on allReducers
  };
}

export default connect(mapStateToProps)(Dropdown);


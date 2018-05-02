import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


class NavElement extends React.Component {
  render() {
    return (
      <Fragment>
        <Link to="/">Home</Link>
        &nbsp;
        <Link to="/about">About</Link>
      </Fragment>
    )
  }
}

export default NavElement;

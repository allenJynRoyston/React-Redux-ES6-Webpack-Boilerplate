import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


class NavElement extends React.Component {
  render() {
    const listData = [
      { label: 'Home', location: '/' },
      { label: 'About', location: '/about' },
      { label: 'Todo', location: '/todo' },
    ]
    return (
      <Fragment>    
        {listData.map((link) => {
          return <Link key={link.label} className="navbar-item" to={link.location}>{link.label}</Link>
        })}
        <hr className="navbar-divider" />
        <a className="navbar-item">
          Version 0.1
        </a>        
      </Fragment>
    )
  }
}

export default NavElement;

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


class Dropdown extends React.Component {
  render() {
    const listData = [
      { label: 'Home', location: '/' },
      { label: 'About', location: '/about' },
      { label: 'Todo', location: '/todo' },
    ]

    return pug`
      Fragment
        ${listData.map((link) => {
          return pug`Link.navbar-item(key=${link.label} to=${link.location}) ${link.label}`
        })}
        hr.nav-bar-divider
        a.navbar-item Version 0.1    
    `
  }
}

export default Dropdown;

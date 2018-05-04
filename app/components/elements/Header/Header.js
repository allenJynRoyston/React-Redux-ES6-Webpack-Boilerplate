import React from 'react';
import { NavDropdown } from '../../elements'

// images
import mainLogo from '../../../assets/images/react-logo.png';

// component
class Header extends React.Component {
  render() {
    return pug`
      nav.navbar.is-warning
        a.navbar-item(href="/")
          img(src=mainLogo alt="Built with React")
        .navbar-item.has-dropdown.is-hoverable
          .navbar-link
            | Navigation
          .navbar-dropdown
            NavDropdown
    `
  }
}

export default Header;

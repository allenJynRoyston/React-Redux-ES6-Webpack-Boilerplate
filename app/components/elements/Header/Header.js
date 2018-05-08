import React from 'react';
import { NavDropdown } from '../../elements'

// images
import mainLogo from '../../../assets/images/react-logo.png';

// component
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  
  render() {
    let {isOpen} = this.state;

    return pug`
      nav.navbar.is-warning
        a.navbar-item(href="/")
          img(src=mainLogo alt="Built with React")
        .navbar-item.has-dropdown( className=${isOpen ? 'is-active' : ''} onClick=${() => { this.setState({ isOpen: !isOpen }) }})
          .navbar-link
            | Navigation
          .navbar-dropdown
            NavDropdown
    `
  }
}

export default Header;

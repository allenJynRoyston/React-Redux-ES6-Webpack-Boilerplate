import React from 'react';
import { NavDropdown } from '../../elements'

import mainLogo from '../../../assets/images/react-logo.png';


class Header extends React.Component {
  render() {
    return (
      <nav className="navbar is-warning">     
        <a href="/" className="navbar-item">
          <img src={mainLogo} alt="Built with React" />
        </a>           
        <div className="navbar-item has-dropdown is-hoverable ">       
          <a className="navbar-link">
            Navigation       
          </a>        
          <div className="navbar-dropdown">          
            <NavDropdown />           
          </div>
        </div>               
      </nav>
    )
  }
}

export default Header;

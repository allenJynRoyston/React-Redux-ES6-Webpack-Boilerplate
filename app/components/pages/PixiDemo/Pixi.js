import React, { Fragment } from 'react';
import { Header, Footer, UserList, PhotoList, PixiDemo } from '../../elements'

class Pixi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Pixi',
    };
  }

  render() {
    let { title } = this.state;

    return pug`
      Fragment
        Header
        .container.main-content
          section.hero
            .hero-body
              p.title #{title}
          .section
            PixiDemo
        Footer              
    ` 
  }
}

export default Pixi;

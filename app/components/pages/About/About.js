import React, { Fragment } from 'react';
import { Header, Footer, UserList, PhotoList } from '../../elements'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'About',
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
              p.subtitle
              | Everything you need to 
              strong create a website&nbsp;
              | with Bulma
        Footer              
    ` 
  }
}

export default About;

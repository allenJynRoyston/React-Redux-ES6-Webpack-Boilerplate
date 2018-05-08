import React, { Fragment } from 'react';
import { Header, Footer, UserList, PhotoList } from '../../elements'

class Redux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Redux',
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
          UserList
          hr
          PhotoList
        Footer              
    ` 
  }
}

export default Redux;

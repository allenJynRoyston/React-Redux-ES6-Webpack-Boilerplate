import React, { Fragment } from 'react';
import { Header, NavElement, Footer } from '../elements'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'About',
    };
  }

  render() {
    return (
      <Fragment>
        <Header />
        <h1>{this.state.title}</h1>
        <NavElement />
        <Footer />
      </Fragment>
    )
  }
}

export default About;

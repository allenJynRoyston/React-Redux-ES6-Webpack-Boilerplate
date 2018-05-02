import React, { Fragment } from 'react';
import { Header, Footer } from '../elements'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'About',
    };
  }

  render() {
    let { state } = this;

    return (      
      <Fragment>
        <Header />
        <div className="container main-content">
          <section className="hero">
            <div className="hero-body">
              <p className="title">
                {state.title}
              </p>
              <p className="subtitle">
                Everything you need to <strong>create a website</strong> with Bulma
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default About;

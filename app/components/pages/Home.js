import React, { Fragment } from 'react';
import { Header, NavElement, Footer, TodoList } from '../elements'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Home',
    };
  }

  render() {
    return (
      <Fragment>
        <Header />
        <h1>{this.state.title}</h1>        
        <NavElement />
        <TodoList />
        <Footer />
      </Fragment>
    )
  }
}

export default Home;

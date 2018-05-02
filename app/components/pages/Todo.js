import React, { Fragment } from 'react';
import { Header, Footer, TodoList } from '../elements'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Todo',
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
          <div className="hero-body">
            <TodoList />
          </div>
        </div>     
        <Footer />
      </Fragment>
    )
  }
}

export default Todo;

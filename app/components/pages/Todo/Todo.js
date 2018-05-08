import React, { Fragment } from 'react';
import { Header, Footer, TodoList } from '../../elements'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Todo',
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
        TodoList
      Footer  
    `
  }
}

export default Todo;

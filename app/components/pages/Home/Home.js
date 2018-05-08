import React, { Fragment } from 'react';
import { Header, Footer, Grid } from '../../elements'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Home',
      dataSet1: [
        {content: 'Box', location: {column: 1, row: 1}, size: 2},
        {content: 'Box', location: {column: 3, row: 1}, size: 1},
        {content: 'Box', location: {column: 3, row: 2}, size: 1},
        {content: 'Box', location: {column: 1, row: 3}, size: 1},
        {content: 'Box', location: {column: 2, row: 3}, size: 1},       
        {content: 'Box', location: {column: 3, row: 3}, size: 1},               
      ],
      dataSet2: [
        {content: 'Box', location: {column: 1, row: 1}, size: 1},
        {content: 'Box', location: {column: 2, row: 1}, size: 2},
        {content: 'Box', location: {column: 1, row: 2}, size: 1},
        {content: 'Box', location: {column: 1, row: 3}, size: 1},
        {content: 'Box', location: {column: 2, row: 3}, size: 1},       
        {content: 'Box', location: {column: 3, row: 3}, size: 1},               
      ]      
    };
  }

  render() {
    let { title, dataSet1, dataSet2 } = this.state;

    return pug`
      Fragment
      Header
      .container.main-content
        section.hero
          .hero-body
            p.title #{title}
        Grid(columns=3 rows=3 blocksize=300 padding=1 data=dataSet1)
        br
        Grid(columns=3 rows=3 blocksize=300 padding=1 data=dataSet2)
      Footer  
    `
  }
}

export default Home;

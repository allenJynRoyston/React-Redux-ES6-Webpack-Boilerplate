import React, { Fragment } from 'react';
import { Header, Footer, Grid, MegaMenu } from '../../elements'

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
      ],
      menuData: [
        { 
          text: '1A', 
          leads: [
            {
              text: '_1A', 
              leads: [
                {text: '__1A', 
                  leads: [
                    {
                      text: '___1A', 
                      leads: [
                        {text: '____1A', do: () => { console.log('LINK TO SOMETHING') }},
                        {text: '____2A', do: () => { console.log('LINK TO SOMETHING') }},
                        {text: '____3A', do: () => { console.log('LINK TO SOMETHING') }},
                        {text: '____4A', do: () => { console.log('LINK TO SOMETHING') }},
                      ]
                    },
                    {text: '___2A', do: () => { console.log('LINK TO SOMETHING') }},
                  ]
                },
                {text: '__2A', do: () => { console.log('LINK TO SOMETHING') }},
                {text: '__3A', do: () => { console.log('LINK TO SOMETHING') }},
                {text: '__4A', do: () => { console.log('LINK TO SOMETHING') }},
                {text: '__5A', do: () => { console.log('LINK TO SOMETHING') }},
              ]
            },
            {
              text: '_1B', 
              leads: [
                {text: '__1B', do: () => { console.log('LINK TO SOMETHING') }},
              ]
            },
            {
              text: '_1C', 
              leads: [
                {text: '__1C', do: () => { console.log('LINK TO SOMETHING') }},
              ]
            }            
          ]
        },
        { 
          text: '2A', 
          leads: [
            {
              text: '_2A', 
              leads: [
                {text: '__2A', do: () => { console.log('LINK TO SOMETHING') }},
              ]
            }
          ]
        }        
      ]       
    };
  }

  render() {
    let { title, dataSet1, dataSet2, menuData } = this.state;

    return pug`
      Fragment
        MegaMenu(data=menuData)
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

import React from 'react';
import PropTypes from 'prop-types';

import { NavElement } from '../elements'

class Grid extends React.Component {
  constructor(props) {
    super(props);

    // get props/prop defaults
    let {columns = 0, rows = 0, height = 0, padding = 0, data = []} = this.props;

    // define grid size
    let gridSize = {
      columns,
      rows,
      gridHeight: `${height}px`,
      padding: `${padding}px`
    }

    // create new blank stylesheet, add blocksizes to it
    let blockStyles = (() => {
      let randomId = Math.floor(Math.random() * Math.floor(1000));
      let classes = {
        randomId,
        container: `__${randomId}_grid-container`,
        box: `__${randomId}_grid-box`,
        inside: `__${randomId}_grid-inside`,
      }
      // Create the <style> tag
      let style = document.createElement('style');      
      // WebKit hack :(

      let rtStylesheet = `
        .grid-wrapper{
          display: grid;
          width: 100%;
          height: ${gridSize.gridHeight};
        }

        @media only screen and (max-width: 600px) {
          .grid-wrapper{
            display: grid;
            width: 100%;
            height: ${gridSize.gridHeight};
            border: 2px solid red
          }
        }  

        .${classes.container} {
          display: grid;
          grid-template-columns: repeat(${gridSize.columns}, ${(100 / gridSize.columns)}%);
          grid-template-rows: repeat(${gridSize.rows}, ${(100 / gridSize.rows)}%);          
        }  

        @media only screen and (max-width: 600px) {
          .${classes.container} {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: repeat(${gridSize.rows + gridSize.columns}, ${(100 / (gridSize.rows + gridSize.columns))}%);                 
          }  
        }  

        .${classes.box} {
          padding: ${gridSize.padding};
          font-size: 150%;
        }

        .${classes.inside} {
          width: 100%;
          height: 100%;
          background-color: #444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;          
        }        
      `
      style.appendChild(document.createTextNode(rtStylesheet));      
      // Add the <style> element to the page
      document.head.appendChild(style);     
      style.sheet.classes = classes;    
      style.sheet.gridSize = gridSize;            
      return style.sheet;
    })();
    
    this.state = {
      blockStyles,
      data
    }
  }

  render() {
    let {data, blockStyles} = this.state;

    let setGridSize = (ele, index) => {      
      let styleName = `__${blockStyles.classes.randomId}_block_${index}`;
      let style = `${styleName} { 
        grid-column: ${ele.location.column}/ ${(ele.location.column + ele.size)};  
        grid-row: ${ele.location.row}/ ${(ele.location.row + ele.size)}; 

        @media only screen and (max-width: 600px) {
          grid-column: ${index};            
        }
      }`
      console.log(style)

      blockStyles.insertRule(`.${style}`, blockStyles.rules.length);
      return `${blockStyles.classes.box} ${styleName}`;
    }

    return (
      <div className="grid-wrapper">
        <div className={blockStyles.classes.container}>
          {
            data.map((item, index) => {
              item.key = `list_id_${index}`;            
              return (
                <div key={item.key} className={setGridSize(item, index)}>
                  <div className={blockStyles.classes.inside}>
                    {index + 1}
                  </div>
                </div>              
              )
            })
          }
        </div> 
      </div>     
    )
  }
}

Grid.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default Grid;

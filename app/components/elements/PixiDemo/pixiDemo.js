import React from 'react';
import { Stage, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

// images
import mainLogo from '../../../assets/images/react-logo.png';

// PIXI SETTINGS
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


// component
class PixiDemo extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      pixi: new PIXI.Application({width: 800, height: 400, autoResize: true}),  
      width: window.innerWidth - 50,
      height: 400,
      rotation: 0
    };
  }

  componentDidMount() {
    this.renderLoop();

    window.onresize = (event) => { 
        let {pixi} = this.state;  
        let w = window.innerWidth;    
        let h = window.innerHeight;            
        pixi.renderer.view.style.width = `${w}`;    
        pixi.renderer.view.style.height = `${h}`;
        pixi.renderer.resize(w - 50, this.state.height)
        this.setState({width: w - 50})
    }
  }

  renderLoop() {
    // render loop
    let update = (delta) => {
      let {rotation, canvas} = this.state;

      this.setState(state => ({        
        rotation: rotation + (delta * 0.00001)
      }));
      
      requestAnimationFrame(update);  
    };
    requestAnimationFrame(update);    
  }


  render() {
    let {rotation, width, height, pixi} = this.state;    
    let style = {
      display: 'flex',
      justifyContent: 'safe center',
    }
    console.log()

    return pug`
      div(style=${style})
        Stage( id='canvas' width=${width} height=${height} renderer=${pixi.renderer})
          Sprite(texture=${PIXI.Texture.fromImage(mainLogo)}  x=${width / 2} y=${height / 2} anchor=${[0.5, 0.5]} rotation=${rotation} )
    `
  }
}

export default PixiDemo;

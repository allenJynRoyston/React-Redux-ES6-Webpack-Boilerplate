import React, { Fragment } from 'react';
import * as PIXI from 'pixi.js'
import { Sprite, Stage } from 'react-pixi-fiber';

// images
import mainLogo from '../../../assets/images/react-logo.png';

// PIXI SETTINGS
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


// component
class PixiShape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    let component = this;
    return pug`
      Fragment
        Sprite(anchor=${[0.5, 0.5]} texture=${PIXI.Texture.fromImage(mainLogo)})          
    `;
  }
}

export default PixiShape;

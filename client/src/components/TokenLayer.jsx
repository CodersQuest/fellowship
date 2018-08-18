import React, {Component} from 'react';
import {fabric} from 'fabric'
class TokenLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardWidth: 1740,
        boardHeight: 1000,
        padding: 0,
        canvasWidth: 0,
        canvasHeight: 0,
    }
    
    //may have to redo dimensions to match dynamic render of under-canvas layer
  }

  componentDidMount() {
    
    var canvas = new fabric.StaticCanvas("canvas-top");
    // create a rectangle object
    var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });
  
  // "add" rectangle onto canvas
  canvas.add(rect);
  }

  render () {
    return (
        <div id="token-layer"><p>Tokens</p>
        <canvas id="canvas-top"  
        width={this.state.boardWidth} 
        height={this.state.boardHeight}
        ></canvas>  
        </div>

    )
    
  }


}

export default TokenLayer;
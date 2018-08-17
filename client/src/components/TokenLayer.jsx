import React, {Component} from 'react';

class TokenLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardWidth: 1740,
        boardHeight: 1000,
        padding: 0,
        canvasWidth: 0,
        canvasHeight: 0
    }
  }

  render () {
    return (
        <div id="token-layer"><p>Tokens</p>
        <canvas id="canvas-top" width={this.state.boardWidth} height={this.state.boardHeight}></canvas>  
        </div>

    )
    
  }


}

export default TokenLayer;
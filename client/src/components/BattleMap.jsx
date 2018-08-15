import React, {Component} from 'react';

class BattleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: 1200,
      boardHeight: 800,
      padding: 0,
      canvasWidth: this.state.boardWidth + 1,
      canvasHeight: this.state.boardHeight + 1
    }
  }
  componentDidMount() {
    this.setState({
      boardWidth: 1200,
      boardHeight: 800,
    })
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.drawBoard();
  }

  drawBoard(){
    var bw = this.state.boardWidth;
    var bh = this.state.boardHeight;
    var p = this.state.padding;
    for (var x = 0; x <= bw; x += 50) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += 50) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "#4a4b4c";
    context.stroke();
  }
  render() {
    return (
      <div id="canvas">
        <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} />
      </div>
    )
  }
}

export default BattleMap;
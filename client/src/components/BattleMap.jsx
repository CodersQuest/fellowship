import React, {Component} from 'react';

class BattleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardWidth: 1200,
      boardHeight: 800,
      padding: 0,
      canvasWidth: 0,
      canvasHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      canvasWidth: this.state.boardWidth + this.state.padding + 1,
      canvasHeight: this.state.boardHeight + this.state.padding + 1
    })
    var canvas = this.refs.canvas;
    var context = canvas.getContext("2d");
    this.drawBoard(context);
  }

  drawBoard(ctx){
    const bw = this.state.boardWidth;
    const bh = this.state.boardHeight;
    const p = this.state.padding;

    for (var x = 0; x <= bw; x += 50) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 50) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "#4a4b4c";
    ctx.stroke();
  }
  render() {
    return (
      <div id="battleMap">
        <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} />
      </div>
    );
  }
}

export default BattleMap;
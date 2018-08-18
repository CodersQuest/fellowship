import React, {Component} from 'react';
import TokenLayer from './TokenLayer.jsx';
import ErrorBoundary from './ErrorBoundry.jsx';


class BattleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardWidth: 1500,
      boardHeight: 1000,
      padding: 0,
      canvasWidth: 0,
      canvasHeight: 0
    }
  }

  componentWillMount() {
    this.setState({
      canvasWidth: this.state.boardWidth + this.state.padding + 1,
      canvasHeight: this.state.boardHeight + this.state.padding + 1
    });
  }

  componentDidMount() {
    var canvas = this.refs.canvas;
    var ctx = canvas.getContext("2d");
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
    ctx.strokeStyle = "#3d3d3d";
    ctx.stroke();
  }
  
  render() {
    //remove errorboundary to see actual error message in console:
    //warning.js?da67:33 Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, 
    //but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks 
    //in the componentWillUnmount method. in App
    //keep errorboundary to prevent breaking of entire gameroom
    return (
      <div id="battleMap">
      <ErrorBoundary>
      <TokenLayer/>
      </ErrorBoundary>
        <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} />
      </div>
    );
  }
}

export default BattleMap;
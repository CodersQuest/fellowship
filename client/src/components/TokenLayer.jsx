import React, {Component} from 'react';
import {fabric} from 'fabric'
class TokenLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardWidth: 1500,
        boardHeight: 1000,
        padding: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        canvas: null
    }
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragEnter(e) {
    e.target.classList.add('over');
  }
  
  handleDragLeave(e) {
    e.target.classList.remove('over');  // this / e.target is previous target element.
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    return false;
  }

   handleDrop (e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
      //create image object from image dragged
      //add to canvas
    var img = document.querySelector('.target-image');
    // console.log('event: ', e);
    var newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        left: e.layerX,//round to nearest 50 value
        top: e.layerY//round to nearest 50 value
    });
    this.state.canvas.add(newImage);
    return false;
  }
  
  componentDidMount() { 
    var c = new fabric.Canvas('canvas-top');

    this.setState({
      canvas: c
    })
    var t = document.querySelectorAll('#canvas-top');
    t.forEach(tokenTarget => {
      tokenTarget.addEventListener('dragenter', this.handleDragEnter, false)
      tokenTarget.addEventListener('dragover', this.handleDragOver, false)
      tokenTarget.addEventListener('dragleave', this.handleDragLeave, false)
      tokenTarget.addEventListener('drop', this.handleDrop, false)
    })
  }

  render () {
    return (
        <div id="token-layer">
        <canvas id="canvas-top"  
        width={this.state.boardWidth} 
        height={this.state.boardHeight}
        ></canvas>  
        </div>
    )   
  }
}

export default TokenLayer;
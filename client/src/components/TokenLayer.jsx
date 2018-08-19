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
    }
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    //may have to redo dimensions to match dynamic render of under-canvas layer
  }
  handleDragEnter(e) {
    // this / e.target is the current hover target.
    // e.target.style.border = 'dotted'

    e.target.classList.add('over');
  }
  
  handleDragLeave(e) {
    // e.target.style.border = 'solid'

    e.target.classList.remove('over');  // this / e.target is previous target element.
  }



  //dragenter for target area for canvas
  //dragover for target area for canvas
  //dragleave for canvas
  //handledrop /actual createion of copy for canvas

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  
    return false;
  }

  componentDidMount() {
    
    var canvas = new fabric.StaticCanvas("canvas-top");

    var t = document.querySelectorAll('#canvas-top');
    t.forEach(tokenTarget => {
      tokenTarget.addEventListener('dragenter', this.handleDragEnter, false)
      tokenTarget.addEventListener('dragover', this.handleDragOver, false)
      tokenTarget.addEventListener('dragleave', this.handleDragLeave, false)
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
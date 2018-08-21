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
    // this.handleMove = this.handleMove.bind(this)
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
    e.dataTransfer.effectAllowed = 'copy';

    return false;
  }

   handleDrop (e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
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

  // handleMove (e) {
  //   //problem: fabric canvas should already 
  //   //be performing these functions automatically:
  //   //i think storing the canvas in state messes up this functionality somehow
  //   //because of the need to setstate the additions

  //   //on click of target, get that instance of the canvas object
  //   //and drag and drop it to new location within canvas
  //   var target = this.state.canvas.getObjects().indexOf(fabricCanvas.getActiveObject())
  //   console.log(target, 'handlemove')
  //   // target.set({
  //   //   left: e.layerX,
  //   //   top: e.layerY
  //   // })
  // }
  
  
  componentDidMount() { 
    var c = new fabric.Canvas('canvas-top');
    //i want to not have to store this in a state, but
    //without this, it's almost impossible to reference the canvas in another function
    this.setState({
      canvas: c
    })

    var t = document.getElementById('canvas-top');
    t.addEventListener('dragenter', this.handleDragEnter, false)
    t.addEventListener('dragover', this.handleDragOver, false)
    t.addEventListener('dragleave', this.handleDragLeave, false)
    t.addEventListener('drop', this.handleDrop, false)
    t.addEventListener('move', this.handleMove, false)

    
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
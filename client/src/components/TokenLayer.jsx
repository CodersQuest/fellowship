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
    // this.canvas = null
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
    e.dataTransfer.effectAllowed = 'move';

    return false;
  }

   handleDrop (e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    var img = document.querySelector('.target-image');

    var snapToBlock = (location) => {
      var result = null;
      var hundreths = 0;
      var num = 0;
      location = location.toString();
      if (location.length > 2) {
        hundreths = Number(location.slice(0,location.length-2))
        num = Number(location.split('').splice(1,2).join(''))
      } else {
          num = Number(location);
      }

      if (num < 25) {
          num = '00';
      } else if (25 <= num && num <= 75) {
          num = 50;
      } else if (75 < num) {
          hundreths++;
          num = '00';
      }
     result = Number(hundreths.toString() + num.toString())


      return result;
    }
    console.log('event: ', e);
    var newImage = new fabric.Image(img, {
        width: 100,
        height: 100,
        left: snapToBlock(e.layerX),
        top: snapToBlock(e.layerY)
    });
    var c = this.state.canvas.add(newImage);
    this.setState({
      canvas: c
    })
    

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
    var c = new fabric.StaticCanvas('canvas-top');
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
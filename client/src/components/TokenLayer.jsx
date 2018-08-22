import React, {Component} from 'react';
import {fabric} from 'fabric'
class TokenLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardWidth: 1500,
        boardHeight: 1000,
        canvas: null,
        tokens: []
    }
    // this.canvas = React.createRef();
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.snapToBlock = this.snapToBlock.bind(this);
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
  
  snapToBlock (location) {
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

   handleDrop (e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    var img = document.querySelector('.target-image');
    // console.log('event: ', e);
    var newImage = new fabric.Image(img, {
        width: 100,
        height: 100,
        left: this.snapToBlock(e.layerX),
        top: this.snapToBlock(e.layerY)
    });
    var c = this.state.canvas.add(newImage);
    var imgToken = {
      value: newImage,
        left: newImage.left,
         top: newImage.top,
        //  type: type of token
    }
    var t = this.state.tokens.concat(imgToken)
    c.renderAll.bind(c)

    this.setState({
      canvas: c,
      tokens: t
    })
    // var curr = this.canvas.current
    // curr.add(newImage)
    // console.log(this.state.tokens)
    console.log('objects on canvas', this.state.canvas.getObjects())
    return false;
  }

  handleMove (e) {
    //on click of target, get that instance of the canvas object
    //and drag and drop it to new location within canvas
    var target = e.target;
    // var target = this.state.canvas.getObjects().indexOf(fabricCanvas.getActiveObject())
    console.log(target, 'handlemove')
    target.set({
      left: this.snapToBlock(e.layerX),
      top: this.snapToBlock(e.layerY)
    })
  }
  
  
  componentDidMount() { 
    var c = new fabric.Canvas('canvas-top');
    // var aqua = new fabric.Color('rgb(127, 255, 212, 0.5)');   
    c.backgroundColor = null; 
    c.renderAll.bind(c)
    //the above commented out section causes the canvas to be black?
    this.setState({
      canvas: c
    })
    // var c = new fabric.Canvas(this.canvas.current);

    var t = document.getElementById('canvas-top');
    t.addEventListener('dragenter', this.handleDragEnter, false)
    t.addEventListener('dragover', this.handleDragOver, false)
    t.addEventListener('dragleave', this.handleDragLeave, false)
    t.addEventListener('drop', this.handleDrop, false)

    this.state.tokens.map(token => {
      token.addEventListener('move', this.handleMove, false)
    })

    
  }

  render () {
    return (
        <div id="token-layer">
        <canvas id="canvas-top" 
        // ref={this.canvas}
        width={this.state.boardWidth} 
        height={this.state.boardHeight}
        ></canvas>  
        </div>
    )   
  }
}

export default TokenLayer;
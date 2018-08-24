import React, { Component } from "react";
import { fabric } from "fabric";

class BattleMap extends Component {
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
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    var img = document.querySelector('.target-image');
    // console.log('event: ', e);
    var newImage = new fabric.Image(img, {
      width: 100,
      height: 100,
      selectable:true
    }).scale(0.74)
    var padding = 64;
    var group = new fabric.Group([newImage], {
      left: Math.round(e.layerX / padding) * padding,
      top: Math.round(e.layerY/padding) * padding
    });
    var c = document.getElementById('canvas').fabric;
    c.add(group)
    return false;
  }
  
  componentDidMount() {
    // This Works!
    var canvas = new fabric.Canvas("canvas", { selection: false });

    document.getElementById("canvas").fabric = canvas
    var grid = 64;
    for (var i = 0; i < 1536 / grid; i++) {
      canvas.add(
        new fabric.Line([i * grid, 0, i * grid, 1536], {
          stroke: "#ccc",
          selectable: false
        })
      );
      canvas.add(
        new fabric.Line([0, i * grid, 1536, i * grid], {
          stroke: "#ccc",
          selectable: false
        })
      );
    }
    
    canvas.on("object:moving", function(options) {
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      });
    });
    canvas.on("object:scaling", options => {
      const {target} = options;
      target.set('scaleX', Math.round(target.scaleX));
      target.set('scaleY', Math.round(target.scaleY));
    });
   

    var t = document.getElementById('battleMap');
    t.addEventListener('dragenter', this.handleDragEnter.bind(this), false)
    t.addEventListener('dragover', this.handleDragOver.bind(this), false)
    t.addEventListener('dragleave', this.handleDragLeave.bind(this), false)
    t.addEventListener('drop', this.handleDrop.bind(this), false)

  }

  render() {
    return (
      <div id="battleMap">

        <canvas id="canvas" width="1536" height="1024" />
      </div>
    );
  }
}

export default BattleMap;
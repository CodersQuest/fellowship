import React, {Component} from 'react';
import {fabric} from 'fabric';

class BattleMap extends Component {
  constructor(props) {
    super(props);
    this.handleSocketUpdate = this.handleSocketUpdate.bind(this);

  }
  handleDragEnter(e) {
    e.target.classList.add('over');
  }

  handleDragLeave(e) {
    e.target.classList.remove('over'); // this / e.target is previous target element.
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.effectAllowed = 'copy';
    return false;
  }

  handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    let img = document.querySelector('.target-image');
    // console.log('event: ', e);
    let newImage = new fabric.Image(img, {
      width: 100,
      height: 100,
      selectable: true,
    }).scale(0.74);
    let padding = 64;
    let group = new fabric.Group([newImage], {
      left: Math.round(e.layerX / padding) * padding,
      top: Math.round(e.layerY/padding) * padding,
    });
    let c = document.getElementById('canvas').fabric;
    c.add(group);
    this.props.update(newImage);
    return false;
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(prevProps.tokens[0]) !== JSON.stringify(this.props.tokens[0])) {
      this.handleSocketUpdate(this.props.tokens[0])
    }
    // console.log('prev', prevProps.tokens[0], 'tokens',this.props.tokens[0])
  }

  handleSocketUpdate (canvasObj) {
    let c = document.getElementById('canvas').fabric;
    console.log('handlesocketevents called', canvasObj)
    c.loadFromJSON(canvasObj)
    // c.renderAll.bind(c);
  }

  componentDidMount() {
    // This Works!
    let canvas = new fabric.Canvas('canvas', {selection: false,});

    document.getElementById('canvas').fabric = canvas;
    let grid = 64;
    for (let i = 0; i < 1536 / grid; i++) {
      canvas.add(
        new fabric.Line([i * grid, 0, i * grid, 1536], {
          stroke: '#ccc',
          selectable: false,
        })
      );
      canvas.add(
        new fabric.Line([0, i * grid, 1536, i * grid], {
          stroke: '#ccc',
          selectable: false,
        })
      );
    }

    canvas.on('object:moving', (options) => {
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid,
      });
    });

    canvas.on('object:moved', (options) => {
      this.props.update(options.target);
    });

    canvas.on('object:scaling', (options) => {
      const {target,} = options;
      target.set('scaleX', Math.round(target.scaleX));
      target.set('scaleY', Math.round(target.scaleY));
    });


    let t = document.getElementById('battleMap');
    t.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
    t.addEventListener('dragover', this.handleDragOver.bind(this), false);
    t.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
    t.addEventListener('drop', this.handleDrop.bind(this), false);
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

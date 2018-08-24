import React, { Component } from "react";
import { fabric } from "fabric";

class BattleMap extends Component {
  componentDidMount() {
    var canvas = new fabric.Canvas("canvas", { selection: false });
    var grid = 30;

    for (var i = 0; i < 600 / grid; i++) {
      canvas.add(
        new fabric.Line([i * grid, 0, i * grid, 600], {
          stroke: "#ccc",
          selectable: false
        })
      );
      canvas.add(
        new fabric.Line([0, i * grid, 600, i * grid], {
          stroke: "#ccc",
          selectable: false
        })
      );
    }

    var rect = new fabric.Rect({
      top: 0,
      left: 0,
      width: 30,
      height: 30,
      fill: "green"
    });

    rect.set({
      transparentCorners: false,
      cornerColor: "blue",
      cornerStrokeColor: "red",
      borderColor: "red",
      cornerSize: 12,
      padding: 10,
      cornerStyle: "circle",
      borderDashArray: [3, 3]
    });

    var street = new fabric.Text("rua 1", {
      fontSize: 14
    });

    var group = new fabric.Group([rect, street], {
      left: 0,
      top: 0
    });

    canvas.add(group);

    canvas.on("object:moving", function(options) {
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      });
    });
    canvas.on(`object:scaling`, options => {
      const {target} = options;
      target.set('scaleX', Math.round(target.scaleX));
      target.set('scaleY', Math.round(target.scaleY));
    });
  }

  render() {
    return (
      <div>
        <canvas id="canvas" width="300" height="300" />
      </div>
    );
  }
}

export default BattleMap;
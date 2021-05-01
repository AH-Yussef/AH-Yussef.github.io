import gsap from 'gsap';
import store from '../store';
import { FromConnectionPoint } from "./connectionPoints/fromConnectionPoint.js";
import { ToConnectionPoint } from "./connectionPoints/toConnectionPoint.js";

export class Node{
  static codeCount = 1;
  static availableCodes = [];

  constructor(x, y) {
    this.component = null;
    this.componentLabel = null,
    this.center = { x: x, y: y };

    this.code = this._generateCode();
    this.mouseDown = false;
    this.isInputNode = false;
    this.isOutputNode = false;

    this.fromConnectionPoint = null;
    this.toConnectionPoint = null;

    this.fillColor = "black";

    this._create();
    this._addConnectionPoints();
    this._addEventListeners();
  }
  
  // creation of the node
  _create() {
    const board = document.getElementById("board");
    const svgns = "http://www.w3.org/2000/svg"; //variable for the namespace
    const newNode = document.createElementNS(svgns, "circle");
    this.width = 2.2;
    gsap.set(newNode, {
      attr: {
        cx: this.center.x, cy: this.center.y, r: "1.1rem",
        fill: this.fillColor, stroke: this.fillColor ,'stroke-width': "2px",
      }
    });
    
    const newNodeLabel = document.createElementNS(svgns, "text");
    newNodeLabel.textContent = `${this.code}`;
    gsap.set(newNodeLabel, {
      attr: {
        x: this.center.x, y: this.center.y, "text-anchor": "middle", 
        fill: "white", "font-size": "medium", dy: "0.4rem",
      },
      css: {
        userSelect: 'none', pointerEvents: 'none',
      }
    })

    board.appendChild(newNode);
    board.appendChild(newNodeLabel);
    this.component = newNode;
    this.componentLabel = newNodeLabel;
  }

  // updating properties
  updatePos(x, y){
    this.updateCenter(x, y);
    this._updateConnectionPointsPos();

    this.component.setAttribute("cx", this.center.x);
    this.component.setAttribute("cy", this.center.y);

    this.componentLabel.setAttribute("x", this.center.x);
    this.componentLabel.setAttribute("y", this.center.y);
  }

  updateFillColor(rgbColor) {
    this.fillColor = rgbColor;
    this.component.setAttribute("fill", rgbColor);
  }

  resetColor() {
    this.fillColor = "black";
    this.component.setAttribute("fill", this.fillColor);
  }

  remove() {
    Node.availableCodes.push(this.code);
    store.getters.nodes.delete(this.code);
    this.removeSelf();
  }

  //movement
  _moveMouseDownHandling() {
    this.mouseDown = true;
    this._trackMovement();
  }

  _trackMovement(){
    const headerOffsetHeight = document.getElementById("header").offsetHeight;

    const tracker = setInterval(() => {
      if(!this.mouseDown || !this.mouseOnBoard()) {
        clearInterval(tracker);
      }
      else {
        const updatedX = window.mouseX;
        const updatedY = window.mouseY - headerOffsetHeight;
        this.updatePos(updatedX, updatedY);
        this._updateConnectorsPos();
      }
    }, 10); 
  }

  // adding functionality
  _addEventListeners() {
    this.component.onmousedown = () => {
      this._moveMouseDownHandling();
      this.setSelfAsSelected();
    }
    this.component.onmouseup = () => this._moveMouseUpHandling();
  }

  // helper functions
  _generateCode() {
    if(Node.availableCodes.length > 0) return Node.availableCodes.pop();
    else return Node.codeCount++;
  }

  updateCenter(x, y) {
    this.center.x = x;
    this.center.y = y;
  }

  removeSelf() {
    this.component.remove();
    this.componentLabel.remove();
    this.fromConnectionPoint.deleteAll();
    this.toConnectionPoint.deleteAll();
  }

  _moveMouseUpHandling() {
    this.mouseDown = false;
  }

  mouseOnBoard(){
    return document.getElementById("board").matches(':hover');
  }

  //connection points
  _addConnectionPoints() {
    this.fromConnectionPoint = new FromConnectionPoint(this);
    this.toConnectionPoint = new ToConnectionPoint(this);
  }

  _updateConnectionPointsPos() {
    this.fromConnectionPoint.updatePos();
    this.toConnectionPoint.updatePos();
  }

  _updateConnectorsPos() {
    for (let connector of this.fromConnectionPoint.inConnectors.values()) {
      connector.updateEndingPointAuto();
    }

    for (let connector of this.toConnectionPoint.outConnectors.values()) {
      connector.updateStartingPoint();
    }
  }

  resetConnectionPoints() {
    this.fromConnectionPoint.reset();
    this.toConnectionPoint.reset();
  }

  //selection
  setSelfAsSelected() {
    const prevSelectedComponent = store.getters.getCurrSelectedComponent;
    if(prevSelectedComponent != null) {
      prevSelectedComponent.unselectSelf();
    }

    store.commit('setCurrSelectedComponent', this);
    this._selectSelf();
  }

  _selectSelf() {
    this.component.setAttribute("fill", "rgb(30, 89, 202)");
  }

  unselectSelf() {
    this.component.setAttribute("fill", this.fillColor);
  }

  //reset
  reset() {
    this.component.remove();
    this.componentLabel.remove();
    this._create();  
    this._addEventListeners();
    this.resetConnectionPoints();
  }
}
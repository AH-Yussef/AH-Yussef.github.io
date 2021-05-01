import { ConnectionPoint } from "./connectionPoint.js";
import { Branch } from "../branch.js";
import store from "../../store";

export class ToConnectionPoint extends ConnectionPoint{
  constructor(component) {
    super(component);
    this.tempConnector = null;
    this.outConnectors = new Map();

    this._createConnectionWrapper(component.center.y + ((component.width / 2)*16));
    this._createConnectionPoint(component.center.x + ((component.width / 2)*16));
    this._addActions();
  }

  //remove self and the connectors
  deleteAll() {
    this.removeSelf();
    for(let connector of this.outConnectors.values()) {
      connector.removeSelf();
    }
    this.outConnectors.clear();
  }

  updatePos() {
    this.connectionPoint.setAttribute("cx", this.componentAttached.center.x + ((this.componentAttached.width / 2)*16));
    this.connectionPoint.setAttribute("cy", this.componentAttached.center.y);

    this.connectionPointWrapper.setAttribute("cx", this.componentAttached.center.x + ((this.componentAttached.width / 2)*16));
    this.connectionPointWrapper.setAttribute("cy", this.componentAttached.center.y);
  }

  _addActions() {
    this.connectionPoint.onmousedown = () => {
      this._addConnector();
    }
  }

  reset() {
    this.removeSelf();
    this._createConnectionWrapper(this.componentAttached.center.y + ((this.componentAttached.width / 2)*16));
    this._createConnectionPoint(this.componentAttached.center.x + ((this.componentAttached.width / 2)*16));
    this._addActions();
  }

  //initializing connector
  _addConnector() {
    const headerOffsetHeight = document.getElementById("header").offsetHeight;
    this.tempConnector = new Branch(this.componentAttached);
    store.dispatch('setFromComponent', this.componentAttached);
    
    const tracker = setInterval(() => {
      if(!store.getters.isBoardMouseDown) {
        if(store.getters.getToComponent == null){
          this._removeConnector();
        }
        else{
          this._hookConnector();
          this._setGain();
        }
        clearInterval(tracker);
      }
      else {
        const updatedX = window.mouseX;
        const updatedY = window.mouseY - headerOffsetHeight;
        this.tempConnector.updateEndingPoint(updatedX, updatedY);
      }
    }, 10); 
  }

  _removeConnector() {
    this.tempConnector.removeSelf();
  }

  _hookConnector() {
    const toComponent = store.getters.getToComponent;

    if(toComponent.fromConnectionPoint.hasFromComponent(this.componentAttached.code)){
      this._removeConnector();
      return;
    }

    this.tempConnector.setToComponent(toComponent);

    toComponent.fromConnectionPoint.addFromComponent(this.componentAttached);
    toComponent.fromConnectionPoint.addInConnector(this.tempConnector);
    
    this.outConnectors.set(this.tempConnector.code, this.tempConnector);

    this.componentAttached.reset();
    toComponent.reset();

    store.dispatch('resetFromComponent');
    store.dispatch('resetToComponent');

    this._resetAllMachines();
  }

  //reset  machine
  _resetAllMachines() {
    for(let node of store.getters.nodes.values()){
      node.resetColor();
    }
  }
  //get branchGain
  _setGain() {
    let gain = 1;
    do{
      gain = parseInt(window.prompt("branch gain = ", 10));
    } while( isNaN(gain) || gain == 0 );
    this.tempConnector.gain = gain;
    this.tempConnector.addGainLabel();
  }
}
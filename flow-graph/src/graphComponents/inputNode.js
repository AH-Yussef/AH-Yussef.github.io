import { Node } from "./node";

export class inputNode extends Node{
  constructor(x, y) {
    super(x,y);
    this.isInputNode = true;
    this.componentLabel.textContent = "R";
    Node.availableCodes.push(this.code);
    this.code = "R";
    this.setupInputNode();
  } 

  setupInputNode() {
    this.fromConnectionPoint.removeSelf();
  }

  remove() { //starting queue cannot be deleted
    return; 
  }

  resetConnectionPoints() {
    this.toConnectionPoint.reset();
  }
}
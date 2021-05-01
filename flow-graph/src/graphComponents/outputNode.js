import { Node } from "./node";

export class outputNode extends Node{
  constructor(x, y) {
    super(x,y);
    this.isOutputNode = true;
    this.componentLabel.textContent = "C";
    Node.availableCodes.push(this.code);
    this.code = "C";
    this.setupOuputNode();
  } 

  setupOuputNode() {
    this.toConnectionPoint.removeSelf();
  }

  remove() { //starting queue cannot be deleted
    return; 
  }

  resetConnectionPoints() {
    this.fromConnectionPoint.reset();
  }
}
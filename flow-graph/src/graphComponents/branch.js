import gsap from 'gsap';
import store from '../store';

export class Branch {
    static codeCount = 1;

    constructor(fromComponent) {
      this.code = this._generateCode();
      this.gain = 1;
      this.mouseDown = false;
      this.reversed = false;

      this.branch = null;
      this.arrow = null;
      this.gainLabel = null;

      this.startingPoint = { x: 0, y: 0};
      this.endingPoint = { x: 0, y: 0};

      this.from = fromComponent;
      this.to = null;

      this._create();
      this._addArrow();
    }

    _create() {    
      const board = document.getElementById("board");
      const svgns = "http://www.w3.org/2000/svg"; //variable for the namespace
      const newBranch = document.createElementNS(svgns, "path");

      this.startingPoint.x = this.from.center.x + ((this.from.width / 2)*16);
      this.startingPoint.y = this.from.center.y;
      
      this.endingPoint.x = this.from.center.x + ((this.from.width / 2)*16);
      this.endingPoint.y = this.from.center.y;

      this._updateBranchAttributes(newBranch);
      
      board.appendChild(newBranch);

      this.branch = newBranch;
    }

    _updateBranchAttributes(branch) {
      const p1x = this.startingPoint.x;
      const p1y = this.startingPoint.y;
      const p2x = this.endingPoint.x;
      const p2y = this.endingPoint.y;

      if(p2x < p1x) this.reversed = true;
      else this.reversed = false;

      // mid-point of line:
      const mpx = (p2x + p1x) * 0.5;
      const mpy = (p2y + p1y) * 0.5;

      // angle of perpendicular to line:
      const theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

      // distance of control point from mid-point of line:
      const width = p2x - p1x;
      let offset = width / 2.5;
      if(p1x > p2x) offset = (width / 2) * -1;
      if(Math.abs(width) <= (2.5*16)) offset = width * 3;

      // location of control point:
      const cx = mpx + offset * Math.cos(theta);
      const cy = mpy + offset * Math.sin(theta);

      const parameters = `M${p1x} ${p1y} Q${cx} ${cy} ${p2x} ${p2y}`;

      gsap.set(branch, {
        attr: {
          d: parameters,
          stroke: "black", 'stroke-width': "2px", fill: "none",
        },
        css: {
          pointerEvents: "none",
        }
      });
    }

    _addArrow() {
      const board = document.getElementById("board");
      const svgns = "http://www.w3.org/2000/svg"; //variable for the namespace

      const newArrow = document.createElementNS(svgns, "polygon");

      this._updateArrowAttributes(newArrow);      

      this.arrow = newArrow;

      this.arrow.onmousedown = () => {
        this.setSelfAsSelected();
        this.mouseDown = true;
      }

      this.arrow.onmouseup = () => this.mouseDown = false;

      board.appendChild(newArrow);
    }

    _updateArrowAttributes(arrow) {
      const theta = (Math.atan2(this.endingPoint.y - this.startingPoint.y, 
                                this.endingPoint.x - this.startingPoint.x));

      // location of central point:
      const branchLength = this.branch.getTotalLength();
      const centerPoint = this.branch.getPointAtLength(0.5*branchLength);
      const cx = centerPoint.x;
      const cy = centerPoint.y;

      let pointA = { x: cx+8, y: cy };
      let pointB = { x: cx-8, y: cy+8 };
      let pointC = { x: cx, y: cy };
      let pointD = { x: cx-8, y: cy-8 };

      pointA = this._rotatePoint(cx, cy, theta, pointA);
      pointB = this._rotatePoint(cx, cy, theta, pointB);
      pointD = this._rotatePoint(cx, cy, theta, pointD);

      gsap.set(arrow, {
        attr: {
          points: `${pointA.x},${pointA.y} ${pointB.x},${pointB.y} ${pointC.x},${pointC.y} ${pointD.x},${pointD.y}`, 
          fill: "black",
        },
      });
    }

    // postioning
    updateStartingPoint() {
      this.startingPoint.x = this.from.center.x + ((this.from.width / 2)*16);
      this.startingPoint.y = this.from.center.y;

      // this.branch.setAttribute("x1", this.startingPoint.x);
      // this.branch.setAttribute("y1", this.startingPoint.y);
      this._updateBranchAttributes(this.branch);
      this._updateArrowAttributes(this.arrow);
      if(this.gainLabel != null) this._updateGainLabelAttributes(this.gainLabel);
    }

    updateEndingPoint(x, y) {
      this.endingPoint.x = x;
      this.endingPoint.y = y;
      
      this._updateBranchAttributes(this.branch);
      this._updateArrowAttributes(this.arrow);
      if(this.gainLabel != null) this._updateGainLabelAttributes(this.gainLabel);
    }

    updateEndingPointAuto() {
      this.updateEndingPoint(this.to.center.x - ((this.to.width / 2)*16), this.to.center.y);
    }

    //connection
    setToComponent(toComponent) {
      this.to = toComponent;
      const toPointX = toComponent.center.x - ((toComponent.width / 2)*16);
      const toPointY = toComponent.center.y;
      this.updateEndingPoint(toPointX, toPointY);
    }

    //removal
    removeSelf(){
      this.branch.remove();
      this.arrow.remove();
      this.gainLabel.remove();
      if(this.to != null) this.to.fromConnectionPoint.fromComponents.delete(this.from.code);
      this.from.toConnectionPoint.outConnectors.delete(this.code);
    }

    //gain
    addGainLabel() {
      const board = document.getElementById("board");
      const svgns = "http://www.w3.org/2000/svg"; //variable for the namespace
      const newGainLabel = document.createElementNS(svgns, "text");
      newGainLabel.textContent = `${this.gain}`;

      this._updateGainLabelAttributes(newGainLabel);

      this.gainLabel = newGainLabel;

      this.gainLabel.ondblclick = () => this._updateGainValue();

      board.appendChild(newGainLabel);
    }

    _updateGainLabelAttributes(gainLabel) {
      const branchLength = this.branch.getTotalLength();
      const centerPoint = this.branch.getPointAtLength(0.5*branchLength);

      gsap.set(gainLabel, {
        attr: {
          x: centerPoint.x, y: centerPoint.y + (this.reversed ? -1: 1)* 20, "text-anchor": "middle", 
          fill: "black", "font-size": "medium", dy: "0.5rem", stroke: "black",
          "stroke-width": "1px"
        },
        css: {
          userSelect: 'none',
        }
      })
    }
    
    _updateGainValue() {
      let gain = 1;
      do{
        gain = parseInt(window.prompt("branch gain = ", 10));
      } while( isNaN(gain) || gain == 0 );
      this.gain = gain;
      if(this.gainLabel != null )this.gainLabel.textContent = `${this.gain}`;
    }

    //for interface compatiblity regards
    remove() {
      this.removeSelf();
    }

    _generateCode() {
      return Branch.codeCount++;
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
      this.branch.setAttribute("stroke", "rgb(30, 89, 202)");
      this.arrow.setAttribute("fill", "rgb(30, 89, 202)");
    }

    unselectSelf() {
      this.branch.setAttribute("stroke", "black");
      this.arrow.setAttribute("fill", "black");
    }

    //helper 
    _rotatePoint(cx, cy, angle, point) {
      const angleSin = Math.sin(angle);
      const angleCos = Math.cos(angle);

      point.x -= cx;
      point.y -= cy;

      const xNex = point.x * angleCos - point.y * angleSin;
      const yNew = point.x * angleSin + point.y * angleCos;

      point.x = xNex + cx;
      point.y = yNew + cy;

      return point;
    }
}













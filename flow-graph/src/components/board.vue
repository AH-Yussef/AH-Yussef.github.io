<template>
  <svg  id="board" :width="boardProbs.width" :height="boardProbs.height"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
        @mouseover="mouseOverHandling()"
        @mousedown="mouseDownHandling()"
        @mouseup="mouseUpHandling()">
  </svg>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
import { Node } from '../graphComponents/node.js';
import { inputNode } from '../graphComponents/inputNode.js';
import { outputNode } from '../graphComponents/outputNode.js';

export default {
  name: 'board',
  data() {
    return {
      boardProbs: {
        width: 100,
        height: 100,
      },
      components: {
        node: "machine",
      },
      currentComponent: {
        component: null,
        startingPos: { x: 0, y: 0 },
      },
      mousePointer: {
        originX: 0,
        originY: 0,
        x: 0, //current position relative to x-axis
        y: 0, //current position relative to y-axis
        updatePosition: function() {
          this.x = window.mouseX - this.originX;
          this.y = window.mouseY - this.originY;
        },
      }
    }
  },
  computed: mapGetters(['isDrawing', 'getCurrentComponent', 'getCurrSelectedComponent', 'nodes']),
  methods: {
    ...mapActions(['disableDrawingMode', 'pushNewNode', 'setCurrentComponent', 'setBoardMouseDown']),
    //Drawing Shapes
    mouseOverHandling(){
      const mousePosTracker = setInterval(() => {
        if(!this.isDrawing || !this.mouseOnBoard()) clearInterval(mousePosTracker);
        else {
          this.mousePointer.updatePosition();

          if(this.getCurrentComponent == null){
            this.setStartingPos();
            this.createComponent();
            this.setCurrentComponent(this.currentComponent.component);
          }

          const updatedX = this.mousePointer.x;
          const updatedY = this.mousePointer.y;
          this.currentComponent.component.updatePos(updatedX, updatedY);
        }
      }, 10); 
    },

    mouseDownHandling(){      
      this.setBoardMouseDown(true);
      const currSelectedComponent =  this.getCurrSelectedComponent;
      if(currSelectedComponent != null && !currSelectedComponent.mouseDown) currSelectedComponent.unselectSelf();

      this.resetAllNodes();
      
      if(this.getCurrentComponent == null) return;

      if(this.isDrawing) {
        this.pushNewNode(this.currentComponent.component);
        this.disableDrawingMode();
        this.setCurrentComponent(null);
      }
    },

    mouseUpHandling() {
      this.setBoardMouseDown(false);
    },

    createComponent(){
      this.currentComponent.component = new Node(this.currentComponent.startingPos.x, this.currentComponent.startingPos.y);
    },
    setStartingPos(){
      this.currentComponent.startingPos.x = this.mousePointer.x;
      this.currentComponent.startingPos.y = this.mousePointer.y;
    },
    mouseOnBoard(){
      return this.board.matches(':hover');
    },
    resetAllNodes() {
      // for(let machine of this.machines.values()){
      //   machine.resetColor();
      // }
    },
    // initializing the graph
    mountInputNode() {
      const inputNodeX = 70;
      const inputNodeY = this.boardProbs.height / 2;
      const newInputNode = new inputNode(inputNodeX, inputNodeY);
      this.pushNewNode(newInputNode);
    },
    mountOutputNode() {
      const outputNodex = this.boardProbs.width - 70;
      const outputNodeY = this.boardProbs.height / 2;
      const newOutputNode = new outputNode(outputNodex, outputNodeY);
      this.pushNewNode(newOutputNode);
    }
  },
  mounted(){
    //setting the height and the width of the svg board
    this.board = document.getElementById("board");
    this.boardProbs.width = window.innerWidth;
    const headerHeight = document.getElementById("header").offsetHeight;
    this.mousePointer.originY = headerHeight;
    this.boardProbs.height = window.innerHeight - headerHeight;

    this.mountInputNode();
    this.mountOutputNode();

    document.onmousemove = function(e) {
      var event = e || window.event;
      window.mouseX = event.clientX;
      window.mouseY = event.clientY;
    }
  }
}
</script>

<style scoped>
#board{
  position: relative;
  margin-top: 1px;
  background-color: white;
  z-index: 1;

  transition: transform .2s;
}
</style>
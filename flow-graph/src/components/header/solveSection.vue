<template>
  <div id="solution">
    <div id="solve-btn" @click="triggerSolve()">Solve</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { solveforwardpath } from "../../solvingAlgo/forward_paths.js";
import { findLoops } from "../../solvingAlgo/loops.js";
import { transferFunction } from "../../solvingAlgo/Transfer_ function.js";

export default {
  name: 'solve',
  data() {
    return {
      nodeNum: 0,
    }
  },
  computed: mapGetters(['nodes']),
  methods: {
    triggerSolve() {
      // const graphInfo = this.getGraphInfo();
      // const graphInfo =  [[0,1,0,0,1,0,0,1,0],
      //                     [0,0,1,0,0,0,1,0,1],
      //                     [1,1,0,1,0,1,0,0,0],
      //                     [0,0,0,0,1,0,0,0,0],
      //                     [0,1,0,0,0,0,0,0,0],
      //                     [0,0,0,1,0,0,0,0,0],
      //                     [0,0,0,0,0,0,0,0,0],
      //                     [0,0,0,0,0,0,0,0,1],
      //                     [0,0,0,0,0,0,0,1,0]];

      const graphInfo = this.getGraphInfo();

      this.nodeNum = graphInfo.length;

      const forwardPaths = solveforwardpath(graphInfo);
      const loops = findLoops(graphInfo);

      // const testloops = {
      //   loops : [[3,4,3], [4,5,4], [6,6], [2,6,5,2], [2,3,4,5,2]],
      //   gains : [-10,-4,-1,-20,-100]
      // };
      // const testpaths = {
      //   paths : [[1,2,3,4,5], [1,2,6,5]],
      //   gains : [100, 20]
      // }

      const computations = transferFunction(forwardPaths, loops);
      console.log(forwardPaths);
      console.log(loops);

      this.openSolutionArea();
      this.showSolution(forwardPaths, loops, computations);
      document.getElementById("board").style.pointerEvents = 'none';
    },
    getGraphInfo() {
      const matrixSize = this.nodes.size;
      const graphInfo = new Array(matrixSize);

      for(let node of this.nodes.values()) {
        node.unselectSelf();

        const outcomingBranches = node.toConnectionPoint.outConnectors.values();
        const node_nodeGains = new Array(matrixSize).fill(0);
        let toNodeIndex = 0;
        
        for(let branch of outcomingBranches) {
          if(branch.to.isOutputNode) toNodeIndex = matrixSize -1;
          else toNodeIndex = branch.to.code;
          node_nodeGains[toNodeIndex] = branch.gain;
        }

        let nodeIndex = 0;
        if(node.isInputNode) nodeIndex = 0;
        else if(node.isOutputNode) nodeIndex = matrixSize -1;
        else nodeIndex = node.code;

        graphInfo[nodeIndex] = node_nodeGains;
      }

      return graphInfo;
    },
    showSolution(forwardPaths, graphLoops, computations){
      document.getElementById("steps").innerHTML = "";
      this.addTitle("Forward paths :");

      let pathIndex = 1;
      for(let path of forwardPaths.paths) {
        this.addPath(path, pathIndex++);
      }

      this.addTitle("Loops :");

      let loopIndex = 1;
      for(let loop of graphLoops.loops) {
        this.addLoop(loop, loopIndex++);
      }

      this.addTitle("Transfer function :");

      let deltaIndex = 1;
      for(let delta of computations.deltas) {
        this.addDelta(delta, deltaIndex++);
      }
      this.addDelta(computations.systemDelta, deltaIndex, false);

      this.addFormula(computations.transferFunction);
      this.RenderLatex();
    },
    addTitle(titleText){
      const title = document.createElement('div');
      title.innerHTML = `$$\\underline{\\text{${titleText}}}$$`;
      title.className = "solve-title";
      document.getElementById("steps").appendChild(title);
    },
    addPath(pathSeq, pathIndex) {
      const n = pathSeq.length;
      let path = document.createElement('div');
      path.innerHTML = `$$P_${pathIndex} :`;

      for(let i = 0; i < n -1; i++) {
        path.innerHTML += `${this._getNodeIndex(pathSeq[i])} \\xrightarrow{}`;
      }
      path.innerHTML += `${this._getNodeIndex(pathSeq[n-1])}$$`;

      path.className = "solution-info";
      document.getElementById("steps").appendChild(path);
    },
    addLoop(loopSeq, loopIndex) {
      const n = loopSeq.length;
      let loop = document.createElement('div');
      loop.innerHTML = `$$L_${loopIndex}: `;

      for(let i = 0; i < n -1; i++) {
        loop.innerHTML += `${this._getNodeIndex(loopSeq[i])} \\xrightarrow{}`;
      }
      loop.innerHTML += `${this._getNodeIndex(loopSeq[n-1])}$$`;

      loop.className = "solution-info";
      document.getElementById("steps").appendChild(loop);
    },
    addDelta(deltaValue, deltaIndex, addSubIndex = true) {
      let delta = document.createElement('div');
      if(addSubIndex) delta.innerHTML = `$$\\Delta_${deltaIndex} = ${deltaValue}$$`;
      else delta.innerHTML = `$$\\Delta = ${deltaValue}$$`;

      delta.className = "solution-info";
      document.getElementById("steps").appendChild(delta);
    },
    addFormula(transferFunctionValue) {
      let formula = document.createElement('div');
      formula.innerHTML = `$$C(S) / R(S) = ${transferFunctionValue}$$`;
      formula.className = "solution-info";
      document.getElementById("steps").appendChild(formula);
    },
    _getNodeIndex(nodeCode) {
      let nodeIndex = "";
      if(nodeCode == 0) nodeIndex = "R";
      else if(nodeCode == this.nodeNum-1) nodeIndex = "C";
      else nodeIndex = nodeCode;

      return nodeIndex;
    },
    openSolutionArea() {
      this.$root.$refs.solutionArea.open();
      document.getElementById("board").style.transform = "scale(0.5)";
      document.getElementById("board").style.left = "-40%";
    },
    RenderLatex() {
      if(window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    }
  },
}
</script>

<style scoped>
#solution {
  height: 100%;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#solve-btn { 
  background-color: rgb(30, 89, 202);
  border-radius: 0.5rem;
  height: 2rem;
  width: 6rem;

  text-align: center;
  vertical-align: center;
  line-height: 2rem;

  color: white;
  user-select: none;
}
</style>
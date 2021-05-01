const state = {
  drawingMode: false,
  currentComponenet: null,
	nodes: new Map()
};
  
const getters = {
  isDrawing: state => state.drawingMode,
	nodes: state => state.nodes,
  getCurrentComponent: state => state.currentComponenet,
};
  
const actions = {
	enableDrawingMode: ({commit}) => commit('setDrawingMode', true),
	disableDrawingMode: ({commit}) => commit('setDrawingMode', false),
  setCurrentComponent: ({commit}, currentComponenet) => commit('changeCurrentComponent', currentComponenet),
	pushNewNode: ({commit}, node) => {
		commit('pushNode', node);
		for(let node of state.nodes.values()){
			node.resetColor();
		}
		// document.getElementById("replay-btn").className = 'hidden'; 
	},
  clearAllNodess: ({commit}) => commit('clearNodes'),    
}
  
const mutations = {
	setDrawingMode: (state, drawingMode) => state.drawingMode = drawingMode,
  changeCurrentComponent: (state, currentComponenet) => state.currentComponenet = currentComponenet,
	pushNode: (state, node) => state.nodes.set(node.code, node),
	clearNodes : (state) => state.nodes.length = 0,    
};
  
export default{
	state,
	getters,
	actions,
	mutations,
};
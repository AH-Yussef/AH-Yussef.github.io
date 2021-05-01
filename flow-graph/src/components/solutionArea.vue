<template>
  <div id="solution-area" class="side-area">
		<div id="solve-header">
			<div id="solve-label">Solution</div>
			<div id="solve-close-btn" @click="close()">
				<img src="../assets/insert/delete.png" width="16px">
			</div>
		</div>
		<div id="steps">
		</div>
  </div>
</template>

<script>
export default {
	name: 'solutionArea',
	data(){
		return{
			closedMenu: true,
		}
   },
	methods: {
		open() {
			if(!this.closedMenu) return;
			document.getElementById("solution-area").style.width = "40rem";
			document.getElementById("sketching-area").style.marginRight = "40rem"; 
			this.closedMenu = false;
		},
		close() {
			document.getElementById("solution-area").style.width = "0rem";
			document.getElementById("sketching-area").style.marginRight = "0rem";
			document.getElementById("board").style.transform = "scale(1)";
      document.getElementById("board").style.left = "0";
			this.closedMenu = true;
		},
	},
	created() {
    this.$root.$refs.solutionArea = this;
  },
}
</script>

<style scoped>
.side-area{
  height: 100%; 
  width: 0rem; 
  position: fixed; 
  z-index: 1; 
  top: 0; 
  right: 0;
  background-color: white;
  border-left: 2px solid black;
  overflow-x: hidden; 
  transition: 0.4s ease; 
}

#solve-header {
	width: 100%;
	height: 3rem;
	border-bottom: 2px solid black;
	font-weight: bold;
	font-size: x-large;

	display: flex;
	justify-content: center;
	align-items: center;
}

#solve-close-btn {
	height: 3rem;
	width: 3rem;
	margin-left: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 2px solid black;
}

#solve-close-btn:hover {
	background-color: #E5E7E9;
}

#solve-label {
	height: 3rem;
	text-align: center;
	vertical-align: center;
	line-height: 3rem;
	width: 37rem;
}

#steps {
	width: 100%;
	overflow-y: auto;
	height: 100%;
}
</style>
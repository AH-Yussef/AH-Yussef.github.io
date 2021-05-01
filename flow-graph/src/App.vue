<template>
  <div id="app">
    <div id="sketching-area">
      <appHeader/>
      <board/>
    </div>
    <solutionArea/>
  </div>
</template>

<script>
import appHeader from "./components/header.vue";
import board from "./components/board.vue";
import solutionArea from "./components/solutionArea.vue";

export default {
  name: 'App',
  components: {
    appHeader,
    board,
    solutionArea,
  }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

html, body {
  height: 100%;
  width: 100%;
}


#app {
  height: 100%;
  width: 100%;
  font-family: 'Orbitron', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  transition: margin-right .4s ease-out;
}

.solve-title {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  font-size: normal;
}

.mjx-chtml.MJXc-display{
  margin: 0;
}
.mjx-mfrac{
  color: red;
}

.solution-info {
	margin-left: 2rem;
  font-size: normal;
  height: 3rem;
  line-height: 3rem;

  overflow-x: auto;
  width: 100%;
}
</style>

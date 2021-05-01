<template>
  <div id="insert">
    <div id="node-btn" class="insert-btn" @click="addNode()">
      <div id="node" class="icon">
        <div class="icon-label">N</div>
      </div>
      <div class="label">Node</div>
    </div>
    <div id="cursor-btn" class="action-btn" @click="selectCursor()">
      <img src="../../assets/insert/cursor.png" width="17px">
      <div class="action-label">Select</div>
    </div>
    <div id="delete-btn" class="action-btn" @click="deleteComponent()">
      <img src="../../assets/insert/delete.png" width="16px">
      <div class="action-label">Delete</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex';

export default {
  name: 'insert',
  data() {
    return {
      components: {
        node: "machine",
      }
    }
  },
  computed: mapGetters(['getCurrentComponent', 'getCurrSelectedComponent']),
  methods: {
    ...mapActions(['enableDrawingMode', 'disableDrawingMode', 'setCurrentComponent', 'resetCurrSelectedComponent']),
    addNode() {
      this.selectCursor();
      this.enableDrawingMode();  
    },
    selectCursor() {
      this.disableDrawingMode();
      const currentComponent = this.getCurrentComponent;
      if(currentComponent == null) return
      else currentComponent.remove();
      this.setCurrentComponent(null);
    },
    deleteComponent() {
      const currentSelectedComponent = this.getCurrSelectedComponent;
      if(currentSelectedComponent != null) currentSelectedComponent.remove();
      this.resetCurrSelectedComponent();
    }
  }
}
</script>

<style scoped>
#insert {
  height: 100%;
  width: 21rem;
  display: grid;
  grid-template-rows: 3rem;
  grid-template-columns: repeat(3, 7rem);
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.icon {
  border: 2px solid black;
  background-color: black;
  grid-row: 1 / 2;
  grid-column: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-label{
  height: 2rem;
  width: 2rem;
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 2rem;
  font-size: large;
  font-weight: bolder;
  user-select: none;
}

.label {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  font-size: medium;
  user-select: none;
}

.insert-btn {
  height: 100%;
  width: 7rem;
  display: grid;
  grid-template-rows: 3rem;
  grid-template-columns: 3rem 4rem;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  grid-row: 1 / 2;
}
.insert-btn:hover {
  background-color: #E5E7E9;
}

#node-btn { 
  grid-column: 1 / 2;
}
#node {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
}

.action-btn {
  width: 7rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / 2;
  user-select: none;
}
.action-btn:hover {
  background-color: #E5E7E9;
}

.action-label{
  font-size: medium;
  user-select: none;
  margin-left: 0.6rem;
}

#cursor-btn {
  grid-column: 2 / 3;
}
#delete-btn {
  grid-column: 3 / 4;
}
</style>
<template>
  <div id="header">
    <clearAll/>
    <insert/>
    <solve/>
  </div>
</template>

<script>
import insert from '../components/header/insertSection.vue';
import solve from '../components/header/solveSection.vue';
import clearAll from '../components/header/clearAll.vue';

export default {
  name: 'appHeader',
  components: {
    insert,
    solve,
    clearAll,
  },
}
</script>

<style scoped>
  #header {
    height: 3rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid black;
  }

/* rgb(199, 0, 57) */
</style>
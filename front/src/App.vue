<script>
import MenuComp from './components/MenuComp.vue';

export default {
  components: {
    MenuComp
  }
}
</script>

<template>
  <div id="app">
    <MenuComp />
    <router-view></router-view> 
  </div>
</template>

<style scoped>
</style>

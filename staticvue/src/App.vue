<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  height: 100%;
  overflow: auto;

}

*{
  margin: 0;
  padding: 0;
}
</style>

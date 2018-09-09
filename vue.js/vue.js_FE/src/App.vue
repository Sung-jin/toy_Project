<template>
  <div id="app">
    <template>
    </template>
    <!-- <router-link to="/">GoogleMap</router-link>
    <br> -->
    <router-view/>
  </div>
</template>

<script>
// import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',
  components: {
    // GoogleMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* #app {
  position: relative;
} */
</style>

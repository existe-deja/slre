<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import 'reset-css'
import Home from './pages/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Inconsolata:400,700');
@import "~@/assets/styles/variables";

#app {
  font-family: $montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  padding-bottom: 12px;
  color: $color_text_main;
}
img{
  max-width: 100%;
  display: block;
}
h1, h2, h3, h4, h5{
  font-family: 'Inconsolata', sans-serif;
}
</style>

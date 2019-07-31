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
@import "~@/assets/styles/variables";

#app {
  font-family: $corpusFont;
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
  font-family: $titleFont;
}
</style>

<template lang="html">
  <div class="preload-img">
    <transition
      name="fade-preload"
      mode="in-out">
      <img
        v-if="loaded"
        key="fullimage"
        :src="srcImg">
      <img
        v-else
        key="preloadimage"
        :src="srcPlaceholder"
        class="preload">
    </transition>
    <!-- svg blur to have sharp edge -->
    <svg class='hideSvgSoThatItSupportsFirefox'>
      <filter id='sharpBlur'>
        <feGaussianBlur stdDeviation='20'></feGaussianBlur>
        <feColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0'></feColorMatrix>
        <feComposite in2='SourceGraphic' operator='in'></feComposite>
      </filter>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'preloadImage',

  data () {
    return{
      loaded: false,
      timeoutID: null
    }
  },

  props: {
    srcPlaceholder: { type: String, required: true },
    srcImg: {type: String, required: true }
  },

  mounted () {
    this.preload()
  },

  beforeDestroy () {
    if (typeof this.timeoutID === 'number') {
      clearTimeout(this.timeoutID)
    }
  },

  methods: {
    preload () {
      this.loaded = false

      let img = new Image()
      img.src = this.srcImg

      if (img.complete) {
        this.endPreloading()
      } else {
        img.addEventListener('load', () => {
          this.endPreloading()
        })
        img.addEventListener('error', e => {
            console.log('img preload error') // eslint-disable-line
            console.error(e) // eslint-disable-line
        })
      }
    },

    endPreloading () {
      this.timeoutID = setTimeout(() =>{
        this.loaded = true
      }, 0)
    }
  }
}
</script>

<style lang="scss">

.preload-img{
  position: relative;

  .preload{
    width: 100%;
    filter: url("#sharpBlur");
    // height: 100%;
    // filter: blur(20px);
    /* this is needed so Safari keeps sharp edges */
    // transform: scale(1);
  }

  .hideSvgSoThatItSupportsFirefox {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
}
</style>

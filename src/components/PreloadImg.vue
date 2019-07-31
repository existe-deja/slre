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
        :class="['preload', {portrait: isPortrait}]">
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
      timeoutID: null,
      isPortrait: false
    }
  },

  props: {
    srcPlaceholder: { type: String, required: true },
    srcImg: {type: String, required: true }
  },

  mounted () {
    this.preload(this.srcPlaceholder, img => {
      this.isPortrait = img.height >= img.width
    })
    this.preload(this.srcImg, this.endPreloading)
  },

  beforeDestroy () {
    if (typeof this.timeoutID === 'number') {
      clearTimeout(this.timeoutID)
    }
  },

  methods: {
    preload (src, callback) {
      this.loaded = false

      let img = new Image()
      img.src = src

      if (img.complete) {
        callback(img)
      } else {
        img.addEventListener('load', () => {
        callback(img)
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

    &.portrait{
      width: auto;
      height: 100%;
    }
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

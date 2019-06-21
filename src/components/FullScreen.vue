<template lang="html">
  <div
    @click.stop.prevent="resetFullscreen()"
    @keyup.esc="resetFullscreen()"
    @keyup.left="navigate(-1)"
    @keyup.right="navigate(1)"
    tabindex="0"
    class="fullscreen">
      <div class="wrapper-header">
        <header>
          <button
          @click.stop.prevent="navigate(-1)"
          type="button"
          class="controls left"></button>
          <div class="text">
            <h2>{{ fullScreenObject.title }}</h2>
            <p>{{ fullScreenObject.photo.caption }}</p>
          </div>
          <button
          @click.stop.prevent="navigate(1)"
          type="button"
          class="controls right"></button>
        </header>
      </div>
    <div class="wrapper-view">
      <div class="view">
        <transition name="fade" mode="out-in">
          <img
            v-if="preloading"
            :key="fullScreenObject.photo.sizes.thumbnail"
            class="preload"
            :src="fullScreenObject.photo.sizes.thumbnail">
          <img
            v-else
            :src="loadedSrc">
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { NAVIGATE_FULLSCREEN, RESET_FULLSCREEN } from '@/config'
import { mapGetters, mapMutations } from 'vuex'
import { TimelineLite, Power2 } from 'gsap/all'

export default {
  name: 'FullScreen',

  data () {
    return {
      preloading: true,
      loadedSrc: null
    }
  },

  computed: {
    ...mapGetters({
      fullScreenObject: 'fullScreenObject'
    })
  },

  watch: {
    preloading (val) {
      console.log('preloading', val);
    }
  },

  mounted () {
    this.$el.focus()
    this.preloadingFunc()
  },

  methods: {
    ...mapMutations({
      navigateFullscreen: NAVIGATE_FULLSCREEN,
      resetFullscreen: RESET_FULLSCREEN
    }),

    navigate (direction) {
      this.navigateFullscreen(direction)
      this.preloadingFunc()
    },

    preloadingFunc () {
      this.preloading = true

      let img = new Image()
      console.log('src set');
      img.src = this.fullScreenObject.photo.sizes.large

      if (img.complete) {
        this.removePreloading()
      } else {
        img.addEventListener('load', _ => {
          this.removePreloading()
        })
        img.addEventListener('error', function() {
            console.log('error')
        })
      }
    },

    removePreloading () {
      console.log('complete', this.fullScreenObject.photo.sizes.large);

      this.preloading = false
      this.loadedSrc = this.fullScreenObject.photo.sizes.large
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/transitions";

.fullscreen{
  z-index: 10;
  background: -webkit-radial-gradient(circle at center,rgba(0,0,0,.8),rgba(0,0,0,.94));
  background: -moz-radial-gradient(circle at center,rgba(0,0,0,.8),rgba(0,0,0,.94));
  background: -ms-radial-gradient(circle at center,rgba(0,0,0,.8),rgba(0,0,0,.94));
  background: -o-radial-gradient(circle at center,rgba(0,0,0,.8),rgba(0,0,0,.94));
  background: radial-gradient(circle at center,rgba(0,0,0,.8),rgba(0,0,0,.94));
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .wrapper-header{
    position: relative;
    max-width: $main-width;
    margin: auto;
  }

  header{
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    width: 100%;
    grid-column-gap: 2 * $main_photo_gap;
    align-items: center;
    padding: $main_photo_gap $main_photo_gap / 2;
    box-sizing: border-box;

    button.controls{
      cursor: pointer;
      padding: 20px;
      background-image: url('~@/assets/img/arrow.svg');
      background-repeat: no-repeat;
      background-position: center;
      width: 40px;
      height: 60px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 3px 100% 100% 3px;
      border: none;
      outline: 0;

      &:hover{
        background-color: rgba(255, 255, 255, 1);
      }

      &.left{
        transform: rotate(180deg);
      }
    }

    .text{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 1fr;
      grid-row-gap: 2px;
      justify-content: start;
      justify-items: start;
      align-items: start;

      h2, p{
        background: #fff;
      }

      h2{
        padding: $main_photo_gap / 2 $main_photo_gap;
        font-size: 24px;
      }
      p {
        padding: 3px 6px;
        min-height: 16px;
      }
    }
  }

  .wrapper-view{
    max-height: calc(100% - 84px - #{$main_photo_gap});
    height: 100%;
    position: relative;
    max-width: $main-width;
    margin: auto;
  }

  .view{
    width: 100%;
    height: 100%;

    img{
      max-height: 100%;
      margin: auto;
    }
    .preload{
      width: 100%;
      height: 100%;
      filter: blur(50px);
      /* this is needed so Safari keeps sharp edges */
      transform: scale(1);
    }
  }
}
@media only screen and (min-width: 1024px) and (min-height: 900px) {
  .fullscreen{

    .wrapper-header{
      margin: 3 * 12px auto 0;
    }
    .wrapper-view{
      max-height: calc(100% - 84px - #{$main_photo_gap} - 3 * #{$main_photo_gap});
    }
  }
}
</style>

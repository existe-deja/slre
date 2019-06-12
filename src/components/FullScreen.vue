<template lang="html">
  <div
    @click.stop.prevent="resetFullscreen()"
    @keyup.esc="resetFullscreen()"
    @keyup.left="navigateFullscreen(-1)"
    @keyup.right="navigateFullscreen(1)"
    tabindex="0"
    class="fullscreen">
      <div class="wrapper-header">
        <header>
          <button
          @click.stop.prevent="navigateFullscreen(-1)"
          type="button"
          class="controls left"></button>
          <div class="text">
            <h2 ref="twtitle"/>
            <p ref="twcaption"/>
          </div>
          <button
          @click.stop.prevent="navigateFullscreen(1)"
          type="button"
          class="controls right"></button>
        </header>
      </div>
    <div class="wrapper-view">
      <div class="view">
        <transition
          name="fade"
          @after-leave="leave"
          appear>
          <img
            :src="tweenSrc"
            v-show="fade"
            alt="">
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
      fade: true,
      tweenSrc: null,
      titleTimeline: null,
      captionTimeline: null
    }
  },

  computed: {
    ...mapGetters({
      fullScreenObject: 'fullScreenObject'
    })
  },

  mounted () {
    this.$el.focus()
    this.titleTimeline = new TimelineLite()
    this.captionTimeline = new TimelineLite()
    this.tweenSrc = this.fullScreenObject.photo.sizes.large
    this.tweenLetters(this.titleTimeline, this.$refs.twtitle, this.fullScreenObject.title)
    this.tweenLetters(this.captionTimeline, this.$refs.twcaption, this.fullScreenObject.photo.caption)
  },

  watch: {
    'fullScreenObject.title' (value) {
      this.tweenLetters(this.titleTimeline, this.$refs.twtitle, value)
    },

    'fullScreenObject.photo.caption' (value) {
      this.tweenLetters(this.captionTimeline, this.$refs.twcaption, value)
    },

    'fullScreenObject.photo.url' () {
      this.fade = false
    }
  },

  methods: {
    ...mapMutations({
      navigateFullscreen: NAVIGATE_FULLSCREEN,
      resetFullscreen: RESET_FULLSCREEN
    }),

    tweenLetters (tl, elem, value) {
      const time = value === '' ? 0.2 : 1.3
      tl.clear()
        .to(elem, time, {text: value, ease: Power2.easeInOut})
    },

    leave () {
      this.tweenSrc = this.fullScreenObject.photo.url
      this.fade = true
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

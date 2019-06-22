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
            <transition name="fade" mode="out-in">
              <h2 :key="fullScreenObject.title">{{ fullScreenObject.title }}</h2>
            </transition>
            <transition name="fade" mode="out-in">
              <p :key="fullScreenObject.photo.caption">{{ fullScreenObject.photo.caption }}</p>
            </transition>
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
          <preload-img
            :key="`FS-${globalPhotoIndex}`"
            :srcImg="fullScreenObject.photo.sizes.large"
            :srcPlaceholder="fullScreenObject.photo.sizes.thumbnail"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import PreloadImg from '@/components/PreloadImg'
import { NAVIGATE_FULLSCREEN, RESET_FULLSCREEN } from '@/config'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FullScreen',

  components: { PreloadImg },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters({
      fullScreenObject: 'fullScreenObject',
      globalPhotoIndex: 'globalPhotoIndex'
    })
  },

  mounted () {
    this.$el.focus()
  },

  methods: {
    ...mapMutations({
      navigateFullscreen: NAVIGATE_FULLSCREEN,
      resetFullscreen: RESET_FULLSCREEN
    }),

    navigate (direction) {
      this.navigateFullscreen(direction)
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
    position: relative;

    .preload-img{
      width: 100%;
      height: 100%;
    }

    img{
      max-height: 100%;
      // margin: auto;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
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

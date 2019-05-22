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
            <h2>{{ fullScreenObject.title }}</h2>
            <p>{{ fullScreenObject.photo.caption }}</p>
          </div>
          <button
          @click.stop.prevent="navigateFullscreen(1)"
          type="button"
          class="controls right"></button>
        </header>
      </div>
    <div class="wrapper-view">
      <div class="view">
        <img
          :src="fullScreenObject.photo.url"
          alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { NAVIGATE_FULLSCREEN, RESET_FULLSCREEN } from '@/config'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FullScreen',

  computed: {
    ...mapGetters({
      fullScreenObject: 'fullScreenObject'
    })
  },

  mounted () {
    this.$el.focus()
  },


  methods: {
    ...mapMutations({
      navigateFullscreen: NAVIGATE_FULLSCREEN,
      resetFullscreen: RESET_FULLSCREEN
    })
  }
}
</script>

<style lang="scss">
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
    max-width: 1086px;
    margin: auto;
  }

  header{
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    width: 100%;
    grid-column-gap: 24px;
    align-items: center;
    padding: 12px 6px;

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
        padding: 6px 12px;
        font-size: 24px;
      }
      p {
        padding: 3px 6px;
        min-height: 16px;
      }
    }
  }

  .wrapper-view{
    max-height: calc(100% - 84px - 12px);
    height: 100%;
    position: relative;
    max-width: 1086px;
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
      max-height: calc(100% - 84px - 12px - 3 * 12px);
    }
  }
}
</style>

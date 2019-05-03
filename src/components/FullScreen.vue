<template lang="html">
  <div
    @click.stop.prevent="resetFullscreen()"
    @keyup.esc="resetFullscreen()"
    @keyup.left="navigateFullscreen(-1)"
    @keyup.right="navigateFullscreen(1)"
    tabindex="0"
    class="fullscreen">
    <div
      class="wrapper-fullscreen">
      <div class="controls">
        <button
          @click.stop.prevent="navigateFullscreen(-1)"
          type="button"
          class="left"></button>
        <button
          @click.stop.prevent="navigateFullscreen(1)"
          type="button"
          class="right"></button>
      </div>
      <div class="view">
        <div class="text">
          <h2>{{ fullScreenObject.title }}</h2>
          <p>{{ fullScreenObject.photo.caption }}</p>
        </div>
        <div class="pic">
          <img
            :src="fullScreenObject.photo.url"
            alt="">
        </div>
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

  .wrapper-fullscreen{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .controls{

      button{
        position: absolute;
        cursor: pointer;
        padding: 20px;
        top: 50%;
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
          left: 90px;
          transform: rotate(180deg);
        }

        &.right{
          right: 90px;
        }
      }
    }

    .view{
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100px auto;
      justify-items: center;

      .text{
        justify-self: start;
        width: 1086px;
        margin: auto;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1fr;
        grid-row-gap: 12px;
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
      .pic{
        img{
          max-height: 768px;
        }
      }
    }
  }
}
</style>

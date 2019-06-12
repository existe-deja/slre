<template>
  <div class="home">
    <header class="main-header">
      <h1>VANORAMA</h1>
    </header>
    <section>
      <div>
        <mail-subscription/>
      </div>

      <div>
        <full-screen
          v-if="isFullScreen && !isItAMobile"/>
      </div>

      <div class="wrapper">
        <photorama
          v-for="(photorama, i) in photoramas"
          :key="photorama.id"
          :index="i"
          :title="photorama.title.rendered"
          :date-gmt="photorama.acf.date_display || '2010-01-01'"
          :photos="photorama.acf.photos"
          :autoplay="!loading && i % PER_PAGE === 0"/>
        <div
          class="load-more">
          <button
            v-if="!fullyLoaded"
            class="loader"
            type="button"
            :disabled="loading"
            @click="loadPhotoramas">Encore</button>
          <p v-else>Finito !</p>
        </div>
      </div>
    </section>
    <div
      v-if="error"
      class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { PER_PAGE } from '@/config'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import MailSubscription from '@/components/MailSubscription'
import Photorama from '@/components/Photorama'
import FullScreen from '@/components/FullScreen'
import { CSSPlugin, TextPlugin } from 'gsap/all'

const plugins = [ CSSPlugin, TextPlugin ] // fucking gsap shit https://greensock.com/docs/NPMUsage

export default {
  name: 'Home',

  components: { Photorama, MailSubscription, FullScreen },

  data () {
    return {
      error: false,
      PER_PAGE: PER_PAGE
    }
  },

  computed: {
    ...mapState({
      loading: state => state.loading,
      fullyLoaded: state => state.fullyLoaded,
      photoramas: state => state.photoramas,
      isFullScreen: state => state.isFullScreen,
      isItAMobile: state => state.isItAMobile
    })
  },

  mounted () {
    this.isAMobile(window.mobilecheck())
    this.loadPhotoramas()
  },

  methods: {
    ...mapActions([
      'loadPhotoramas'
    ]),

    ...mapMutations([
      'isAMobile'
    ])
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
.home{
  min-width: 300px;
  .main-header{
    text-align: center;
    font-family: $montserrat;
    padding: 24px 0 36px;

    h1{
      font-family: $montserrat;
      letter-spacing: -0.012em;
      font-size: 12px * 3.5;
      font-weight: 900;
    }

    p{
      font-size: 12px;
    }
  }
  >section{
    padding-bottom: 48px;
  }
  .wrapper{
    max-width: $main-width;
    margin: auto;
  }
  .loading{
    text-align: center;
  }
  .load-more {
    margin: 20px 0;
    text-align: center;
    button{
      position: relative;
      display: block;
      margin: auto;
      background: #fff;
      border: 1px solid $color_text_date;
      color: $color_text_main;
      padding: 10px 20px 10px 20px;
      font-size: 1em;
      border-radius: 3px;
      cursor: pointer;
      outline: none;

      &[disabled]{
        opacity: 0
      }
    }
    p{
      padding: 12px 0;
    }
  }
}
@media only screen and (min-width: 480px) {
  .home{
    .main-header h1 {
      font-size: 12px * 4;
    }
  }
}
@media only screen and (min-width: 620px) {
  .home{
    .main-header h1 {
      font-size: 12px * 6;
    }
  }
}
</style>

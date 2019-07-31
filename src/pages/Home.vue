<template>
  <div class="home">
    <header :class="['main-header', 'wrapper', {'loading': loading}]">
      <h3 id="vanorama">Vanorama</h3>
      <span id="devient">devient</span>
      <h1 id="sacorama">Sacorama</h1>
    </header>
    <section>
      <div>
        <mail-subscription/>
      </div>

      <travel-map v-if="!initialLoading"/>

      <full-screen
          v-if="isFullScreen && !isItAMobile"/>

      <div class="wrapper">
        <photorama
          v-for="(photorama, i) in photoramas"
          :key="photorama.id"
          :index="i"
          :title="photorama.title.rendered"
          :text="photorama.content.rendered"
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
import { mapState, mapActions, mapMutations } from 'vuex'
import MailSubscription from '@/components/MailSubscription'
import Photorama from '@/components/Photorama'
import FullScreen from '@/components/FullScreen'
import TravelMap from '@/components/TravelMap'

export default {
  name: 'Home',

  components: { Photorama, MailSubscription, FullScreen, TravelMap },

  data () {
    return {
      error: false,
      PER_PAGE: PER_PAGE
    }
  },

  computed: {
    ...mapState({
      initialLoading: state => state.initialLoading,
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
@import "~@/assets/styles/transitions";

.home{
  min-width: 300px;
  .main-header{
    text-align: center;
    font-family: $titleFont;
    padding: 24px 0 36px;
    position: relative;
    font-weight: 900;
    letter-spacing: -0.012em;

    #vanorama{
      font-size: 1.1em;
      transform: translate(-37px, 0px)
    }

    #devient{
      display: block;
      font-size: 0.7em;
      transform: translate(-37px, 1px)
    }

    #sacorama{
      font-size: 2.5em;
    }

    &.loading{
      animation: 'main-loading' 750ms ease infinite alternate;
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
    .main-header {
      #vanorama{
        font-size: 1.4em;
        transform: translate(-60px, 1px)
      }

      #devient{
        font-size: 0.8em;
        transform: translate(-55px, 2px)
      }

      #sacorama{
        font-size: 3.4em;
      }
    }
  }
}
@media only screen and (min-width: 620px) {
  .home{
    .main-header {
      #vanorama{
        font-size: 1.6em;
        transform: translate(-90px, 1px);
      }

      #devient{
        font-size: 0.9em;
        transform: translate(-79px, 4px)
      }

      #sacorama{
        font-size: 4.6em;
      }
    }
  }
}
</style>

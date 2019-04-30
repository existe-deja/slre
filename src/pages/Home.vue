<template>
  <div class="home">
    <header class="main-header">
      <h1>VANORAMA</h1>
    </header>
    <div
      v-if="loading"
      class="loading">
      <p>chargement...</p>
    </div>
    <section v-else>
      <div>
        <mail-subscription/>
      </div>
      <div class="wrapper">
        <photorama
          v-for="photorama in photoramas"
          :key="photorama.id"
          :title="photorama.title.rendered"
          :date-gmt="photorama.acf.date_display || '2010-01-01'"
          :photos="photorama.acf.photos"/>
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
import { API, POSTS, PHOTORAMAS } from '@/config'
import MailSubscription from '@/components/MailSubscription'
import Photorama from '@/components/Photorama'

export default {
  name: 'Home',

  components: { Photorama, MailSubscription },

  data () {
    return {
      posts: [],
      photoramas: [],
      error: false,
      loading: true
    }
  },

  computed: {
    url () {
      return `${API}${POSTS}`
    }
  },

  mounted () {
    // this.fetchPosts()
    this.fetchPhotoramas()
  },

  methods: {
    async fetchPosts () {
      try {
        const posts = await fetch(`${API}${POSTS}`, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          }
        })
        this.posts = await posts.json()
        this.loading = false
      } catch (e) {
        console.error(e)
        this.error = e
      }
    },

    async fetchPhotoramas () {
      try {
        const photoramas = await fetch(`${API}${PHOTORAMAS}`, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          }
        })
        this.photoramas = await photoramas.json()
        this.loading = false
      } catch (e) {
        console.error(e)
        this.error = e
      }
    }
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
    max-width: 1086px;
    margin: auto;
  }
  .loading{
    text-align: center;
  }
}
@media only screen and (min-width: 480px) {
  .home{
    .main-header h1 {
      font-size: 12px * 6;
    }
  }
}
@media only screen and (min-width: 620px) {
  .home{
    .main-header h1 {
      font-size: 12px * 8;
    }
  }
}
</style>

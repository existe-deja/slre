<template>
  <div class="home">
    <h1 class="main">VANORAMA</h1>
    <div
      v-if="loading"
      class="loading">
      <p>chargement...</p>
    </div>
    <section v-else>
      <!-- <div>
        <h2>Posts</h2>
        <post
          v-for="post in posts"
          :key="post.id"
          :title="post.title.rendered"/>
      </div> -->
      <div>
        <photorama
          v-for="photorama in photoramas"
          :key="photorama.id"
          :title="photorama.title.rendered"
          :date-gmt="photorama.modified_gmt"
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
import { API, ACF_API, POSTS, PHOTORAMAS, TEST } from '@/config'
import Post from '@/components/Post'
import Photorama from '@/components/Photorama'

export default {
  name: 'Home',

  components: { Post, Photorama },

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
    this.fetchPosts()
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
        this.error = e
      }
    }
  }
}
</script>

<style lang="scss">
.main{
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  font-size: 48px;
  padding: 24px 0 36px;
}
</style>

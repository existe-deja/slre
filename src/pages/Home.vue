<template>
  <div class="home">
    <h1>Sur la route encore</h1>
    <div
      v-if="loading"
      class="loading">
      <p>chargement...</p>
    </div>
    <section v-else>
      <post
        v-for="post in posts"
        :key="post.id"
        :title="post.title.rendered"/>
    </section>
    <div
      v-if="error"
      class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { API, POSTS } from '@/config'
import Post from '@/components/Post'

export default {
  name: 'Home',

  components: { Post },

  data () {
    return {
      posts: [],
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
    }
  }
}
</script>

<style>
</style>

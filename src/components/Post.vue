<template>
  <div class="post">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Post',

  props: {
    title: { type: String, required: true }
  }
}
</script>

<style>
</style>

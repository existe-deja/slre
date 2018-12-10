<template>
  <div class="post">
    <h3>{{ title }}</h3>
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

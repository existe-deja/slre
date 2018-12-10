<template>
  <div class="photorama">
    <header>
      <h5 class="date">{{ dateFormated }}</h5>
      <h3 class="title">{{ title }}</h3>
    </header>
    <div
      v-for="photo in photos"
      :key="photo.id"
      class="photo">
      <h4
        v-if="photo.title.length > 0"
        class="photo-title">
        {{ photo.title }}
      </h4>
      <img
        :src="photo.url" alt="">
      <p
        v-if="photo.caption.length > 0"
        class="caption">
        {{ photo.caption }}
      </p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Photorama',

  props: {
    title: { type: String, required: true },
    photos: { type: Array, required: true },
    dateGmt: { type: String, required: true }
  },

  computed: {
    dateFormated () {
      return dayjs(this.dateGmt).format('le D MMMM YYYY')
      // return dayjs(this.dateGmt).locale('es').format()
    }
  }
}
</script>

<style lang="scss">
.photorama{
  header{
    margin-bottom: 12px;
    margin-left: 24px;
  }
  .title{
    // text-transform: uppercase;
    font-size: 24px;
  }
  .date{
    font-size: 12px;
    // text-transform: uppercase;
    font-family: 'Inconsolata', sans-serif;
    font-weight: 600;
  }
  .photo-title{
    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 12px;
    font-size: 16px;
  }
  .caption{
    margin-top: 3px;
    margin-left: 12px;
    font-size: 14px;
  }
}
</style>

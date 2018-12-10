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
import fr from 'dayjs/locale/fr'

export default {
  name: 'Photorama',

  props: {
    title: { type: String, required: true },
    photos: { type: Array, required: true },
    dateGmt: { type: String, required: true }
  },

  computed: {
    dateFormated () {
      // return dayjs(this.dateGmt).format('D MMMM YYYY')
      let day = dayjs(this.dateGmt).locale(fr)
      return day.format('D MMMM YYYY')
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.photorama{
  header{
    margin-bottom: 15px;
    margin-left: 24px;
    border-bottom: 2px solid $color_text_main;
  }

  .photo + .photo{
    margin-top: 12px;
  }
  .title{
    // text-transform: uppercase;
    font-size: 24px;
    margin-bottom: 2px;
  }
  .date{
    font-size: 11px;
    text-transform: lowercase;
    font-family: 'Inconsolata', sans-serif;
    font-weight: 700;
    background: $color_text_main;
    color: white;
    padding: 2px 36px 2px 6px;
    display: inline-block;
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

  & + &{
    margin-top: 24px;
  }
}
</style>

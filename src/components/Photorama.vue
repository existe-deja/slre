<template>
  <div class="photorama">
    <header>
      <h5 class="date">{{ dateFormated }}</h5>
      <h3 class="title">{{ title }}</h3>
    </header>
    <section class="wrapper">
      <div class="cover photo">
        <img
        :src="photos[0].url" alt="">
        <p
        v-if="photos[0].caption.length > 0"
        class="caption">
          {{ photos[0].caption }}
        </p>
      </div>
      <div class="thumbs">
        <div
          v-for="photo in photos.slice(1)"
          :key="photo.id"
          class="photo">
            <img
            :src="photo.url" alt="">
            <p
            v-if="photo.caption.length > 0"
            class="caption">
            {{ photo.caption }}
          </p>
        </div>
      </div>
    </section>
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
  width: 100%;

  header{
    margin-bottom: 15px;
    margin-left: 24px;
    border-bottom: 2px solid $color_text_main;
  }

  & + &{
    margin-top: 24px;
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
  .wrapper{
    margin: auto;
    max-width: 1086px;
  }
  .cover{
    margin-bottom: 12px;
  }
  .thumbs{
    .photo + .photo{
      margin-top: 12px;
    }
  }
}
@media only screen and (min-width: 480px) {
  .photorama {
    .thumbs{
      display: flex;
      .photo + .photo{
        margin-top: 0;
        margin-left: 12px;
      }
    }
  }
}
</style>

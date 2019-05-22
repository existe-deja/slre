<template>
  <div class="photorama">
    <header ref="header">
      <h5 ref="date" class="date">{{ dateFormated }}</h5>
      <h3 ref="title" class="title"/>
    </header>
    <section class="wrapper">
      <div class="cover photo">
        <img
        :src="photos[0].url"
        @click="handleClick(0)"
        alt="">
      </div>
      <div class="thumbs">
         <div
           v-for="(photo, i) in photos.slice(1)"
           :key="photo.id"
           :style='{ backgroundImage: `url(${photo.url})`, backgroundSize: `cover` }'
           @click="handleClick(i + 1)"
           class="photo"/>
      </div>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import { mapMutations } from 'vuex'
import { SET_FULLSCREEN } from '@/config'
import { TimelineLite, Power2, Power0 } from 'gsap/all'

/* eslint-disable */
export default {
  name: 'Photorama',

  data () {
    return {
      tl:  null
    }
  },

  props: {
    index: { type: Number, required: true },
    title: { type: String, required: true },
    photos: { type: Array, required: true },
    dateGmt: { type: String, required: true },
    autoplay: { type: Boolean, required: true }
  },

  computed: {
    dateFormated () {
      let day = dayjs(this.dateGmt).locale(fr)
      return day.format('D MMMM YYYY')
    }
  },

  watch: {
    autoplay (value) {
      if (value) this.isScrolledIntoView()
    }
  },

  mounted () {
    this.tl = new TimelineLite()
    // let computedStyle = getComputedStyle(this.$refs.date)
    let dateHeight = this.$refs.date.clientHeight
    // dateHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)

    this.tl
      .pause()
      .addLabel(`photorama${this.index}`)
      .fromTo(this.$refs.date,
        0.150,
        {
          height: 0,
          ease: Power2.easeInOut,
        },
        {
          height: dateHeight,
        }
      )
      .to(
        this.$refs.title,
        1.3,
        {
          text: this.title,
          ease: Power2.easeInOut,
          onComplete: function (elem) { elem.classList.add('active') },
          onCompleteParams: [this.$refs.header]
        },
        '-=0.15'
      )
      .staggerFromTo(
        this.$el.querySelectorAll('.photo'),
        0.750,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: Power2.easeInOut },
        0.2,
        0.75
      )
    window.addEventListener('scroll', this.isScrolledIntoView)
  },

  methods: {
    ...mapMutations({
      setFullscreen: SET_FULLSCREEN
    }),

    handleClick (i) {
      this.setFullscreen({photoramaIndex: this.index, photoIndex: i})
    },

    isScrolledIntoView () {
      var rect = this.$el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;

      // Partially visible elements return true:
      var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      if (isVisible) {
        setTimeout(_ => {
          this.tl.play()
        }, 350)
        window.removeEventListener('scroll', this.isScrolledIntoView)
      }
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
    position: relative;

    &:after{
      content: '';
      display: block;
      position: absolute;
      background: $color_text_main;
      height: 2px;
      width: 0;
      transition: all 400ms ease;
    }
    &.active:after{
      width: 100%;
    }
  }

  & + &{
    margin-top: 48px;
  }

  .title{
    // text-transform: uppercase;
    font-size: 24px;
    margin-bottom: 2px;
    padding-right: $main_photo_gap;
  }
  .date{
    font-size: 12px;
    line-height: 22px;
    text-transform: lowercase;
    font-family: 'Inconsolata', sans-serif;
    font-weight: 700;
    background: $color_text_main;
    color: white;
    padding: 0 36px 0 6px;
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
    margin-left: 0px;
    font-size: 14px;
  }
  .photo{
    width: 100%;
  }
  .cover.photo img{
    margin: auto;
  }
  .photo{
    cursor: pointer;
    min-height: 265.5px;
    background-size: cover;
    background-position: center;
    &.cover{
      min-height: auto;
    }

  }
  .thumbs{
    margin-top: $main_photo_gap;

    .photo + .photo{
      margin-top: $main_photo_gap;
    }
  }
}
@media only screen and (min-width: 480px) {
  .photorama {
    .thumbs{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-top: $main_photo_gap;
      grid-column-gap: $main_photo_gap;
      grid-row-gap: $main_photo_gap;
      justify-items: center;

      .photo + .photo{
        margin-top: 0px;
      }
    }
  }
}
</style>

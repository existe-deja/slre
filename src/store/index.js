import Vue from 'vue'
import Vuex from 'vuex'
import photoramas from '@/api/photoramas'

import { NAVIGATE_FULLSCREEN, RESET_FULLSCREEN, SET_FULLSCREEN } from '@/config'

const debug = process.env.NODE_ENV !== 'production'
Vue.config.devtools = true
Vue.use(Vuex)

export default new Vuex.Store({
  strict: debug,

  state: {
    isItAMobile: false,
    loading: true, // if the api is requesting
    fullyLoaded: false, // if all of the photoramas are loaded
    isFullScreen: false, // if a fullscreen action is asked
    fullscreenPhotoramaIndex: 0, // the index of the current fullscreened photorama
    fullscreenPhotoIndex: 0, // the index of the current fullscreened photo of the photorama
    photoramas: [] // the photoramas
  },

  getters: {
    fullScreenObject (state) {
      if (!state.isFullScreen) return null
      return {
        title: state.photoramas[state.fullscreenPhotoramaIndex].title.rendered,
        photo: state.photoramas[state.fullscreenPhotoramaIndex].acf.photos[state.fullscreenPhotoIndex]
      }
    }
  },

  actions: {
    async loadPhotoramas ({state, commit}) {
      commit('loading', true)

      await photoramas.getContent(
        state.photoramas.length,
        content => commit('populate', content),
        e => {
          console.error(e)
        }
      )

      commit('loading', false)
    }
  },

  mutations: {
    loading (state, payload) {
      state.loading = payload
    },

    populate (state, payload) {
      state.fullyLoaded = payload.length === 0
      state.photoramas.push(...payload)
    },

    isAMobile (state, payload) {
      state.isItAMobile = payload
    },

    [RESET_FULLSCREEN] (state) {
      state.isFullScreen = false
    },

    [SET_FULLSCREEN] (state, {photoramaIndex, photoIndex}) {
      state.isFullScreen = true
      state.fullscreenPhotoramaIndex = photoramaIndex
      state.fullscreenPhotoIndex = photoIndex
    },

    [NAVIGATE_FULLSCREEN] (state, payload) {
      let i = state.fullscreenPhotoIndex + payload
      let j = state.fullscreenPhotoramaIndex
      if (i >= state.photoramas[state.fullscreenPhotoramaIndex].acf.photos.length) {
        i = 0
        j++
        if (j >= state.photoramas.length) {
          j = 0
        }
      } else if ( i < 0) {
        j--
        if (j < 0) {
          j = state.photoramas.length - 1
        }
        i = state.photoramas[j].acf.photos.length - 1
      }
      state.fullscreenPhotoIndex = i
      state.fullscreenPhotoramaIndex = j
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import photoramasApi from '@/api/photoramas'
import mapApi from '@/api/map'

import { PER_PAGE, NAVIGATE_FULLSCREEN, RESET_FULLSCREEN, SET_FULLSCREEN } from '@/config'

const debug = process.env.NODE_ENV !== 'production'
Vue.config.devtools = true
Vue.use(Vuex)

export default new Vuex.Store({
  strict: debug,

  state: {
    isItAMobile: false,
    initialLoading: true, // If the api was loaded
    loading: true, // if the api is requesting
    fullyLoaded: false, // if all of the photoramas are loaded
    isFullScreen: false, // if a fullscreen action is asked
    fullscreenPhotoramaIndex: 0, // the index of the current fullscreened photorama
    fullscreenPhotoIndex: 0, // the index of the current fullscreened photo of the current photorama
    photoramas: [], // the photoramas,
    mapParams: { // map parameters
      rotate: [0, 0],
      centeringIds: ["504","156","356"],
      visitedIds: ["250"]
    },
    geodata: null
  },

  getters: {
    fullScreenObject (state) {
      if (!state.isFullScreen) return null
      return {
        title: state.photoramas[state.fullscreenPhotoramaIndex].title.rendered,
        photo: state.photoramas[state.fullscreenPhotoramaIndex].acf.photos[state.fullscreenPhotoIndex]
      }
    },

    globalPhotoIndex (state) {
      return `${state.fullscreenPhotoramaIndex}_${state.fullscreenPhotoIndex}`
    }
  },

  actions: {
    async loadPhotoramas ({state, commit}) {
      commit('loading', true)

      await photoramasApi.getContent(
        state.photoramas.length,
        content => commit('populate', content),
        e => {
          console.error(e) // eslint-disable-line
        }
      )

      await mapApi.getContent(
        content => commit('setMapParams', content[0]),
        e => {
          console.error(e) // eslint-disable-line
        }
      )

      state.photoramas.length === PER_PAGE ? commit('initiallyLoaded') : commit('loading', false)
    }
  },

  mutations: {
    initiallyLoaded (state) {
      state.initialLoading = false
      state.loading = false
    },

    loading (state, payload) {
      state.loading = payload
    },

    populate (state, payload) {
      state.fullyLoaded = payload.length === 0
      state.photoramas.push(...payload)
    },

    setMapParams (state, payload) {
      state.mapParams.rotate = payload.acf.rotate.split(',').map(x => parseFloat(x))
      state.mapParams.centeringIds = payload.acf.centering_ids.split(',')
      state.mapParams.visitedIds = payload.acf.visited_ids.split(',')
      state.mapParams.tripPoints = payload.acf.coordinates
        .split('\r\n')
        .filter(row => row.length > 0)
        .map(p => {
          let point = p.split(',')
          return {
            coords: [parseFloat(point[1].replace(' ', '')), parseFloat(point[0].replace(' ', ''))],
            label: point[2]
          }
        })
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

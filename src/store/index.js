import Vue from 'vue'
import Vuex from 'vuex'
import photoramas from '@/api/photoramas'

const debug = process.env.NODE_ENV !== 'production'
Vue.config.devtools = debug
Vue.use(Vuex)

export default new Vuex.Store({
  strict: debug,

  state: {
    loading: true,
    fullyLoaded: false,
    photoramas: []
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
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

import api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 1
  },
  mutations: {
    setPage (state, index) { state.page = index }
  },
  actions: {
  },
  modules: {
    api
  }
})

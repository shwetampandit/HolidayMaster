import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters,
  mutations,
  actions,
  modules: {
    Login
  },
  plugins: [createPersistedState()]
})

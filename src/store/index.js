import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

import ui from './modules/ui'
import user from './modules/user'
import dictionary from './modules/dictionary'

Vue.use(Vuex)
// window.za_app.depend.Vuex = Vuex

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    ui, user, dictionary
  },
  actions: {
  },
  strict: false,
  plugins: []
})

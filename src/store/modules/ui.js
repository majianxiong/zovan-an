import * as types from '../mutation-types'

const state = {
  loadingStatus: false
}

const getters = {
  maskState: (state) => state.loadingStatus
}
const actions = {
  toggleLoadingStatus ({ commit, state }, bool) {
    commit(bool ? types.LOADING_SHOW : types.LOADING_HIDE)
  }
}
const mutations = {
  [types.LOADING_SHOW] (state) {
    state.loadingStatus = true
  },
  [types.LOADING_HIDE] (state) {
    state.loadingStatus = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

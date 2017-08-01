import * as types from '../mutation-types'

const state = {
  selectjob: [],
  visitedDictionary: false
}

const getters = {
  getJobs: (state) => state.selectjob,
  getVisitedDictionary: (state) => state.visitedDictionary
}
const actions = {
  toggleLoadingStatus ({ commit, state }, bool) {
    commit(bool ? types.LOADING_SHOW : types.LOADING_HIDE)
  }
}
const mutations = {
  [types.CLEARJOBS] (state) {
    state.selectjob = []
  },
  [types.ADDJOB] (state, payload) {
    state.selectjob =  payload.arr
  },
  [types.VISITEDDICTIONARY] (state, payload) {
    state.visitedDictionary = payload.flag
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}

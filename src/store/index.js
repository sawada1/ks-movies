import { createStore } from 'vuex'

export default createStore({
  state: {
    searchinput: sessionStorage.getItem('searching')==''?'':sessionStorage.getItem('searching'),
  },
  getters: {
  },
  mutations: {
    searchfunction(state, playload) {
      state.searchinput = playload;
    }
  },
  actions: {
  },
  modules: {
  }
})

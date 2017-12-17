import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    postCount: 0
  },
  mutations: {
    incrementPostCount: state => state.postCount++,
    decrementPostCount: state => state.postCount--
  }
})

export default store

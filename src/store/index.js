import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    username: ""
  },
  mutations: {
    mutationsGetName(state, value) {
      return (state.username = value)
    },
  },
  actions: {},
  modules: {},
});
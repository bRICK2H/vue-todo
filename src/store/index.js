import Vue from 'vue'
import Vuex from 'vuex'

import modal from './modules/_dry/modal'

import todo from './modules/todo/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // dry
    modal,
    // project
    todo,
  }
})
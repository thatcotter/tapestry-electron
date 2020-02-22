import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
import modules from './modules'
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {MODE} from './mode';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: MODE.Attract,
    quest: 'trolley',
    messages: [],
    midiConnections: [],
    puzzles: []
  },
  getters,
  mutations,
  actions,
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})


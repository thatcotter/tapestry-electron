import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
import modules from './modules'
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {MODE} from './mode';
// import GENDER from './mode';

import Puzzle from '../puzzle/puzzle'
const trolleyData = require('../data/trolley-quest.json')
let puzzleData = Object.assign({}, trolleyData)

Vue.use(Vuex)

// console.log('mode: ', MODE.getDescription(MODE.ATTRACT))

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


import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    puzzles: []
  },
  getters: {
    recentMessages: state => {
      let temp = JSON.parse(JSON.stringify(state));
      return temp.messages.sort((a,b) => a.time < b.time ? 1 : -1)
    }
  },
  mutations: {
    clearMessages(state){
      state.messages = []
    },
    resetPuzzles(state){
      state.puzzles = []
    },
    newMessage(state, payload) {
      state.messages.push(payload)
    }
  },
  actions: {
    reset(store) {
      store.commit('clearMessages')
      store.commit('resetPuzzles')
    },
    clearMessages(store) {
      store.commit('clearMessages')
    },
    resetPuzzles(store) {
      store.commit('resetPuzzles')
    },
    newMessage(store, payload) {
      store.commit('newMessage', payload)
    }
  },
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

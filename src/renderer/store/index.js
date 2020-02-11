import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'
import * as fs from 'fs'
import path from 'path'

import Puzzle from '../puzzle/puzzle'
const dataOrigin = require('../data/puzzle-list.json')
let puzzleData = Object.assign({}, dataOrigin)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    midiConnections: [],
    puzzles: []
  },
  getters: {
    recentMessages: state => {
      let temp = JSON.parse(JSON.stringify(state));
      return temp.messages.sort((a,b) => a.time < b.time ? 1 : -1)
    },
    lastNMessages: (state, getters) => n => {
      return getters.recentMessages.slice(0, n)
    },
    midiConnections: (state, getters) => {
      return state.midiConnections
    },
    getPuzzleById: state => id => {
      return state.puzzles.filter(puzzle => puzzle.id === id)
    },
    solvedPuzzles: state => {
      return state.puzzles.filter(puzzle => puzzle.solved)
    },
    solvedPuzzleByID: (state, getters) => id => {
      for (let i = 0; i < getters.solvedPuzzles.length; i++) {
        const element = getters.solvedPuzzles[i];
        if(element.id == id)
          return element
      }
    },
    activePuzzles: state => {
      return state.puzzles.filter(puzzle => puzzle.available)
    },
    inactivePuzzles: state => {
      return state.puzzles.filter(puzzle => puzzle.available === false && puzzle.solved === false)
    }
  },
  mutations: {
    clearMessages(state){
      state.messages = []
    },
    clearPuzzles(state){
      state.puzzles = []
    },
    newMessage(state, payload) {
      state.messages.push(payload)
    },
    addConnection(state, payload){
      if (state.midiConnections.includes(payload)) return
      state.midiConnections.push(payload)
    },
    clearConnections(state, payload) {
      state.midiConnections = []
    },
    addPuzzle(state, payload){
      state.puzzles.push(payload)
    },
    unlockPuzzle(state, payload) {
      for(let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].available === false &&
            state.puzzles[i].id === payload)
          state.puzzles[i].available = true
      }
      console.log(state.puzzles)
    },
    unlockDependency(state, payload) {
      for (let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].id != payload.id) continue
        state.puzzles[i].dependencies[payload.key] = true
      }
    },
    resolvePuzzle(state, payload) {
      for (let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].available === true &&
            state.puzzles[i].solved === false &&
            state.puzzles[i].id === payload) {
          console.log(state.puzzles[i].id, ' solved!')
          state.puzzles[i].available = false
          state.puzzles[i].solved = true
        }
      }
    }
  },
  actions: {
    reset(store) {
      store.commit('clearMessages')
      store.commit('clearPuzzles')
    },
    newMessage(store, payload) {
      store.commit('newMessage', payload)
    },
    clearMessages(store) {
      store.commit('clearMessages')
    },
    addConnection(store, payload) {
      store.commit('addConnection', payload)
    },
    clearConnections(store, payload) {
      store.commit('clearConnections', payload)
    },
    clearPuzzles(store){
      store.commit('clearPuzzles')
    },
    resetPuzzles(store) {
      store.dispatch('clearPuzzles')
      puzzleData = Object.assign({}, dataOrigin)
      console.log(puzzleData.puzzles)
      puzzleData.puzzles.forEach(config => {
        for (const key in config.dependencies) {
          if (config.dependencies.hasOwnProperty(key)) {
            if (config.dependencies[key]) {
              config.dependencies[key] = false
            }
          }
        }
        console.log(config)
        const temp = new Puzzle(config)
        store.commit('addPuzzle', temp)
      });
    },
    resolvePuzzle(store, payload) {
      store.commit('resolvePuzzle', payload)
    },
    unlockDependency(store, payload) {
      store.commit('unlockDependency', payload)
    },
    unlockPuzzle(store, payload) {
      store.commit('unlockPuzzle', payload)
    }
  },
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
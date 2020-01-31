import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'
import * as fs from 'fs'
import path from 'path'

import Puzzle from '../puzzle/puzzle'

import * as puzzleData from '../data/puzzle-list'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    puzzles: ['test']
  },
  getters: {
    recentMessages: state => {
      let temp = JSON.parse(JSON.stringify(state));
      return temp.messages.sort((a,b) => a.time < b.time ? 1 : -1)
    },
    lastNMessages: (state, getters) => n => {
      return getters.recentMessages.slice(0, n)
    },
    getPuzzleById: state => id => {
      return state.puzzles.filter(puzzle => puzzle.id === id)
    },
    solvedPuzzles: state => {
      return state.puzzles.filter(puzzle => puzzle.solved)
    },
    activePuzzles: state => {
      return state.puzzles.filter(puzzle => puzzle.available)
    },
    inactivePuzzles: state => {
      return state.puzzles.filter(puzzle => puzzle.available === false)
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
    addPuzzle(state, payload){
      state.puzzles.push(payload)
    },
    unlockPuzzle(state, payload) {
      for(let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].available === false &&
            state.puzzles[i].id === payload)
          state.puzzles[i].available = true
      }
    },
    resolvePuzzle(state, payload) {
      for (let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].solved === false &&
          state.puzzles[i].id === payload)
          state.puzzles[i].solved = true
      }
    }
  },
  actions: {
    reset(store) {
      store.commit('clearMessages')
      store.commit('clearPuzzles')
    },
    clearPuzzles(store){
      store.commit('clearPuzzles')
    },
    clearMessages(store) {
      store.commit('clearMessages')
    },
    resetPuzzles(store) {
      store.dispatch('clearPuzzles')
      // store.commit('clearPuzzles')
      
      const data = fs.readFile(path.resolve(__dirname, '../data/puzzle-list.json'), (err, data) => {
        if (err) throw err
        const obj = JSON.parse(data)
        obj.puzzles.forEach(config => {
          console.log(config)
          const temp = new Puzzle(config)
          store.commit('addPuzzle', temp)
        });
      })

      // fs.readFile('../../data/puzzle-list.json', 'utf8', (err, data) => {
      //   if(err) throw err
      //   const obj = JSON.parse(data)
      //   console.log(data)
        // obj.puzzles.forEach(config => {
        //   console.log(config)
          // const temp = new Puzzle(config)
          // state.puzzles.push(temp)
        // });
      // })
      // const data = require('../data/puzzle-list.json')
      //   .then(() => {
      //     data.puzzles.forEach(config => {
      //       console.log(config)
      //       // const temp = new Puzzle(config)
      //       // state.puzzles.push(temp)
      //     });
      //   })
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
import {MODE} from './mode'
import Puzzle from '../puzzle/puzzle'

const reset = (store) => {
    store.commit('clearMessages')
    store.commit('clearPuzzles')
}

const newMessage = (store, payload) => {
    store.commit('newMessage', payload)
}

const clearMessages = (store) => {
    store.commit('clearMessages')
}

const addConnection = (store, payload) => {
    store.commit('addConnection', payload)
}

const clearConnections = (store) => {
    store.commit('clearConnections')
}

const clearPuzzles = (store) => {
    store.commit('clearPuzzles')
}

const resetPuzzles = (store) => {
    store.dispatch('clearPuzzles')

    console.log('testing...');
    
    let puzzleData

    if(store.quest === 'walk') {
        const walkData = require('../data/walk-quest.json')
        puzzleData = Object.assign({}, walkData)
    } 
    else if (store.quest === 'trolley') {
        const trolleyData = require('../data/trolley-quest.json')
        puzzleData = Object.assign({}, trolleyData)
    }
    else if (store.quest === 'car') {
        const car = require('../data/car-quest.json')
        puzzleData = Object.assign({}, car)
    }

    console.log(puzzleData)
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
}

const setQuest = (store, payload) => {
    store.commit('setQuest', payload)
}

const loadQuest = (store) => {
    store.dispatch('clearPuzzles')
    const dataOrigin = require(`../data/${store.state.quest}-quest.json`)
    let puzzleData = Object.assign({}, dataOrigin)
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
}

const resolvePuzzle = (store, payload) => {
    store.commit('resolvePuzzle', payload)
}

const unlockDependency = (store, payload) => {
    store.commit('unlockDependency', payload)
}

const unlockPuzzle = (store, payload) => {
    store.commit('unlockPuzzle', payload)
}

const attractMode = store => store.commit('changeMode', MODE.Attract) 

const menuMode = store => store.commit('changeMode', MODE.Menu)

const questMode = store => store.commit('changeMode', MODE.Quest)

export default {
    reset,
    newMessage,
    clearMessages,
    addConnection,
    clearConnections,
    clearPuzzles,
    resetPuzzles,
    setQuest,
    loadQuest,
    resolvePuzzle,
    unlockDependency,
    unlockPuzzle,
    attractMode,
    menuMode,
    questMode
}
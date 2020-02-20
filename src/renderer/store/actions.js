import {MODE} from './mode'

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

const clearConnections = (store, payload) => {
    store.commit('clearConnections', payload)
}

const clearPuzzles = (store) => {
    store.commit('clearPuzzles')
}

const resetPuzzles = (store) => {
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
    resolvePuzzle,
    unlockDependency,
    unlockPuzzle,
    attractMode,
    menuMode,
    questMode
}
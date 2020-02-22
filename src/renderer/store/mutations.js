import MODE from './mode'

const clearMessages = (state) => {
    state.messages = []
}

const clearPuzzles = (state) => {
    state.puzzles = []
}

const clearConnections = (state) => {
    state.midiConnections = []
}

const newMessage = (state, payload) => {
    state.messages.push(payload)
}

const addConnection = (state, payload) => {
    if (state.midiConnections.includes(payload)) return
    state.midiConnections.push(payload)
}

const addPuzzle = (state, payload) => {
    state.puzzles.push(payload)
}

const unlockPuzzle = (state, payload) => {
    for (let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].available === false &&
            state.puzzles[i].id === payload)
            state.puzzles[i].available = true
    }
    console.log(state.puzzles)
}

const unlockDependency = (state, payload) => {
    for (let i = 0; i < state.puzzles.length; i++) {
        if (state.puzzles[i].id != payload.id) continue
        state.puzzles[i].dependencies[payload.key] = true
    }
}

const resolvePuzzle = (state, payload) => {
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

const changeMode = (state, payload) => {
    console.log("change mode payload:", payload)
    state.mode = payload
}

const setQuest = (state, payload) => {
    state.quest = payload
}

export default {
    clearMessages,
    clearPuzzles,
    clearConnections,
    newMessage,
    addConnection,
    addPuzzle,
    unlockPuzzle,
    unlockDependency,
    resolvePuzzle,
    changeMode,
    setQuest
}
const recentMessages = state => {
    let temp = JSON.parse(JSON.stringify(state));
    return temp.messages.sort((a, b) => a.time < b.time ? 1 : -1)
}

const lastNMessages = (state, getters) => n => {
    return getters.recentMessages.slice(0, n)
}

const midiConnections = (state, getters) => {
    return state.midiConnections
}

const getPuzzleById = state => id => {
    return state.puzzles.filter(puzzle => puzzle.id === id)
}

const solvedPuzzles = state => {
    return state.puzzles.filter(puzzle => puzzle.solved)
}

const solvedPuzzleByID = (state, getters) => id => {
    for (let i = 0; i < getters.solvedPuzzles.length; i++) {
        const element = getters.solvedPuzzles[i];
        if (element.id == id)
            return element
    }
}

const activePuzzles = state => {
    return state.puzzles.filter(puzzle => puzzle.available)
}

const inactivePuzzles = state => {
    return state.puzzles.filter(puzzle => puzzle.available === false && puzzle.solved === false)
}

export default {
    recentMessages,
    lastNMessages,
    midiConnections,
    getPuzzleById,
    solvedPuzzles,
    solvedPuzzleByID,
    activePuzzles,
    inactivePuzzles
}
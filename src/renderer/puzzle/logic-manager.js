//-----------------------------------------------------
//  puzzle logic
//-----------------------------------------------------

import store from '../store/store'
import * as _ from 'lodash'
import {MODE} from '../store/mode'
import {sendNote} from '../midiParsing'

// @ts-ignore
const mapping = require('../data/button-mapping.json')


export const logicManager = store => {
    store.subscribe((mutation, state) => {
        console.log("New Vuex Mutation:")
        console.log("Mode: ", state.mode)
        console.log("Type: ", mutation.type)
        console.table("Payload: ", mutation.payload)

        switch (mutation.type) {
            case 'newMessage':
                switch (state.mode) {
                    case MODE.Attract:
                        onAttractMessage(mutation.payload)
                        break;
                    case MODE.Menu:
                        onMenuMessage(mutation.payload)
                        break;
                    case MODE.Quest:
                        onQuestMessage(mutation.payload)
                        break;
                    default:
                        store.dispatch('attractMode')
                        break
                }
                break;

            case 'resolvePuzzle':
                onSolved(mutation.payload)
                break;

            default:
                break;
        }
    })
}

logicManager(store)

const onAttractMessage = payload => {
    switch(payload.note) {
        case 63:
            store.dispatch('menuMode')
            break;
        default:
            console.log(`relaying note ${payload.note}`)
            sendNote(payload.note)
            break;
    }
}

const onMenuMessage = payload => {

    switch (payload.note) {
        case 0:
            store.dispatch('questMode')
            store.dispatch('setQuest', 'walk')
            store.dispatch('loadQuest')
            break;

        case 1:
            store.dispatch('questMode')
            store.dispatch('setQuest', 'trolley')
            store.dispatch('loadQuest')
            break;

        case 2:
            store.dispatch('questMode')
            store.dispatch('setQuest', 'car')
            store.dispatch('loadQuest')
            break;

        default:
            break;
    }

}

const onQuestMessage = payload => {
    const actives = store.getters.activePuzzles

    actives.forEach(puzzle => {
        const lock = [...puzzle.solution.buttons]
        const questType = puzzle.solution.type
        const key = []

        switch (questType) {
            case 'press':
                store.getters.lastNMessages(lock.length)
                    .reverse()
                    .forEach(val => {
                        key.push(mapping[val.note].id / 1)
                    })
                if (_.isEqual(key, lock)) {
                    store.dispatch('resolvePuzzle', puzzle.id)
                }
                break;
            
            case 'or':
                const val = store.getters.lastNMessages(1)
                key[0] = mapping[val[0].note].id / 1
                console.log(key, lock)
                lock.forEach(option => {
                    if(key[0] === option)
                        store.dispatch('resolvePuzzle', puzzle.id)
                })
                break;

            default:
                break;
        }        
    });
}

const onSolved = payload => {
    let numProcessed = 0
    store.getters.inactivePuzzles.forEach(val => {
        if (!val.solved) {
            if (!val.available) {
                for (const key in val.dependencies) {
                    if (val.dependencies.hasOwnProperty(key)) {
                        const element = val.dependencies[key];
                        if (store.getters.solvedPuzzleByID(key) != null) {
                            store.dispatch('unlockDependency', {
                                id: val.id,
                                key: key
                            })
                        }
                    }
                }
            }
        }
        numProcessed++
        if (numProcessed >= store.getters.inactivePuzzles.length) {
            setTimeout(() => {
                onDepUnlock()
            }, 48);
        }
    })
}

const onDepUnlock = () => {
    store.getters.inactivePuzzles.forEach(val => {
        if (!val.solved) {
            if (!val.available) {
                let check = true
                for (const key in val.dependencies) {
                    if (val.dependencies.hasOwnProperty(key)) {
                        const element = val.dependencies[key];
                        if (element === false) {
                            check = false
                        }
                    }
                }
                if (check) {
                    store.dispatch('unlockPuzzle', val.id)
                }
            }
        }
    })
}
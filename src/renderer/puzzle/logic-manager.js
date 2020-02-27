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
        console.log(state.mode)
        console.log(mutation.type)
        console.log(mutation.payload)

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
        case 64:
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
        const key = []
        store.getters.lastNMessages(lock.length)
            .reverse()
            .forEach(val => {
                key.push(mapping[val.note].id / 1)
            })
        if (_.isEqual(key, lock)) {
            store.dispatch('resolvePuzzle', puzzle.id)
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
                console.log("dependencies is ", {
                    ...val.dependencies
                })
                for (const key in val.dependencies) {
                    if (val.dependencies.hasOwnProperty(key)) {
                        const element = val.dependencies[key];
                        console.log("element at ", key, " is ", element)
                        if (element === false) {
                            check = false
                        }
                    }
                }
                console.log(check)
                if (check) {
                    store.dispatch('unlockPuzzle', val.id)
                }
                console.log(val)
            }
        }
    })
    console.log(store.getters.inactivePuzzles[0])
}
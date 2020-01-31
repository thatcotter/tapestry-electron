//-----------------------------------------------------
//  puzzle logic
//-----------------------------------------------------

import store from '../store/index'

export const logicManager = store => {
    store.subscribe((mutation, state) => {
        console.log(mutation.type)
        console.log(mutation.payload)

        switch (mutation.type) {
            case 'newMessage':
                onMessage(mutation.payload)
                break;
        
            default:
                break;
        }
    })
}

logicManager(store)

const onMessage = payload => {

}

const onSolved = payload => {}





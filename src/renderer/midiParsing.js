//-----------------------------------------------------
//  midi parsing
//-----------------------------------------------------
import * as easymidi from "easymidi";
import store from './store/store';

const inputAddresses = easymidi.getInputs();
const virtualIn = new easymidi.Input('virtualIn', true);
const virtualOut = new easymidi.Output('virtualOut', true);

store.subscribe((mutation, state) => {
    switch (mutation.type) {
        case 'clearConnections':
            console.log('getting new connections')
            resetConnections()
            break;

        default:
            break;
    }
})

export const midiInputs = [];
// export const midiOutputs = []

const parseNote = msg => {
    const newMsg = {
        ...msg,
        time: Date.now()
    };
    store.dispatch('newMessage', newMsg);
    virtualOut.send('noteon', msg);
}

virtualIn.on('noteon', msg => parseNote(msg));
// vrtualIn.on('noteoff', msg => parseNote(msg))
midiInputs.push(virtualIn);

setInterval(() => {
    console.log("midi connections: ", midiInputs.length)
    console.log("new connections", easymidi.getInputs().filter(input => input != 'virtualOut').length)
    if (midiInputs.length != easymidi.getInputs().filter(input => input != 'virtualOut').length) {
        console.log('resetting midi...')
        store.dispatch('clearConnections')
    }
}, 1500);

const resetConnections = () => {
    midiInputs.length = 0
    easymidi.getInputs().forEach(address => {
        if (address != 'virtualOut') {
            console.log(address)
            const input = new easymidi.Input(address);
            input.on('noteon', msg => parseNote(msg));
            input.address = address

            midiInputs.push(input);
            store.dispatch('addConnection', input);
        }
    })
}

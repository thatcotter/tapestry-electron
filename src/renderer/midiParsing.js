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
    console.log(msg);
    store.dispatch('newMessage', newMsg);
    virtualOut.send('noteon', msg);
}

virtualIn.on('noteon', msg => parseNote(msg));
// vrtualIn.on('noteoff', msg => parseNote(msg))
midiInputs.push(virtualIn);

const resetConnections = () => {
    midiInputs.length = 0
    inputAddresses.forEach(address => {
        const input = new easymidi.Input(address);
        input.on('noteon', msg => parseNote(msg));
        input.address = address

        midiInputs.push(input);
        store.dispatch('addConnection', input);
    })
}

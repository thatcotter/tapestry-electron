//-----------------------------------------------------
//  midi parsing
//-----------------------------------------------------
import * as easymidi from "easymidi";
import store from './store/index'

const inputAddresses = easymidi.getInputs();
const vrtualIn = new easymidi.Input('virtualOut', true)

export const midiInputs = []

const parseNote = msg => {
    msg = {
        ...msg,
        time: Date.now()
    }
    console.log(msg)
    store.dispatch('newMessage', msg)
}

vrtualIn.on('noteon', msg => parseNote(msg));
vrtualIn.on('noteoff', msg => parseNote(msg))
midiInputs.push(vrtualIn)

inputAddresses.forEach(address => {
    const input = new easymidi.Input(address);
    input.on('noteon', msg => parseNote(msg));
    input.on('noteoff', msg => parseNote(msg))
    midiInputs.push(input)
})
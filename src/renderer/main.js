import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// @ts-ignore
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

//-----------------------------------------------------
// Dom Manipulation 
//-----------------------------------------------------
// document.body.onload = () => {
//   const app = document.getElementById('app')
//   let header = document.createElement('h1')
//   header.id = "gameState"
//   header.textContent = "State: Initial"
//   app.appendChild(header)

//   let header2 = document.createElement('h1')
//   header2.textContent = "Last Touchpoints"
//   app.appendChild(header2)

//   let list1 = document.createElement('ol')
//   list1.id = "lastTouched"
//   list1.className = "horizontal"
//   app.appendChild(list1)

//   // let header3 = document.createElement('h1')
//   // header3.textContent = "Tapestry State"
//   // app.appendChild(header3)

//   // let list2 = document.createElement('ol')
//   // list2.id = "states"
//   // list2.className = "horizontal"
//   // app.appendChild(list2)

//   // for (let i = 0; i < 64; i++) {
//   //   const element = document.createElement('li');
//   //   element.textContent = tapestry[i]
//   //   list2.appendChild(element)
//   // }
// }

// const step = () => {

//   if (lastTouched.length > 12) {
//     lastTouched.splice(0, 1)
//   }

//   let stateHeader = document.getElementById('gameState')
//   stateHeader.textContent = `State: ${currentGameState}`

//   let record = document.getElementById('lastTouched')
//   record.innerHTML = ""

//   lastTouched.forEach((state, i) => {
//     let touch = document.createElement('ol')
//     touch.textContent = "Last Touchpoints"
//     touch.textContent = state
//     touch.style.color = 'blue'
//     record.appendChild(touch)
//   });


//   // let states
//   // if (document.getElementById('states').childNodes) {
//   //   states = document.getElementById('states').childNodes
//   // }

//   // states.forEach((state, i) => {
//   //   states[i].textContent = tapestry[i]
//   //   states[i].style.color = (tapestry[i]) ? "green" : "black"
//   // });
// }
// window.requestAnimationFrame(step)

// setInterval(step, 100);



//-----------------------------------------------------
// tapestry state
//-----------------------------------------------------

// keeping track of every Simultaneous touch
const tapestry = []
// keepin track of the last touch recorded
const lastTouched = []

// array from 0 to 10
const notes = [...Array(64).keys()]
notes.forEach(note => {
  // make every tapestry state initially false
  tapestry.push(false)
})

const recordTouch = (channel, note, press) => {
  if (press) {
    lastTouched.push([channel, note])
    tapestry[note - 1] = true
    gameLogic(channel, note)
  } else {
    tapestry[note - 1] = false
  }
}

//-----------------------------------------------------
// puzzle logic
//-----------------------------------------------------

const gameStates = {
  "initial": "initial", // only 2 can move to active
  "active": "active", // 16 touch points make sound, 27 moves to puzzle
  "puzzle": "puzzle", // play notes in the right order to succeed
  "success": "success"
}

let currentGameState = gameStates.initial;
let melody = [
  [1, 60],
  [1, 61],
  [1, 62],
  [1, 63],
  [1, 60],
  [1, 61],
  [1, 62],
  [1, 63],
  [1, 60],
  [1, 61],
  [1, 62],
  [1, 63],
]

const gameLogic = (channel, note) => {

  switch (currentGameState) {
    case gameStates.initial:
      if (channel === 1 && note === 60) {
        currentGameState = gameStates.active
        sound.frequency = note * 10;
        sound.play()
        clearTimeout(soundTimer)
        soundTimer = setTimeout(() => {
          sound.stop()
        }, 500);
      }
      break;

    case gameStates.active:
      sound.frequency = (channel + note) * 10;
      sound.play()
      clearTimeout(soundTimer)
      soundTimer = setTimeout(() => {
        sound.stop()
      }, 500);

      if (channel === 7 && note === 60) {
        currentGameState = gameStates.puzzle;
        sound.frequency = note * 10;
        sound.play()
        clearTimeout(soundTimer)
        soundTimer = setTimeout(() => {
          sound.stop()
        }, 500);
      }
      break;

    case gameStates.puzzle:
      if (note < 17) {
        sound.frequency = note * 10;
        sound.play()
        clearTimeout(soundTimer)
        soundTimer = setTimeout(() => {
          sound.stop()
        }, 500);
      }

      const compare = lastTouched.slice(lastTouched.length - 12)

      if (JSON.stringify(compare) === JSON.stringify(melody)) {
        console.log('win');

        currentGameState = gameStates.success;
        setTimeout(() => {
          currentGameState = gameStates.initial;
        }, 3000);
      } else {
        console.log('keep trying');
      }
      break;

    case gameStates.success:

      break;

    default:
      break;
  }
}


//-----------------------------------------------------
// audio settings
//-----------------------------------------------------

import pizzicato from 'pizzicato';

const sound = new pizzicato.Sound({
  source: 'wave',
  options: {
    type: 'square'
  }
})

let soundTimer

// start by pressing church 27 plays file
// when active, piano plays
// 8 6 5
// bball court breaks cycle

//-----------------------------------------------------
//midi parsing
//-----------------------------------------------------

// var easymidi = require('easymidi');
import * as easymidi from "easymidi";

const inputAddresses = easymidi.getInputs();
const inputs = []

const vin = new easymidi.Input('virtualOut', true)

vin.on('noteon', msg => {

  console.log(msg);
  recordTouch(msg.channel, msg.note, true);

});

vin.on('noteoff', msg => {
  recordTouch(msg.channel, msg.note, false);
})

inputs.push(vin)


inputAddresses.forEach(address => {

  const input = new easymidi.Input(address);

  input.on('noteon', msg => {

    console.log(msg);
    recordTouch(msg.channel, msg.note, true);

  });

  input.on('noteoff', msg => {
    recordTouch(msg.channel, msg.note, false);
  })

  inputs.push(input)
})
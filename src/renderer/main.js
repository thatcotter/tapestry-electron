import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import midiInputs from './midiParsing'

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

// start by pressing church 27 plays file
// when active, piano plays
// 8 6 5
// bball court breaks cycle
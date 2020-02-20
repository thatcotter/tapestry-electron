import Vue from 'vue'
import axios from 'axios'

// @ts-ignore
import App from './App'
import router from './router'
import store from './store/store'
import * as path from 'path';
import {midiInputs} from './midiParsing'
import {logicManager} from './puzzle/logic-manager'

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
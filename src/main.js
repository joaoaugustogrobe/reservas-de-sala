import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import Datepicker from 'vuejs-datepicker';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
Vue.use(VueRouter)

const router = new VueRouter({routes:Routes})

/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)
*/

new Vue({
  el: '#app',
  render: h => h(App),
  comments: {
    "vuejs-datepicker": Datepicker
  },
  router: router
})

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Home from './components/Home.vue'
import Addblog from './components/Addblog.vue'


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)


const routes = [
  {path: '/', component: Login, name: 'login'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/signup', component: Signup},
  {path: '/home', component: Home, name: 'home'},
  {path: '/addblog', component: Addblog, name: 'addblog'},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

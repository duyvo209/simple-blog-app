import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

const routes = [
  {path: '/login', component: Login},
  {path: '/signup', component: Signup},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

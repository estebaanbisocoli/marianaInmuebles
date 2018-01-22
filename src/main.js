// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'

import router from './router'
import store from './store/index'
import firebase from 'firebase'
let app
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
Vue.config.productionTip = true
firebase.auth().onAuthStateChanged((user)=>{
  if (!app) {
    app = new Vue({
      el: '#app',
      router, store,
      template: '<App/>',
      components: { App },

    })
  }
})

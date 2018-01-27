import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import database from './database'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      database: database,
      user: user,
      shared: shared,


    }
  })
export default store
// export default new Vuex.Store({
//     state: {
//         inmuebles : [],
//         currentUser: ''
//     },
//     mutations: {
//         observarTodos(state, inmuebles) {
//             state.inmuebles = inmuebles
//         },
//         commitUser(state, usuario) {

//         }
//     },
//     getters: {
//         getInmuebles(state) {
//             return state.inmuebles
//         }
//     }

// })

import * as firebase from 'firebase'
export default {
    state: {
      user: null
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      }
    },
    actions: {
        singUserIn({commit}, payload) {
            console.log('entro')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
                console.log(user.uid)            
                 const  newUser = {
                  id: user.uid,
                  email: user.email
                }
                commit('setUser', newUser)
                this.loading = false
              })
              .catch(err => {
                
              })
 
        },
        logOut({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters : {
        user (state) {
            return state.user
        }
    }
}
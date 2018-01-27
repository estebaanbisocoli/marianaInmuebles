import firestore from './firestore'
export default {
    state: {
        errorFirebase: ''
    },
    mutations: {
        cleanError(state) {
            state.errorFirebase = {}
        },
        newError(state, error) {
            state.errorFirebase = error
        }
    },
    actions: {
        agregarInmueble({commit}, payload) {
            firestore.addInmueble(payload).then(doc => {
                commit('cleanError')
            }).catch(err => {
                commit('newError', err.message)
            })
        }
    }
}
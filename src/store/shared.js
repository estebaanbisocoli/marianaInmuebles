import firestore from './firestore'
import store from './index'

export default {
    state: {
        inmuebles : []

    },
    mutations: {
        observarInmuebles(state, inmuebles) {
            state.inmuebles = inmuebles
        },
    },
    getters: {
        getInmuebles(state) {
            return state.inmuebles
        }
    },
    actions: {
        addInmueble({commit}, payload) {
            firestore.addInmueble({calle: payload.calle, numero: payload.numero})
        }
    }

}
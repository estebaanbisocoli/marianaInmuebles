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
        },
        getInmueblesSinAlquilar(state) {
            let myArr = []
            const inmuebles = state.inmuebles
            for (var i = 0; i < state.inmuebles.length; i++ ) {
                if (inmuebles[i].estado === 'Libre') {
                    var dir = inmuebles[i].calle + ' ' + inmuebles[i].numero
                    var divider =true
                    if (i === (inmuebles.length - 1)) {
                        divider = false
                    }
                    myArr.push({direccion: dir, id: inmuebles[i].id, divider})
                }
            }
            return myArr
        }
    },
    actions: {
        addInmueble({commit}, payload) {
            firestore.addInmueble({calle: payload.calle, numero: payload.numero, estado : 'Libre', })
        }
    }

}
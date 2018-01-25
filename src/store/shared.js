import firestore from './firestore'
import store from './index'

const calcularRestante = (pagos, total) => {
    var  suma = 0
    pagos.forEach(pago => {
        total += pago.monto
    })
    return total - suma
}

export default {
    state: {
        inmuebles : [],
        inmuebleActual: {}

    },
    mutations: {
        observarInmuebles(state, inmuebles) {
            state.inmuebles = inmuebles
        },
        agregarInmuebles(state, payload) {
            state.inmuebles
        },
        agregarInmuebleActual(state, payload) {
            state.inmuebleActual = payload
        },
        agregarContratoActual(state, payload) {
            state.inmuebleActual.contrato = payload
        },
        agregarPagosActual(state,payload) {
            state.inmuebleActual.contrato.pagos = payload
        }
    },
    getters: {
        getInmuebles(state) {
            return state.inmuebles
        },
        getInmueblesConEstado(state) {
            let myArr = []
            const inmuebles = state.inmuebles
            for (var i = 0; i < inmuebles.length; i++) {
                var dir = inmuebles[i].calle + ' ' + inmuebles[i].numero
                if (inmuebles[i].estado === 'Libre') {
                    myArr.push({
                        direccion:dir,
                        id: inmuebles[i].id,
                        divider: true,
                        color: "red"
                    })
                } else if (inmuebles[i].estado === 'Alquilado') {
                    myArr.push({
                        direccion:dir,
                        id: inmuebles[i].id,
                        divider: true,
                        color: "blue"
                    })
                }
            }
            console.log(myArr)
            if (myArr.length !== 0) {
                myArr[myArr.length -1].divider = false
            }
            return myArr
        },
        getInmueblesSinAlquilar(state) {
            let myArr = []
            const inmuebles = state.inmuebles
            for (var i = 0; i < state.inmuebles.length; i++ ) {
                if (inmuebles[i].estado === 'Libre') {
                    var dir = inmuebles[i].calle + ' ' + inmuebles[i].numero
                    var divider =true
                    myArr.push({direccion: dir, id: inmuebles[i].id, divider})
                }
            }
            if(myArr.length !== 0) {
                myArr[myArr.length -1].divider = false
            }
            return myArr
        },
        getAlquiladosSelect(state) {
            let myArr = []
            const inmuebles = state.inmuebles
            for(var i = 0; i < inmuebles.length; i++) {
                if (inmuebles[i].estado === 'Alquilado') {
                    var dir = inmuebles[i].calle + ' ' + inmuebles[i].numero
                    myArr.push({direccion : dir, id: inmuebles[i].id})
                }
            }
            return myArr
        },
        getInmuebleInfo(state) {
            if (inmuebleActual) {
                return {
                        inquilino: state.inmuebleActual.nombre + ' ' + state.inmuebleActual.apellido,
                        monto: state.inmuebleActual.contrato.total,
                        restante: calcularRestante(state.inmuebleActual.contrato.pagos, state.inmuebleActual.contrato.total),
                        vencimiento: state.inmuebleActual.contrato.vencimiento,
                        mes: 100

                    }
                }
                else {
                    return {
                        inquilino: '',
                        monto: '',
                        restante: '',
                        vencimiento: '',
                        mes: 0
                    }
                }
        }

    
    },
    actions: {
        actualizarInmueble({commit}, idInmueble) {
            return firestore.getInmueble(idInmueble)
        },
        //payload : {idInmueble,idContrato}

        actualizarPagos({commit}, payload) {
            return firestore.getPagos(payload.idInmueble,payload.idContrato)
        },
        addInmueble({commit}, payload) {
            firestore.addInmueble({calle: payload.calle, numero: payload.numero, estado : 'Libre', })
        },
        addAlquiler({commit}, payload) {
            console.log(payload)
            return firestore.alquilarInmueble(payload.id, {
                estado: 'Valido',
                total: payload.total, 
                vencimiento: payload.vencimiento, 
                nombre: payload.nombre, 
                apellido: payload.apellido})
        },
        addPago({commit}, payload) {
            return firestore.nuevoPago(payload.id, payload.monto)
        },
        actualizarDescripcion({dispatch, commit}, idInmueble) {
            dispatch('actualizarInmueble', idInmueble).then(doc=> {
                commit('agregarInmuebleActual', {id: doc.id, ...doc.data()})
                firestore.getContratoValido(doc.id).then(querySnapshot => {
                   if (doc.data().estado == "Alquilado") {
                        commit('agregarContratoActual', {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()})
                        dispatch('actualizarPagos', {idInmueble: idInmueble, idContrato: querySnapshot.docs[0].id}).then(querySnapshot).then(querySnapshot => {
                            var myArr = []
                            querySnapshot.forEach(doc => {
                                myArr.push({id: doc.id, ...doc.data()})
                            })
                            commit('agregarPagosActual', myArr)
                        })
                   }
                })
            })
        }
 
    }

}
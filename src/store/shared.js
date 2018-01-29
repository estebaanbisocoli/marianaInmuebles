import firestore from './firestore'
import store from './index'
import _ from 'lodash'
const calcularRestante = (pagos, total) => {
    var  suma = 0
    if (pagos) {
        pagos.forEach(pago => {
            total += pago.monto
        })
    }
    return total - suma
}

export default {
    state: {
        inmuebles: [],
        inmuebleActual: null
    },
    mutations : {
        observarInmuebles(state, inmuebles) {
            state.inmuebles = inmuebles
        },
        seleccionarInmueble(state, id) {
            state.inmuebleActual =_.find(state.inmuebles, (obj) => {
                return obj.id === id
            })
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
       getInmuebleActualBasico(state) {
           if(state.inmuebleActual) {
                return {
                    direccion: state.inmuebleActual.calle + ' ' + state.inmuebleActual.numero,
                    estado: state.inmuebleActual.estado,
                }
           }
       },
       getDireccionActual(state) {
           if(state.inmuebleActual) {
           return {
               dir: state.inmuebleActual.calle + ' ' + state.inmuebleActual.numero,
               id: state.inmuebleActual.id,
           }
        }
       },
       getInmuebleActualInfo(state) {
           if (state.inmuebleActual === null) {
               return null
           } 
           else if (state.inmuebleActual.estado === 'Libre') {
               return {
                   estado : 'Libre'
               }
           }
           else {
               return {
                   inquilino: state.inmuebleActual.nombre + ' ' + state.inmuebleActual.apellido,
                   monto: state.inmuebleActual.total,
                   restante: calcularRestante(state.inmuebleActual.pagos, state.inmuebleActual.total),
                   vencimiento: state.inmuebleActual.vencimiento,
                   mes: 0
               }
           }
       }

    
    },
  
    // actions: {
    //     // actualizarInmueble({commit}, idInmueble) {
    //     //     return firestore.getInmueble(idInmueble)
    //     // },
    //     // //payload : {idInmueble,idContrato}

    //     // actualizarPagos({commit}, payload) {
    //     //     return firestore.getPagos(payload.idInmueble,payload.idContrato)
    //     // },
    //     // addInmueble({commit}, payload) {
    //     //     firestore.addInmueble({calle: payload.calle, numero: payload.numero, estado : 'Libre', })
    //     // },
    //     // addAlquiler({commit}, payload) {
    //     //     console.log(payload)
    //     //     return firestore.alquilarInmueble(payload.id, {
    //     //         estado: 'Valido',
    //     //         total: payload.total, 
    //     //         vencimiento: payload.vencimiento, 
    //     //         nombre: payload.nombre, 
    //     //         apellido: payload.apellido})
    //     // },
    //     // addPago({commit}, payload) {
    //     //     return firestore.nuevoPago(payload.id, payload.monto)
    //     // },

    // }

}
import * as firebase from 'firebase'
import store from './index'
require('firebase/firestore')
//Falta checkear que sean unicos, esto se puede hacer con alguna funcion de loadash chequeando uno por uno los valores en el store

firebase.initializeApp({    
    apiKey: "AIzaSyCD_bGrEc-DzMFsZZMYneugHexbOjaZuVo",
    authDomain: "mariana-b131c.firebaseapp.com",
    databaseURL: "https://mariana-b131c.firebaseio.com",
    projectId: "mariana-b131c",
    storageBucket: "mariana-b131c.appspot.com"
})
const firestore = firebase.firestore()

var inmuebles


firebase.auth().onAuthStateChanged(user => {
    console.log()
    if (firebase.auth().currentUser) {
        inmuebles = firestore.collection('inmuebles')
        inmuebles.onSnapshot(querySnapshot => {
            const misInmuebles = []          
            querySnapshot.forEach(doc => {
                const pagos = []
                inmuebles.doc(doc.id).collection('pagos').onSnapshot(querySnapshot=> {
                    querySnapshot.forEach(pago => {
                        if(pago) {
                            pagos.push({id: pago.id, ...pago.data()})
                        }
                    })
                    console.log(pagos)
                })
                misInmuebles.push({id: doc.id, ...doc.data(), pagos})

            })
            store.commit('observarInmuebles', misInmuebles)
        })
    }
})
const alquilarEstaddo = (idInmueble) => {
    return inmuebles.doc(idInmueble).update({estado: 'Alquilado'})
}
const alquilarInm = (id, infoAlquiler) => {
    return inmuebles.doc(id).update({
        total: infoAlquiler.total,
        vencimiento : infoAlquiler.vencimiento,
        nombre: infoAlquiler.nombre,
        apellido: infoAlquiler.apellido
    })
}

export default {
    fetchInmuebles: () => {
        return inmuebles.get()
    },

    addInmueble: inmueble => {
        return inmuebles.add({...inmueble, estado: 'Libre'})
    },
    removeInmueble: id => {
        return inmuebles.doc(id).delete()
    },
    updateInmueble: (id, obj) => {
        return inmuebles.doc(id).update(obj)
    },

    alquilarInmueble: (id, infoAlquiler) => {
         return alquilarEstaddo(id).then(doc => {
            return alquilarInm(id, infoAlquiler)
        })
    },
    getInmuebleId: (id) => {
        return inmuebles.doc(id).get()
    },

    nuevoPago : (id, monto) => {
        return inmuebles.doc(id).collection('pagos').add({monto, timestamp: new Date(Date.now())})
    },
    getInmueble: (id) => {
        return inmuebles.doc(id).get()
    },

    getPagos(idInmueble) {
        return inmuebles.doc(idInmueble).collection('pagos').get()
    },
    removePago(idInmueble,idPago) {
        return inmuebles.doc(idInmueble).collection('pagos').doc(idPago).delete()
    }


}
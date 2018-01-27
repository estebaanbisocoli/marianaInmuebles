import * as firebase from 'firebase'
import store from './index'
require('firebase/firestore')

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
                misInmuebles.push({id: doc.id, ...doc.data()}) 
               
            })
            
            store.commit('observarInmuebles', misInmuebles)
        })
  
    }
})


export default {
    fetchInmuebles: () => {
        return inmuebles.get()
    },

    addInmueble: inmueble => {
        return inmuebles.add(inmueble)
    },
    removeInmueble: id => {
        return inmuebles.doc(id).delete()
    },
    updateInmueble: (id, obj) => {
        return inmuebles.doc(id).update(obj)
    }, 
    alquilarInmueble: (id, infoAlquiler) => {
        cambiarEstado(id, 'Alquilado')
        return inmuebles.doc(id).set({comtrato: infoAlquiler})
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
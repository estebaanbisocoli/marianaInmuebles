import firebase from 'firebase'
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
    if (user) {
        var pagos
        inmuebles = firestore.collection('inmuebles')
        inmuebles.onSnapshot(querySnapshot => {
            const misInmuebles = []
            querySnapshot.forEach(doc => {
                var misPagos = []
                console.log(doc.data(), 'firestore doc')
                misInmuebles.push({id: doc.id, ...doc.data()})
                pagos = inmuebles.doc(doc.id).collection('pagos')
                pagos.onSnapshot(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.data(), 'pagos')
                    })
                })
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
        return inmuebles.add(inmueble).then(doc => {
            alert('El inmueble ha sido guardado con exito')
        }).catch(e=> {
            alert('Su conexion es muy lenta para guardar el inmueble')
        })
    },

    removeInmueble: id => {
        return inmuebles.doc(id).delete()
    },
    alquilarInmueble: (id, infoAlquiler) => {
        
    }
}
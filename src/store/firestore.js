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
const obtenerColeccion = (collection) => {
    var myArr = []
    collection.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            myArr.push({id : doc.id, ...doc.data()})
        })
    })
    return myArr
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var pagos
        inmuebles = firestore.collection('inmuebles')
        inmuebles.onSnapshot(querySnapshot => {
            const misInmuebles = []
            querySnapshot.forEach(doc => {
                var misPagos = []
                pagos = inmuebles.doc(doc.id).collection('pagos')
                misPagos = obtenerColeccion(pagos)
                var misContratos = []
                var contratos = inmuebles.doc(doc.id).collection('contratos')
                misContratos = obtenerColeccion(contratos)
                misInmuebles.push({id: doc.id, ...doc.data(), pagos: misPagos, contratos: misContratos})
                
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
    cambiarEstado: id => {
        inmuebles.doc(id).set({estado:'Alquilado'})
    },
    alquilarInmueble: (id, infoAlquiler) => {
        cambiarEstado(id)
        return inmuebles.doc(id).collection('contratos').add(infoAlquiler)
    },
    getInmuebleId: (id) => {
        return inmuebles.doc(id).get()
    }
}
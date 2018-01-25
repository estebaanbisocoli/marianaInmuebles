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
const obtenerColeccion = (collection) => {
    return new Promise(resolve => {
        collection.onSnapshot(querySnapshot => {
            const myArr = []
            querySnapshot.forEach(doc => {
             
                myArr.push({id : doc.id, ...doc.data()})
            })
            resolve(myArr)
        })
    })
     
}
var obtenerAsync = async (collection) => {
   var arr = await obtenerColeccion(collection)
   return arr
  
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var pagos
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
var cambiarEstado= (id, estado) => {
    inmuebles.doc(id).update({estado})
}
var getContratoValido = (id) => {
    
    return inmuebles.doc(id).collection('contratos').where("estado", "==", "Valido").get()

}
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
        cambiarEstado(id, 'Alquilado')
        return inmuebles.doc(id).collection('contratos').add(infoAlquiler)
    },
    getInmuebleId: (id) => {
        return inmuebles.doc(id).get()
    },

    nuevoPago : (id, monto) => {
       return getContratoValido(id).then(querySnapshot => {
           inmuebles.doc(id).collection('contratos').doc(querySnapshot.docs[0].id).collection('pagos').add({monto, timestamp: Date.now()})
       })
    },
    getInmueble: (id) => {
        return inmuebles.doc(id).get()
    },
    getContratoValido,
    getPagos(idInmueble, idContrato) {
        return inmuebles.doc(idInmueble).collection('contratos').doc(idContrato).collection('pagos').get()
    }


}
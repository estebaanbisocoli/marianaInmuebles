<template>
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex xs12 sm6 md4>
        <nuevo-inmueble></nuevo-inmueble>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <alquilar-inmueble></alquilar-inmueble>
      </v-flex>
    </v-layout>
    <nuevo-contrato></nuevo-contrato>
  </v-container>

</template>
<script>
import firebase from 'firebase'
import NuevoInmueble from './NuevoInmueble'
import AlquilarInmueble from './AlquilarInmueble'
import NuevoContrato from './NuevoContrato'
export default {
  name: 'inicio',
  components: {NuevoInmueble, AlquilarInmueble, NuevoContrato},
  data() {
    return {}
  },
  computed: {
    getshit() {
      return this.$store.getters.getInmuebles
    },
    user() {
      return this.$store.getters.user
    }
  },
    mounted() {
      if ((firebase.auth().currentUser !== null) && (firebase.auth().currentUser !== undefined) && (this.user == null)) {
        this.$store.commit('setUser', {id: firebase.auth().currentUser.uid, email: firebase.auth().currentUser.email})
      }
    
    }
} 

</script>

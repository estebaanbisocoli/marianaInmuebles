<template>
  <v-container grid-list-lg fill-height>
    <v-layout wrap fill-height>
      <v-flex xs12 sm6 md4 >
        <nuevo-inmueble></nuevo-inmueble>
      </v-flex>
      <v-flex xs12 sm6 lg4 v-show="show">
        <alquilar-inmueble></alquilar-inmueble>
      </v-flex>
      <v-flex xs12 sm6 lg4>
        <nuevo-pago></nuevo-pago>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import firebase from 'firebase'
import NuevoInmueble from './NuevoInmueble'
import AlquilarInmueble from './AlquilarInmueble'
import NuevoContrato from './NuevoContrato'
import NuevoPago from './NuevoPago'

export default {
  name: 'inicio',
  components: {NuevoInmueble, AlquilarInmueble, NuevoPago},
  data() {
    return {
      show: true
    }
  },
  watch: {
    items(value) {
      if (value.length === 0) 
        this.show = false
       else
        this.show = true
    }
  },
  computed: {
    items() {
            return this.$store.getters.getInmueblesSinAlquilar
        },
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

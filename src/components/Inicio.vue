<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 md4>
        <nuevo-inmueble></nuevo-inmueble>
      </v-flex>
    </v-layout>
      <span> {{getshit}}</span>
  </v-container>

</template>
<script>
import firebase from 'firebase'
import NuevoInmueble from './NuevoInmueble'
export default {
  name: 'inicio',
  components: {NuevoInmueble},
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

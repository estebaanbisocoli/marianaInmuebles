
<template>
    <v-container fill-height grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm4>
                <inmuebles altura="100vh"></inmuebles>
            </v-flex>
            <v-flex xs12 sm8>
                <v-layout column>
                    <v-flex xs12>
                        <descripcion></descripcion>
                    </v-flex>
                    <v-flex xs12>
                     
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

    </v-container>
   
</template>
<script>
import firebase from 'firebase'
import Descripcion from './Descripcion'
import Inmuebles from './Inmuebles'
export default {
    name: 'inicio-pagos',
    components: {Inmuebles, Descripcion},
    data() {
        return {
            
        }
    },
    mounted() {
        if (!this.$store.getters.user) {
            let currentUser = firebase.auth().currentUser
            this.$store.commit('setUser', {email: currentUser.email, uid: currentUser.uid})
        }
    }
  
    
}
</script>

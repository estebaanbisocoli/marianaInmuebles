<template>
<v-container grid-list-lg>
    <v-layout row>
        <h1>FirebaseTest</h1>
    </v-layout>
    <v-layout row>
        <v-flex xs4>
            <nuevo-inmueble-test></nuevo-inmueble-test>            
        </v-flex>
        <v-flex xs4>
            <eliminar-inmueble></eliminar-inmueble>
        </v-flex>
        
    </v-layout>
    {{inmuebles}}
</v-container>



</template>
<script>
import EliminarInmueble from './EliminarInmueble'
import NuevoInmuebleTest from './NuevoInmuebleTest'

export default {
    components: {NuevoInmuebleTest, EliminarInmueble},    
    data() {
        return {}
    },
    computed: {
        inmuebles(){return JSON.stringify(this.$store.getters.getInmuebles, undefined,2) }
    }
}
</script>


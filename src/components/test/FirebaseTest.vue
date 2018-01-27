<template>
<v-container>
    <v-layout row>
        <h1>FirebaseTest</h1>
    </v-layout>
    <v-layout row>
        <v-flex xs4>
            <nuevo-inmueble-test></nuevo-inmueble-test>            
        </v-flex>
    </v-layout>
</v-container>



</template>
<script>
import NuevoInmuebleTest from './NuevoInmuebleTest'
export default {
    components: {NuevoInmuebleTest},    
    data() {
        return {}
    }
}
</script>


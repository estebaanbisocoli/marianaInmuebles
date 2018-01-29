<template>
    <v-card flat>

     
        <v-flex xs12>
                <v-layout column class="lightgrey">
                    <v-flex xs12><h4>Inquilino</h4></v-flex>
                    <v-flex xs12>
                        <h5>{{alquiler.inquilino}}</h5>
                    </v-flex>
                </v-layout>
                <v-layout column>
                    <v-flex xs12><h4>Monto</h4></v-flex>
                    <v-flex xs12>
                        <h5>{{alquiler.monto}}</h5>
                    </v-flex>
                </v-layout>
                <v-layout column class="lightgrey">
                    <v-flex xs12><h4>Restante</h4></v-flex>
                    <v-flex xs12>
                        <h5>{{alquiler.restante}}</h5>
                    </v-flex>
                </v-layout>
                <v-layout column >
                    <v-flex xs12><h4>Vencimiento</h4></v-flex>
                    <v-flex xs12>
                        <h5>{{alquiler.vencimiento}}</h5>
                    </v-flex>
                </v-layout>
                <v-layout column class="lightgrey">
                    <v-flex xs12><h4>Este Mes</h4></v-flex>
                    <v-flex xs12>
                        <h5>{{alquiler.mes}}</h5>
                    </v-flex>
                </v-layout>
            </v-flex>
      

    </v-card>
</template>
<script>
import Alquilar from './Alquilar'
export default {
    components: {Alquilar},
    name: 'info-alquiler',
    data() {
        return {
            mostrar: 'Vacio',
            activar: false

        }   
    },
    computed: {
        alquiler() {
            return this.$store.getters.getInmuebleActualInfo
        }
    },
}
</script>

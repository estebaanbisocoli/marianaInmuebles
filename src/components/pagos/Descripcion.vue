<template>
    <v-card>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Descripcion</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn :disabled="disabled" flat dark><v-icon>home</v-icon></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-title v-if="inmuebleActual"><h3>{{inmuebleActual.direccion}}</h3><v-spacer></v-spacer><h3>{{inmuebleActual.estado}}</h3></v-card-title>
        <div v-if="!inmuebleActual">
            <h1>Seleccione un Inmueble</h1>
        </div>
        <div v-else-if="inmuebleActual.estado === 'Libre'">
            <v-btn block color="info" @click="activar = true" class="mt-0">Alquilar</v-btn>
            <alquilar :activar="activar" @cerrarDialogo="activar = false"></alquilar>
        </div>
        <div v-else>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <v-layout row m>
                <v-flex xs6>
                    <info-alquiler></info-alquiler>
                </v-flex>
                <v-flex xs6>
             
                </v-flex>
            </v-layout> 
        </v-card-text>
        </div>
    </v-card>
</template>
<script>
import InfoAlquiler from './InfoAlquiler'

import Alquilar from './Alquilar'
export default {
    components: {InfoAlquiler, Alquilar},
    name: 'descripcion',
    data() {
        return {
            disabled: true,
            direccion: 'Blegrano 1266',
            activar: false
        }
    },
    computed : {
        inmuebleActual() {
            return this.$store.getters.getInmuebleActualBasico
        },
        alquilre() {
            
        }
    }
}
</script>

<style>
.lightgrey {
    background-color: lightgrey;
    
}
</style>

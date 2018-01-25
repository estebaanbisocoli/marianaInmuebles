<template>
    <v-card>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Descripcion</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn :disabled="disabled" flat dark><v-icon>home</v-icon></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-title><h3>{{direccion}}</h3><v-spacer></v-spacer><h3>Alquilada</h3></v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <info-alquiler></info-alquiler>
        </v-card-text>
    </v-card>
</template>
<script>
import InfoAlquiler from './InfoAlquiler'
export default {
    components: {InfoAlquiler},
    name: 'descripcion',
    data() {
        return {
            disabled: true,
            direccion: 'Blegrano 1266'
        }
    },

}
</script>

<style>
.lightgrey {
    background-color: lightgrey;
    
}
</style>

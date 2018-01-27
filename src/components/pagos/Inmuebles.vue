<template>
<div>
    <nuevo-inmueble  :cambiarEstado="cambiarEstado" @cerrarDialogo="alternarEstado"></nuevo-inmueble>
    <v-card >
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Inmuebles</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn class="ml-0" flat dark @click="alternarEstado"><v-icon right>add</v-icon></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
        <v-list>
            <template v-for="item in items">
                <v-list-tile  avatar @click.stop="actualizar(item.id)" :disabled="loading" :key="item.id" >
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.direccion}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-icon :color="item.color">home</v-icon>
                </v-list-tile>
                <v-divider  v-if="item.divider" :key="item.id + ' '"></v-divider>
            </template>
        </v-list>
        </v-card-text>
    </v-card>
</div>
</template>
<script>
import NuevoInmueble from './NuevoInmueble'
export default {
    components: {NuevoInmueble},
    data() {
        return{
            cambiarEstado: false,
            loading: false
        }
    },
    computed: {
        items() {
            return this.$store.getters.getInmueblesConEstado
        }
    },
    methods: {
        alternarEstado() {
            this.cambiarEstado = !this.cambiarEstado
        },
        actualizar(id) {
            this.$store.commit('seleccionarInmueble', id)
        }
    }

}
</script>

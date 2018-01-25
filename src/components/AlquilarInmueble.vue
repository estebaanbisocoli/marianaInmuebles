<template>
    <v-card>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Sin Alquilar</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <template v-for="item in items">
                <v-list-tile avatar :key="item.id" @click="openDialog(item.id)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.direccion}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-icon>home</v-icon>
                </v-list-tile>
                <v-divider  v-if="item.divider"></v-divider>
               
            </template>
        </v-list>
        <nuevo-contrato @reset="idSelected= ''":itemId="idSelected"></nuevo-contrato>
    </v-card>
</template>
<script>
import NuevoContrato from './NuevoContrato'
export default {
    name: 'alquilar-inmueble',
    data() {
        return {
            idSelected : '',
            dialog: false
        }
    },
    methods: {
        openDialog(id) {
            this.idSelected = id,
            this.dialog = true
        }
    },

    computed: {
        items() {
            return this.$store.getters.getInmueblesSinAlquilar
        },
        
    },
    components: {NuevoContrato}
}
</script>

<template>
    <v-dialog v-model="dialog" persistent max-width="300px">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>{{direccion.dir}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs6>
                            <v-text-field
                                v-model="nombre"
                                label="Nombre"
                                name="nombre">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                v-model="apellido"
                                label="Apellido"
                                name="apellido">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                v-model="total"
                                label="Monto Total"
                                name="total"
                                type="number">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                v-model="vencimiento"
                                label="Vencimiento"
                                name="vencimiento">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout justify-space-around>
                        <v-flex xs6>
                            <v-btn color="info" :loading="loading" :disabled="loading" @click="alquilarInmueble">Alquilar</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn color="warning" @click="cerrar">Cerrar</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import firestore from '../../store/firestore'
export default {
    data() {
        return {
            dialog: false,
            total: '',
            vencimiento: '',
            nombre: '',
            apellido: '',
            loading: false
        }
    },
    props: ['activar'],
    computed: {
        direccion() {
            return this.$store.getters.getDireccionActual
        }
    },
    methods: {
        alquilarInmueble() {
            this.loading = true
            firestore.alquilarInmueble(this.direccion.id, {
                total: this.total,
                vencimiento: this.vencimiento,
                nombre: this.nombre,
                apellido: this.apellido
            }).then(doc => {
                this.loading = false
                this.$store.commit('seleccionarInmueble', this.direccion.id)
                this.cerrar()
            }).catch(err => {
                this.loading = false
                alert(err.message)
                this.cerrar()
            })
        },
        cerrar() {
            this.total = ''
            this.vencimiento = ''
            this.nombre = ''
            this.apellido = ''
            this.dialog = false
            this.$emit('cerrarDialogo')
        }
    },
    watch: {
        activar(value) {
            if (value) {
                this.dialog = true
            }
        }
    },

}
</script>


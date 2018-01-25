<template>
<v-dialog v-model="dialog" persistent max-width="300px">
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Nueva Propiedad</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
          <v-layout row>
            <v-flex xs12>
              <v-subheader v-text="'Domicilio'"></v-subheader>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field
                label="Calle"
                v-model="calle"
               
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                type="number"
                label="Numero"
               v-model="numero"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>


    <v-btn color="info"
      @click="submit"
    >
      Agregar
    </v-btn>
    <v-btn @click="close">
      Cerrar
    </v-btn>
 </v-card-text>
  </v-card>
  </v-dialog>
</template>
<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    name:'nuevo-inmueble',
    data: () => ({
      valid: true,
      numero: '',
      dialog: false,
      calle: '',

    }),
    methods: {
      submit () {
        if(Number(this.numero) && this.calle) {
 
          this.$store.dispatch('addInmueble',{numero: this.numero,
          calle: this.calle})

        this.close()
        }
      },
      close() {
          this.numero = ''
          this.calle = ''
          this.dialog = false,
          this.$emit('cerrarDialogo')
      }
    },
    computed: {
      nuevoEstado() {
        return this.cambiarEstado
      }
    },
    watch: {
      nuevoEstado(value) {
        if (value == true) {
          this.dialog = true
        }
        else {
          this.dialog = false
        }
      }
    },
    props: ['cambiarEstado']
  }
</script>
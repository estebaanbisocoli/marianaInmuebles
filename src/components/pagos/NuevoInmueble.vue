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
    :loading="loading"
    :disabled="loading"
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
  import firestore from '../../store/firestore'
  export default {
    name:'nuevo-inmueble',
    data: () => ({
      valid: true,
      numero: '',
      dialog: false,
      calle: '',
      loading: false

    }),
    methods: {
      submit () {
        if(Number(this.numero) && this.calle) {
          this.loading = true
          firestore.addInmueble({numero: this.numero,
          calle: this.calle}).then(doc => {
            this.loading = false
            this.close()
          }).catch(e => {
            this.loading = false
            alert(err.message)
            this.close
          })
        }
        else {
          alert('falta info')
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
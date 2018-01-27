<template>
  <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Eliminar Inmueble</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12><h4>Seleccione el Inmueble</h4></v-flex>
            <v-flex xs12>
                <v-select
                    v-model="select"
                    :items="alquileres"
                    item-text="calle"
                    item-value="id"></v-select>
            </v-flex>

                <v-btn color="info" @click="eliminar">Eliminar</v-btn>
            
            </v-layout>
          </v-container>
      </v-card-text>
  </v-card>
</template>
<script>
import firestore from './../../store/firestore'
export default {
    name: 'nuevo-pago',
  data() {
      return {
          select: '',
          monto: 0,
          loading: false
      }
  },
  computed: {
      alquileres() {
          return this.$store.getters.getInmuebles
      }
  },
  methods: {
      eliminar () {
          firestore.removeInmueble(this.select).then(doc => {
              alert('Se pudo elimnar el inmueble')
          }).catch(e => {
              alert(e.message)
          })
      }
    
      
  }

}
</script>

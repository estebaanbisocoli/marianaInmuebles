<template>
  <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Nuevo Pago</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12><h4>Seleccione el Inmueble</h4></v-flex>
            <v-flex xs12>
                <v-select
                    v-model="select"
                    :items="alquileres"
                    item-text="direccion"
                    item-value="id"></v-select>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    type="number"
                    label ="Ingrese Monto"
                    v-model="monto"
                    ></v-text-field>
            </v-flex>
            <v-flex>
                <v-btn color="info" :loading="loading" :disabled="loading" @click="cobrar">Cobrar</v-btn>
            </v-flex>
            </v-layout>
          </v-container>
      </v-card-text>
  </v-card>
</template>
<script>
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
          return this.$store.getters.getAlquiladosSelect
      }
  },
  methods: {
      cobrar () {
        this.loading = true
         this.$store.dispatch('addPago', {id: this.select, monto: this.monto}).then(doc => {
              alert('el pago fue agregado con exito')
               this.loading = false
           }).catch(e => {
               this.loading = false
        alert(e)})
      }
    
      
  }

}
</script>

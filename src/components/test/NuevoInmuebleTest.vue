<template>
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
 
 </v-card-text>
  </v-card>
</template>
<script>
 import firestore from '../../store/firestore'
  export default {
    name:'nuevo-inmueble',
    data: () => ({
      valid: true,
      numero: '',
  
      calle: '',

    }),
    methods: {
      submit () {
        if(Number(this.numero) && this.calle) {
          firestore.addInmueble({calle: this.calle, numero:this.numero})
          .then(doc => {
            alert('se agrego Inmueble')
          }).catch(e => {
            alert('no se pudo agregar inmueble')
          })
          this.numero = ''
          this.calle = ''
   
        }
      }
    },
    computed: {
      getInmueblesIndex () {
        return this.$store.getters.inmueblesIndex
      }
    }
  }
</script>
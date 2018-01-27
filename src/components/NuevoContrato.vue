<template>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="350px">
        <v-card>
  
            <v-toolbar color="primary" dark >
                <v-toolbar-title>{{calle}} {{numero}}</v-toolbar-title>
            </v-toolbar>
          <v-container grid-list-md class="pl-2 pr-2" v-show="!loading">
              <v-layout wrap>
                  <v-flex xs12 sm6>
                      <v-text-field
                        name="name"
                        label="Nombre del Inquilino"
                        v-model="nombre">
                        </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                      <v-text-field
                        v-model="apellido"
                        name="lastName"
                        label="Apellido">
                      </v-text-field>
                  </v-flex>
                  <v-flex x12 sm6>
                      <v-text-field
                      v-model="total"
                      name="monto"
                      label="Valor del Contrato"
                      type="number"></v-text-field>
                  </v-flex>
                  <v-flex x12 sm6>
                      <v-text-field
                        v-model="vencimiento"
                        name="vencimiento"
                        label="Vencimiento"
                        type="date">
                      </v-text-field>
                  </v-flex>
              </v-layout>
              <v-layout row>       
                      <v-btn :loading="btnLoad" :disabled="btnLoad" color="info" @click="alquilar()">Alquilar</v-btn>
                      <v-btn color="error" @click="limpiar">Cancelar</v-btn>
              </v-layout>
          </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import firestore from '../store/firestore'

  export default {
      name: 'nuevo-contrato',
     
    data () {
      return {
          calle: '',
          numero: '',
          loading : false,
          dialog: false,
          total: 0,
          vencimiento: '',
          nombre: '',
          apellido: '',
          btnLoad: false
      }
    },
    methods: {
        alquilar() {
            this.btnLoad = true
            firestore.alquilarInmueble({
                id: this.itemId,
                total: this.total,
                vencimiento: this.vencimiento,
                nombre: this.nombre,
                apellido: this.apellido
            }).then((doc)=>{
                this.btnLoad = false
                this.$emit('reset')
                this.limpiar()
            }).catch(e => {
                this.btnLoad = false
                alert('Ocurrio un error tratando de agregar')
                this.$emit('reset')
                this.limpiar()
            })
        },
        limpiar(){
          this.calle = ''
          this.numero = ''
          this.loading= false
          this.dialog = false
          this.total = 0
          this.vencimiento= ''
          this.nombre= '',
          this.apellido= '',
          this.btnLoad= false
        }
    },
    watch: {
        itemId(value) {
            if (value) {
                console.log(value)
                this.dialog=true
                this.loading=true
                firestore.getInmuebleId(value).then(doc => {
                    if (doc.exists) {
                        let data = doc.data()
                        this.calle = data.calle
                        this.numero = data.numero
                    }
                    this.loading = false
                }).catch(e=> {
                    alert('Ocurrio un error tratando de buscar el inmueble. Compruebe su conexion a internet ')
                })
                }
            else {
                this.dialog = false
            }
            },
            dialog(value) {
                if (!value) {
                    this.$emit('reset')
                    this.limpiar()
                }
            }
    },
    computed: {

    },
    props: ['itemId']
  }
</script>
<style>
    .loading {
        justify-content: center;
    }
</style>

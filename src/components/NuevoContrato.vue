<template>

  <v-layout row justify-center>
    <v-dialog v-model="dialog">
        <v-card>
            <v-container v-if="loading">
                <v-layout row justify-center>
                    <v-flex justify-space-around>
                        <circle8></circle8>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-toolbar v-else color="accent">
            <v-toolbar-title>{{calle}} {{numero}}</v-toolbar-title>
          </v-toolbar>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import firestore from '../store/firestore'
import {Circle8} from 'vue-loading-spinner'
  export default {
      name: 'nuevo-contrato',
      components : {Circle8},
    data () {
      return {
          dialog: false,
          calle: '',
          numero: '',
          loading : false
      }
    },
    watch: {
        itemId(value) {
            this.loading = true
            this.dialog = true
            firestore.getInmuebleId(value).then(doc => {
                if (doc.exists) {
                    let data = doc.data()
                    this.calle = data.calle
                    this.numero = data.numero
                }
                this.loading = false
            }).catch(e=> {
                console.log(e)
                this.loading = false
                this.dialog = false
            })
            }
    },
    computed: {

    },
    props: ['itemId']
  }
</script>

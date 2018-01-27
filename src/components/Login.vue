<template>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
            <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
            <v-spacer></v-spacer>

            </v-toolbar>
            <v-card-text>
            <v-form @submit.prevent="singIn">
                <v-text-field prepend-icon="person" name="login" label="Email" type="email" v-model="email"></v-text-field>
                <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password" v-model="password"></v-text-field>
                <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn :loading="loading" :disabled="loading" type="submit" color="primary">Ingresar</v-btn>
            </v-card-actions>
            </v-form>
            </v-card-text>

        </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: () => ({
      drawer: null,
      email: '',
      password: '',
      loading: false
    }),
    props: {
      source: String
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/firebaseTest')
        }
      }
    },
    methods: {
      singIn() {
        this.loading=true
        this.$store.dispatch('singUserIn', {email: this.email, password: this.password})
        
      }
    }
  }
</script>
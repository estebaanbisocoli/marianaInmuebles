<template>
  <v-app id="inspire">
    <v-navigation-drawer disable-resize-watcher floating fixed app v-model="drawer">
      <v-list>
        <v-list-tile @click="">
        <v-list-tile-action><v-icon>gavel</v-icon></v-list-tile-action>
        <v-list-tile-content>
          Pagos
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logOut" v-show="userIsAuthenticated">
          <v-list-tile-action><v-icon>close</v-icon></v-list-tile-action>
          <v-list-tile-content>Salir</v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon 
        @click.native.stop="drawer = !drawer"
        class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title >Alquileres</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items v-show="userIsAuthenticated">
        <v-btn class="hidden-sm-and-down"  color="white" flat><v-icon left>gavel</v-icon>Pagos</v-btn>
        <v-btn class="hidden-sm-and-down"  color="white" flat @click="logOut"><v-icon left>close</v-icon>Salir</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data: () => ({
      drawer: false
    }),
    props: {
      source: String
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('logOut')
        this.$router.push('login')
      }
    },
    watch: {
      user(value) {
        if (value === null || value === undefined) {
          this.$router.push('/login')
        }
      }
  }
  }
</script>
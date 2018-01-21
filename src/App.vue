<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn> -->
        <v-btn flat v-show="userIsAuthenticated" @click="logOut">Salir</v-btn>
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
      drawer: null
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
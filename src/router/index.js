import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/inicio'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/inicio',
      name: 'Inicio',
      component: Inicio,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  console.log(currentUser)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log(requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('inicio')
  else next()
})
export default router

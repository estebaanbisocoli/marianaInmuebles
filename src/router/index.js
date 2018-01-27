import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/inicio'
import Login from '@/components/Login'
import InicioPagos from '@/components/pagos/InicioPagos'
import firebase from 'firebase'
import FirebaseTest from '@/components/test/FirebaseTest'
Vue.use(Router)

let router = new Router({
  routes: [
       {
         path: '/firebaseTest',
         name: 'firebaseTest',
         component: FirebaseTest,
         meta: {
           requiresAuth: true
         }
       },
    // {
    //   path: '/pagos',
    //   name: 'Pagos',
    //   component: InicioPagos,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/inicio',
    //   name: 'Inicio',
    //   component: Inicio,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
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
  
  if (requiresAuth && !currentUser) {
    next('login')
  }
  else if (!requiresAuth && currentUser) next('firebaseTest')
  else {
    next()
    
  }
})
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/secured',
    name: 'Secured',
    meta: {
      isAuthenticated: true
    },
    component: () => import('../views/Secured.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    meta: {
      isAuthenticated: false
    },
    component: () => import('../views/Unauthorized.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuthenticated) {
    // Get the actual url of the app, it's needed for Keycloak
    const basePath = window.location.toString()
    if (!Vue.$keycloak.authenticated) {
      // The page is protected and the user is not authenticated. Force a login.
      Vue.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
    } else if (Vue.$keycloak.hasResourceRole('vue-demo-user')) {
      // The user was authenticated, and has the app role (is authorized). Update the token.
      Vue.$keycloak.updateToken(70)
        .then(() => {
          next()
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      // The user was authenticated, but did not have the correct role (is not authorized)
      // Redirect the user to an error page
      next({ name: 'Unauthorized' })
    }
  } else {
    // This page did not require authentication
    next()
  }
})

export default router

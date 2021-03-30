import Vue from 'vue'
import Keycloak from 'keycloak-js'

const options = {
  url: 'http://localhost:8001/auth/',
  realm: 'local-dev',
  clientId: 'vue-demo'
}

const _keycloak = Keycloak(options)

const Plugin = {
  install(Vue) {
    Vue.$keycloak = _keycloak
  }
}

Plugin.install = Vue => {
  Vue.$keycloak = _keycloak
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return _keycloak
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin

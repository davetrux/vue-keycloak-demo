<template>
  <div>
    <h1>Unauthorized</h1>
    <div>Hello {{ firstName }} {{ lastName }}</div>
    <div>Your account does not have access to that page.</div>
    <div><button @click="logout">Logout</button></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Unauthorized",
  data: function () {
    return {
      firstName: '',
      lastName: ''
    }
  },
  beforeMount() {
    this.firstName = Vue.$keycloak.tokenParsed.given_name
    this.lastName = Vue.$keycloak.tokenParsed.family_name
  },
  methods: {
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    }
  }
}
</script>

<style scoped>

</style>

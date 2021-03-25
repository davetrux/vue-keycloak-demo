<template>
  <div class="about">
    <h1>Secure Content</h1>
    <div>Hello {{ firstName }} {{ lastName }}</div>
    <div>This page is secured by Keycloak</div>
    <div><button @click="logout">Logout</button></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Secured',
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

 <style scoped lang="scss">

 </style>

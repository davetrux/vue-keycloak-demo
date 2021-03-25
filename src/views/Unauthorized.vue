<template>
  <div>
    <h1>Unauthorized</h1>
    <div>Your account does not have access to that resource</div>
    <div><button @click="logout">Logout</button></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Unauthorized",
  methods: {
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    }
  }
}
</script>

<style scoped>

</style>

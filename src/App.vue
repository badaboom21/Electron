<script setup>

</script>

<template>
  <ul uk-tab>
    <li><router-link to="/">Inscription</router-link></li>
    <li><router-link to="/login">Login</router-link></li>
    <li><router-link to="/articles">Articles</router-link></li>
  </ul>
  <router-view />
</template>

<style scoped>

</style>
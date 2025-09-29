<script setup>

  import {ref} from "vue";

  import log from 'electron-log/renderer';

  const movies = ref([]);
  async function callApi(){
    log.info('Renderer prêt');
    log.warn('Attention, message d’avertissement');
    log.error('Une erreur est survenue')
    //TODO : afficher un chargelent

    // Appeler l'api
    const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

    // récupérer le json
    const data = await res.json();

    // j'alimente la liste de films
    movies.value = data;

    console.log("callApi()");

    // TODO : Fermer le chargement
  }
</script>

<template>
  <h1> PageOne</h1>

  <button class="uk-button uk-button-primary" @click="callApi">Appeler l'api</button>

  <div v-for="movie in movies" :key="movie.title">
    {{ movie.title }}
  </div>
</template>


<style scoped>
</style>
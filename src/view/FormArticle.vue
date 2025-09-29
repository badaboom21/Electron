<template>
  <main class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <form @submit.prevent="save">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: pencil"></span>
              <input v-model="title" class="uk-input uk-border-pill" required placeholder="Titre" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: comments"></span>
              <input v-model="desc" class="uk-input uk-border-pill" required placeholder="Description" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="author" class="uk-input uk-border-pill" required placeholder="Auteur" type="text">
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">Enregistrer</button>
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center">
        <a @click="goToArticles" class="uk-link-reset uk-text-small">Retour à la liste</a>
      </div>
    </div>
  </main>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import log from "electron-log/renderer";

const route = useRoute();
const router = useRouter();
const article = ref(null);
const title = ref('');
const desc = ref('');
const author = ref('');
const id = ref('');

async function save() {
  try {
    const payload = {
      id : id.value,
      title: title.value,
      desc: desc.value,
      author: author.value
    };
    if (id.value) {
      payload.fieldfield = id.value;
    }
    const res = await fetch('http://localhost:3000/articles/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    log.info(res);
    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
    router.push({ name: 'Articles', path: `/articles` });
  } catch (error) {
    console.error('Erreur lors de la modification:', error);
  }
}

function goToArticles() {
  router.push({ name: 'Articles' });
}

onMounted(async () => {
  id.value = route.params.id;
  const appel = `http://localhost:3000/articles/${id.value}`;
  const res = await fetch(appel);
  const data = await res.json();
  article.value = data.data;
  title.value = article.value.title;
  desc.value = article.value.desc;
  author.value = article.value.author;

});

</script>

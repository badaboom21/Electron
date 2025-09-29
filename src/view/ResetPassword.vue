<template>
  <main class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <div v-if="password">
        <h1 class="uk-text-center">Nouveau mot de passe : {{password}}</h1>
      </div>
      <form @submit.prevent="register">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="Email" type="email">
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">Envoyer</button>
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center">
        <a @click="goToLogin" class="uk-link-reset uk-text-small">Revenir à la page login</a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import log from "electron-log/renderer";

const router = useRouter();
const email = ref('');
const password = ref('');

async function register() {
  try {
    const payload = {
      email: email.value,
    };
    const res = await fetch('http://localhost:3000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    log.info(res);
    const data = await res.json();
    log.info(data);
    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
    if(data.data){
      password.value = data.data;
    }
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
  }
}

function goToLogin() {
  router.push({ name: 'Login' });
}
</script>

<script setup>
import { ref } from "vue";
import log from "electron-log/renderer";
import { useRouter } from "vue-router";

const movies = ref([]);
const email = ref("");
const password = ref("");
const router = useRouter();

async function callApi() {
  const res = await fetch(
      "https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json"
  );
  const data = await res.json();
  movies.value = data;
  console.log("callApi()");
}

async function login() {
  log.info("Login : Connection...");

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      throw new Error("Erreur de connexion : " + res.status);
    }

    const data = await res.json();
    console.log("Réponse du serveur :", data);

    // si le backend retourne un token
    if (data.data) {
      log.info("Connexion réussie");
      log.info(data.data);
      localStorage.setItem("token", data.data);
      // Tu peux stocker le token dans localStorage ou un store
      await router.push("/articles");
    }else {
      log.info("Erreur de connexion : " + res.status);
    }

  } catch (err) {
    log.error("Login échoué :", err);
  }
}

function resetPassword() {
  router.push({ name: 'ResetPassword' });
}
</script>

<template>
  <body class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <!-- login -->
      <form class="toggle-class" @submit.prevent="login">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input
                  v-model="email"
                  class="uk-input uk-border-pill"
                  required
                  placeholder="Username"
                  type="text"
              />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input
                  v-model="password"
                  class="uk-input uk-border-pill"
                  required
                  placeholder="Password"
                  type="password"
              />
            </div>
          </div>
          <div class="uk-margin-small">
            <label><input class="uk-checkbox" type="checkbox"> Keep me logged in</label>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">
              LOGIN
            </button>
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center">
        <a @click="resetPassword" class="uk-link-reset uk-text-small">Mot de passe oublié</a>
      </div>
    </div>
  </body>
</template>

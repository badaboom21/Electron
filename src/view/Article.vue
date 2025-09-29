<script setup>
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
import log from "electron-log/renderer";

const route = useRoute();
const article = ref(null);
const router = useRouter();

async function supprimer(id) {
  log.info("Article : Suppression...");

  try {
    const appel = `http://localhost:3000/articles/${id}`;
    const res = await fetch(appel, {
      method: "DELETE",
    });

    if (res.status != 200) {
      throw new Error("Erreur de suppression : " + res.status);
    }

    const data = await res.json();
    console.log("Réponse du serveur :", data);

    await router.push("/articles");

  } catch (err) {
    log.error("Suppression échoué :", err);
  }
}

async function modifier(id) {
  log.info("Article : Modification...");

  await router.push(`/form-article/${id}`);
}

async function retourListes() {
  await router.push("/articles");
}

onMounted(async () => {
  const id = route.params.id;
  const appel = `http://localhost:3000/articles/${id}`;
  const res = await fetch(appel);
  const data = await res.json();
  article.value = data.data;
});
</script>

<template>
  <div v-if="article">
    <div>
      <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column">
        <div class="uk-card-header uk-text-center">
          <h4 class="uk-text-bold">{{article.title}}</h4>
        </div>
        <div class="uk-card-body uk-flex-1">
          <div class="uk-flex uk-flex-middle uk-flex-center">
									<span style="font-size: 4rem; font-weight: 200; line-height: 1em">
                    <img :src="article.imgPath" width="300" height="200" alt="Image Caption">
									</span>
          </div>
          <p class="uk-text-muted">
            Auteur : {{article.author}}
          </p>
          <p class="uk-text-muted">
            {{article.desc}}
          </p>
          <p>
            <button class="uk-button uk-button-danger" @click="supprimer(article.id)">Supprimer</button>
            <button class="uk-button uk-button-primary uk-margin-small-left" @click="modifier(article.id)" >Modifier</button>
            <button class="uk-button uk-button-secondary uk-margin-small-left" @click="retourListes()" >Retour</button>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

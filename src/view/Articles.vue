<script setup>
import { ref, onMounted } from "vue";
import log from "electron-log/renderer";
import { useRouter } from "vue-router";

const articles = ref([]);
const router = useRouter();

async function callApi() {
  log.info("Attention, récupération des articles");

  const res = await fetch(
      "http://localhost:3000/articles"
  );
  const data = await res.json();
  if(!data.data){
    log.error("Une erreur est survenue lors de la récupération des articles");
  }
  articles.value = data.data;
}

async function detailArticle(id) {
  await router.push(`/article/${id}`);
}
async function supprimer(id) {
  log.info("Article : Suppression...");

  try {
    const appel = `http://localhost:3000/articles/${id}`;
    const res = await fetch(appel, {
      method: "DELETE",
    });

    if (res.status != 200) {
      log.error("Erreur de suppression : " + res.status);
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

  await router.push(`/formArticle/${id}`);
}

onMounted(() => {
  callApi();
});
</script>

<template>
  <h1>Articles : </h1>
    <div v-for="article in articles" :key="article.title" class="uk-margin-small-bottom">
      <div>
        <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column">
          <div class="uk-card-header uk-text-center">
            <h4 class="uk-text-bold">{{article.title}}</h4>
          </div>
          <div class="uk-card-body uk-flex-1 uk-flex uk-flex-middle uk-flex-center">
            <p>
              <button class="uk-button uk-button-secondary"   @click="detailArticle(article.id)">Detail</button>
              <button class="uk-button uk-button-danger uk-margin-small-left" @click="supprimer(article.id)">Supprimer</button>
              <button class="uk-button uk-button-primary uk-margin-small-left" @click="modifier(article.id)" >Modifier</button>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from "../view/Login.vue";
import Articles from "../view/Articles.vue";
import Inscription from "../view/Inscription.vue";
import Article from "../view/Article.vue";
import FormArticle from "../view/FormArticle.vue";
import ResetPassword from "../view/ResetPassword.vue";

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/articles', name: 'Articles', component: Articles },
    { path: '/', name: 'Incription', component: Inscription },
    { path: '/article/:id', name: 'Article', component: Article },
    { path: '/form-article/:id', name: 'FormArticle', component: FormArticle },
    { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;
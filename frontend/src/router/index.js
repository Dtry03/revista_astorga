import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Article from "../views/Article.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import ArticleForm from "../views/ArticleForm.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/articulo/:slug", component: Article },
  { path: "/admin", component: AdminLogin },
  { path: "/admin/dashboard", component: AdminDashboard },
  { path: "/admin/articulos/nuevo", component: ArticleForm },
  { path: "/admin/articulos/:id", component: ArticleForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import ArticlePage from "../views/ArticlePage.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import ArticleForm from "../views/ArticleForm.vue";
import Category from "../views/Category.vue";
import ZonaOn from "../views/ZonaOn.vue"
import Tendency from "../views/Tendency.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/articulo/:slug",name: "article",component: ArticlePage, },
  { path: "/admin", component: AdminLogin },
  { path: "/admin/dashboard", component: AdminDashboard },
  { path: "/admin/articulos/nuevo", component: ArticleForm },
  { path: "/admin/articulos/:id", component: ArticleForm },
  {path: "/categoria/:slug", component: Category},
  { path: "/zonaon/", component: ZonaOn },
  { path: "/tendency/", component: Tendency }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
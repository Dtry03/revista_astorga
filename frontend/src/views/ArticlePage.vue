<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getArticleBySlug } from "../services/articlesApi";

import ArticleNormal from "./ArticleNormal.vue";
import ArticleZonaOn from "./ArticleZonaOn.vue";
import ArticleTendencias from "./ArticleTendencias.vue";

const route = useRoute();

const article = ref(null);
const loading = ref(true);
const error = ref("");

const selectedTemplate = computed(() => {
  const template = article.value?.article_template || "normal";

  if (template === "zonaon") {
    return ArticleZonaOn;
  }

  if (template === "tendencias") {
    return ArticleTendencias;
  }

  return ArticleNormal;
});

async function loadArticleTemplate(slug) {
  if (!slug) {
    error.value = "No se encontró la noticia.";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = "";
  article.value = null;

  try {
    article.value = await getArticleBySlug(slug);
  } catch (err) {
    console.error(err);
    error.value = "No se pudo cargar la noticia.";
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.slug,
  (slug) => {
    loadArticleTemplate(String(slug || ""));
  },
  { immediate: true }
);
</script>

<template>
  <main
    v-if="loading"
    class="min-h-screen bg-white flex items-center justify-center px-4 text-center text-stone-500"
  >
    Cargando noticia...
  </main>

  <main
    v-else-if="error"
    class="min-h-screen bg-white flex items-center justify-center px-4 text-center text-[#B70041] font-bold"
  >
    {{ error }}
  </main>

  <component
    v-else
    :is="selectedTemplate"
    :key="`${route.params.slug}-${article?.article_template || 'normal'}`"
  />
</template>
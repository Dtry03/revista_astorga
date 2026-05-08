<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const articles = ref([]);

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/api/articles");
  articles.value = response.data.filter(article => article.status === "published");
});
</script>

<template>
  <main class="min-h-screen bg-[#f5efe7]">
    <section class="bg-stone-950 text-white py-16 px-6 text-center">
      <p class="uppercase tracking-[0.3em] text-sm text-yellow-500">
        Revista digital
      </p>

      <h1 class="text-5xl md:text-7xl font-bold mt-4">
        Astorga al día
      </h1>

      <p class="text-stone-300 mt-5 max-w-2xl mx-auto text-lg">
        Noticias, cultura, eventos y vida local de Astorga y la comarca.
      </p>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-3 gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-2xl overflow-hidden shadow"
        >
          <img
            :src="article.cover_image"
            class="h-48 w-full object-cover"
          />

          <div class="p-6">
            <p class="text-sm uppercase text-yellow-700 font-bold">
              {{ article.category }}
            </p>

            <h2 class="text-2xl font-bold mt-2">
              {{ article.title }}
            </h2>

            <p class="text-stone-600 mt-3">
              {{ article.excerpt }}
            </p>

            <router-link
              :to="`/articulo/${article.slug}`"
              class="inline-block mt-5 bg-stone-950 text-white px-5 py-3 rounded-lg"
            >
              Leer artículo
            </router-link>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
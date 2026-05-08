<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const article = ref(null);

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:3000/api/articles/${route.params.slug}`
  );

  article.value = response.data;
});
</script>

<template>
  <main v-if="article" class="min-h-screen bg-[#f5efe7]">
    <img
      :src="article.cover_image"
      class="h-[420px] w-full object-cover"
    />

    <section class="max-w-3xl mx-auto bg-white -mt-20 relative z-10 p-8 rounded-2xl shadow">
      <p class="text-yellow-700 font-bold uppercase">
        {{ article.category }}
      </p>

      <h1 class="text-4xl font-bold mt-3">
        {{ article.title }}
      </h1>

      <p class="text-stone-500 mt-4">
        {{ article.excerpt }}
      </p>

      <div class="prose max-w-none mt-8 whitespace-pre-line">
        {{ article.content }}
      </div>
    </section>
  </main>
</template>
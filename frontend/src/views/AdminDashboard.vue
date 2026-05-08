<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const articles = ref([]);

async function loadArticles() {
  const response = await axios.get("http://localhost:3000/api/articles");
  articles.value = response.data;
}

async function deleteArticle(id) {
  await axios.delete(`http://localhost:3000/api/articles/${id}`);
  loadArticles();
}

onMounted(loadArticles);
</script>

<template>
  <main class="min-h-screen bg-[#f5efe7] px-6 py-10">
    <section class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold">
            Panel de control
          </h1>

          <p class="text-stone-600">
            Gestiona los artículos de la revista.
          </p>
        </div>

        <router-link
          to="/admin/articulos/nuevo"
          class="bg-stone-950 text-white px-5 py-3 rounded-lg"
        >
          Nuevo artículo
        </router-link>
      </div>

      <div class="bg-white rounded-2xl shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-stone-950 text-white">
            <tr>
              <th class="p-4 text-left">Título</th>
              <th class="p-4 text-left">Categoría</th>
              <th class="p-4 text-left">Estado</th>
              <th class="p-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="article in articles"
              :key="article.id"
              class="border-b"
            >
              <td class="p-4 font-bold">
                {{ article.title }}
              </td>

              <td class="p-4">
                {{ article.category }}
              </td>

              <td class="p-4">
                {{ article.status }}
              </td>

              <td class="p-4 flex gap-3">
                <router-link
                  :to="`/admin/articulos/${article.id}`"
                  class="text-blue-600"
                >
                  Editar
                </router-link>

                <button
                  @click="deleteArticle(article.id)"
                  class="text-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
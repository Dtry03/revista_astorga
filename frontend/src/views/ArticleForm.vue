<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const form = reactive({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  status: "draft",
});

function generateSlug() {
  form.slug = form.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function saveArticle() {
  await axios.post("http://localhost:3000/api/articles", form);
  router.push("/admin/dashboard");
}
</script>

<template>
  <main class="min-h-screen bg-[#f5efe7] px-6 py-10">
    <section class="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 class="text-4xl font-bold mb-8">
        Nuevo artículo
      </h1>

      <label class="font-bold">Título</label>
      <input
        v-model="form.title"
        @input="generateSlug"
        class="w-full border p-3 rounded-lg mt-2 mb-5"
      />

      <label class="font-bold">Slug</label>
      <input
        v-model="form.slug"
        class="w-full border p-3 rounded-lg mt-2 mb-5"
      />

      <label class="font-bold">Extracto</label>
      <textarea
        v-model="form.excerpt"
        class="w-full border p-3 rounded-lg mt-2 mb-5"
      ></textarea>

      <label class="font-bold">Categoría</label>
      <input
        v-model="form.category"
        class="w-full border p-3 rounded-lg mt-2 mb-5"
        placeholder="Cultura, eventos, gastronomía..."
      />

      <label class="font-bold">URL imagen portada</label>
      <input
        v-model="form.cover_image"
        class="w-full border p-3 rounded-lg mt-2 mb-5"
        placeholder="https://..."
      />

      <label class="font-bold">Contenido</label>
      <textarea
        v-model="form.content"
        rows="10"
        class="w-full border p-3 rounded-lg mt-2 mb-5"
      ></textarea>

      <label class="font-bold">Estado</label>
      <select
        v-model="form.status"
        class="w-full border p-3 rounded-lg mt-2 mb-8"
      >
        <option value="draft">Borrador</option>
        <option value="published">Publicado</option>
      </select>

      <button
        @click="saveArticle"
        class="bg-stone-950 text-white px-6 py-3 rounded-lg"
      >
        Guardar artículo
      </button>
    </section>
  </main>
</template>
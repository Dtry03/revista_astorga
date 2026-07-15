<script setup>
import { ref } from "vue";

const file = ref(null);
const loading = ref(false);
const error = ref("");
const uploadedUrl = ref("");
const copied = ref(false);

function handleFileChange(event) {
  file.value = event.target.files?.[0] || null;
  error.value = "";
  uploadedUrl.value = "";
}

async function uploadImage() {
  if (!file.value) {
    error.value = "Selecciona una imagen.";
    return;
  }

  loading.value = true;
  error.value = "";
  uploadedUrl.value = "";

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Error al subir la imagen.");
    }

    uploadedUrl.value = json.data.url;
  } catch (err) {
    console.error(err);
    error.value = err.message || "Error al subir la imagen.";
  } finally {
    loading.value = false;
  }
}

async function copyUrl() {
  if (!uploadedUrl.value) return;

  await navigator.clipboard.writeText(uploadedUrl.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1200);
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <div class="mb-6">
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">
            Subir imagen
          </h1>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Sube una imagen y copia la URL generada para usarla en noticias o publicidad.
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
              Imagen
            </label>

            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-900 focus:outline-none p-3"
              @change="handleFileChange"
            />
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-[#B70041] px-5 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
            @click="uploadImage"
          >
            {{ loading ? "Subiendo..." : "Subir imagen" }}
          </button>

          <div
            v-if="error"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
          >
            {{ error }}
          </div>

          <div
            v-if="uploadedUrl"
            class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4"
          >
            <p class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
              URL generada:
            </p>

            <div class="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-mono break-all text-gray-800 dark:text-gray-100">
              {{ uploadedUrl }}
            </div>

            <div class="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                class="rounded-xl bg-gray-900 dark:bg-white px-4 py-2 text-sm font-bold text-white dark:text-gray-900 hover:opacity-90"
                @click="copyUrl"
              >
                {{ copied ? "Copiada" : "Copiar URL" }}
              </button>

              <a
                :href="uploadedUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Abrir imagen
              </a>
            </div>

            <img
              :src="uploadedUrl"
              alt="Vista previa"
              class="mt-5 max-h-[360px] w-full object-contain rounded-xl border border-gray-200 dark:border-gray-700 bg-white"
            />
          </div>
        </div>
      </div>

      <div class="mt-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
        <h2 class="font-black text-gray-900 dark:text-white">
          Cómo usarla
        </h2>

        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Copia la URL generada y pégala en el campo de imagen de una noticia o en la URL de imagen de un anuncio.
        </p>
      </div>
    </div>
  </div>
</template>

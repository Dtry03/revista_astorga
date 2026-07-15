<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  AdminForthResourceColumnCommon,
  AdminForthResourceCommon,
  AdminUser,
} from "@/types/Common";

const props = defineProps<{
  column: AdminForthResourceColumnCommon;
  record: any;
  meta: any;
  resource: AdminForthResourceCommon;
  adminUser: AdminUser;
  readonly: boolean;
}>();

const emit = defineEmits([
  "update:value",
  "update:inValidity",
  "update:emptiness",
]);

const loading = ref(false);
const error = ref("");

const currentValue = computed(() => {
  return props.record?.[props.column.name] || "";
});

function onManualUrlInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;

  emit("update:value", value);
  emit("update:emptiness", !value);
  emit("update:inValidity", false);
}

async function uploadImage(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  loading.value = true;
  error.value = "";

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Error al subir la imagen.");
    }

    const url = json.data.url;

    emit("update:value", url);
    emit("update:emptiness", false);
    emit("update:inValidity", false);
  } catch (err: any) {
    console.error(err);
    error.value = err?.message || "Error al subir la imagen.";
    emit("update:inValidity", error.value);
  } finally {
    loading.value = false;
    input.value = "";
  }
}

function clearImage() {
  emit("update:value", "");
  emit("update:emptiness", true);
  emit("update:inValidity", false);
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-if="currentValue"
      class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3"
    >
      <img
        :src="currentValue"
        alt="Vista previa"
        class="max-h-[260px] w-full object-contain rounded-lg bg-white border border-gray-200 dark:border-gray-700"
      />

      <div class="mt-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-mono break-all text-gray-700 dark:text-gray-200">
        {{ currentValue }}
      </div>
    </div>

    <div>
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
        Subir imagen
      </label>

      <input
        type="file"
        accept="image/*"
        :disabled="readonly || loading"
        class="block w-full text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-900 focus:outline-none p-3 disabled:opacity-50"
        @change="uploadImage"
      />

      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
        JPG, PNG, WEBP o GIF. Máximo 5MB.
      </p>
    </div>

    <div>
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
        URL de imagen
      </label>

      <input
        type="text"
        :value="currentValue"
        :readonly="readonly"
        placeholder="/uploads/imagen.jpg"
        class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none"
        @input="onManualUrlInput"
      />
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        :disabled="readonly || loading"
        class="rounded-xl bg-[#B70041] px-4 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
        @click="clearImage"
      >
        Quitar imagen
      </button>

      <a
        v-if="currentValue"
        :href="currentValue"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Abrir imagen
      </a>
    </div>

    <p
      v-if="loading"
      class="text-sm font-bold text-gray-500 dark:text-gray-400"
    >
      Subiendo imagen...
    </p>

    <p
      v-if="error"
      class="text-sm font-bold text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>

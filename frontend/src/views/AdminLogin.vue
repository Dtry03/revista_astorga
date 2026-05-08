<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function login() {
  router.push("/admin/dashboard");
}
</script>

<template>
  <main class="min-h-screen bg-stone-950 flex items-center justify-center px-6">
    <div class="bg-white p-8 rounded-2xl shadow max-w-md w-full">
      <h1 class="text-3xl font-bold">
        Panel de la revista
      </h1>

      <p class="text-stone-500 mt-2">
        Acceso privado para gestionar artículos.
      </p>

      <input
        class="w-full border p-3 rounded-lg mt-6"
        placeholder="Email"
      />

      <input
        class="w-full border p-3 rounded-lg mt-4"
        placeholder="Contraseña"
        type="password"
      />

      <button
        @click="login"
        class="w-full bg-stone-950 text-white py-3 rounded-lg mt-6"
      >
        Entrar al panel
      </button>
    </div>
  </main>
</template>
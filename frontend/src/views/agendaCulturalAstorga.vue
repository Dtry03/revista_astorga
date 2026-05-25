<script setup>
import { ref } from "vue";

const article = ref({
  title: "Astorga prepara una gran agenda cultural para este verano",
  slug: "agenda-cultural-astorga",
  category: "Cultura",
  excerpt:
    "La ciudad refuerza su programación con conciertos, actividades familiares, propuestas gastronómicas y eventos pensados para dinamizar el centro y atraer visitantes.",
  cover_image:
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop",
  content: `Astorga afronta los próximos meses con una programación cultural pensada para vecinos, visitantes y negocios locales.

La agenda incluirá conciertos, actividades para familias, propuestas gastronómicas, visitas culturales y eventos al aire libre.

El objetivo es reforzar la vida en el centro, aumentar la afluencia de público y dar mayor visibilidad al comercio local.

Desde la organización destacan que la cultura puede ser una herramienta clave para generar movimiento en la ciudad y mejorar la experiencia turística.`,
});
</script>

<template>
  <main v-if="article" class="bg-[#f7f4ef] min-h-screen">
    <section class="relative h-[55vh] overflow-hidden">
      <img :src="article.cover_image" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/55"></div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-end pb-16 text-white">
        <p class="uppercase tracking-[0.25em] text-sm font-black text-[#d6a24c]">
          {{ article.category }}
        </p>

        <h1 class="text-5xl md:text-7xl font-black leading-tight mt-4">
          {{ article.title }}
        </h1>

        <p class="text-xl text-stone-200 mt-6 max-w-3xl">
          {{ article.excerpt }}
        </p>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-6 py-16">
      <div class="bg-white p-10 md:p-14 shadow-xl">
        <div class="flex items-center gap-4 text-sm text-stone-500 border-b pb-6 mb-10">
          <span>Astorga al Día</span>
          <span>•</span>
          <span>Actualidad</span>
        </div>

        <article class="text-xl leading-[2] text-stone-700 whitespace-pre-line">
          {{ article.content }}
        </article>
      </div>
    </section>
  </main>
</template>
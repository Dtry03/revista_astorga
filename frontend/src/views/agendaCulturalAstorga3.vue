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
  <main v-if="article" class="bg-[#0d0d0d] text-white min-h-screen">
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <img :src="article.cover_image" class="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black"></div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <p class="uppercase tracking-[0.35em] text-sm font-black text-[#b3203d]">
          {{ article.category }}
        </p>

        <h1 class="text-5xl md:text-8xl font-black leading-none mt-6">
          {{ article.title }}
        </h1>

        <p class="text-2xl text-stone-300 mt-10 max-w-3xl leading-relaxed">
          {{ article.excerpt }}
        </p>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-6 py-24">
      <article class="text-xl leading-[2.1] text-stone-300 whitespace-pre-line">
        {{ article.content }}
      </article>
    </section>
  </main>
</template>
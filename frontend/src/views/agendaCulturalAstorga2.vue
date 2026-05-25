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
  <main v-if="article" class="bg-[#faf8f5] text-stone-900">
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p class="uppercase text-sm tracking-[0.3em] font-black text-[#7a1628]">
            {{ article.category }}
          </p>

          <h1 class="text-5xl md:text-7xl font-black leading-[0.95] mt-5">
            {{ article.title }}
          </h1>

          <p class="text-xl text-stone-600 mt-8 leading-relaxed">
            {{ article.excerpt }}
          </p>

          <div class="flex items-center gap-4 mt-10 text-sm text-stone-500">
            <div class="w-12 h-[2px] bg-[#7a1628]"></div>
            <span>Astorga al Día</span>
          </div>
        </div>

        <img :src="article.cover_image" class="w-full h-[650px] object-cover rounded-[2rem]" />
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-6 pb-24">
      <article class="text-xl leading-[2] text-stone-700 font-light whitespace-pre-line">
        {{ article.content }}
      </article>
    </section>
  </main>
</template>
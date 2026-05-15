<script setup>
import { ref, computed } from "vue";

const articles = ref([
  {
    id: 1,
    title: "Astorga prepara una gran agenda cultural para este verano",
    slug: "agenda-cultural-astorga",
    excerpt:
      "La ciudad apuesta por conciertos, actividades gastronómicas y eventos turísticos para impulsar el comercio local durante los próximos meses.",
    category: "Cultura",
    cover_image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop",
    status: "published",
  },

  {
    id: 2,
    title: "Los comercios locales apuestan por digitalizar sus negocios",
    slug: "comercios-digitalizacion",
    excerpt:
      "Cada vez más negocios de la comarca comienzan a invertir en presencia digital y nuevas formas de captar clientes.",
    category: "Economía",
    cover_image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    status: "published",
  },

  {
    id: 3,
    title: "La gastronomía maragata gana protagonismo en redes sociales",
    slug: "gastronomia-maragata-redes",
    excerpt:
      "Restaurantes y cafeterías de Astorga aumentan su presencia online para atraer turismo y reservas.",
    category: "Gastronomía",
    cover_image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    status: "published",
  },

  {
    id: 4,
    title: "Nuevas rutas de senderismo impulsan el turismo rural",
    slug: "senderismo-turismo-rural",
    excerpt:
      "La comarca busca potenciar el turismo natural con nuevas experiencias para visitantes.",
    category: "Turismo",
    cover_image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    status: "published",
  },

  {
    id: 5,
    title: "Astorga mejora su programación de eventos deportivos",
    slug: "eventos-deportivos-astorga",
    excerpt:
      "Las nuevas iniciativas buscan atraer visitantes y dinamizar la actividad local.",
    category: "Deporte",
    cover_image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
    status: "published",
  },

  {
    id: 6,
    title: "El comercio nocturno aumenta la actividad en el centro",
    slug: "comercio-nocturno-centro",
    excerpt:
      "Locales y tiendas comienzan nuevas campañas para revitalizar el centro histórico.",
    category: "Actualidad",
    cover_image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    status: "published",
  },

  {
    id: 7,
    title: "La artesanía local busca nuevas oportunidades digitales",
    slug: "artesania-oportunidades",
    excerpt:
      "Pequeños talleres y artesanos exploran nuevas plataformas para vender sus productos.",
    category: "Economía",
    cover_image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    status: "published",
  },
]);

const mainArticle = computed(() => articles.value[0]);
const secondaryArticles = computed(() => articles.value.slice(1, 5));
const restArticles = computed(() => articles.value.slice(5));
</script>

<template>
  <main class="min-h-screen bg-[#f7f4ef] text-[#1a1a1a]">

    <!-- TOPBAR -->
    <header class="border-b border-stone-300 bg-white">
      <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <div class="flex items-center gap-4">
          <span class="w-3 h-3 rounded-full bg-[#6e0f1d]"></span>

          <p class="uppercase tracking-[0.25em] text-xs font-bold text-stone-500">
            Revista digital
          </p>
        </div>

        <router-link
          to="/admin"
          class="text-sm font-semibold hover:text-[#6e0f1d] transition"
        >
          Redacción
        </router-link>

      </div>
    </header>

    <!-- LOGO -->
    <section class="bg-white border-b border-stone-300">
      <div class="max-w-7xl mx-auto px-6 py-10 text-center">

        <h1 class="text-5xl md:text-7xl font-black tracking-tight text-[#6e0f1d]">
          ASTORGA AL DÍA
        </h1>

        <p class="mt-4 text-stone-600 text-lg">
          Noticias, cultura y actualidad de Astorga y la comarca
        </p>

      </div>
    </section>

    <!-- MAIN NEWS -->
    <section
      v-if="mainArticle"
      class="max-w-7xl mx-auto px-6 py-10"
    >
      <div class="grid lg:grid-cols-[1.6fr_1fr] gap-10">

        <!-- PRINCIPAL -->
        <article>

          <img
            :src="mainArticle.cover_image"
            class="w-full h-[450px] object-cover"
          />

          <div class="mt-6">

            <p class="uppercase text-sm font-black tracking-[0.25em] text-[#6e0f1d]">
              {{ mainArticle.category }}
            </p>

            <h2 class="text-4xl md:text-6xl font-black leading-tight mt-4">
              {{ mainArticle.title }}
            </h2>

            <p class="text-stone-600 text-lg mt-5 leading-relaxed">
              {{ mainArticle.excerpt }}
            </p>

            <router-link
              :to="`/articulo/${mainArticle.slug}`"
              class="inline-block mt-7 border-b-4 border-[#6e0f1d] font-black text-lg"
            >
              LEER NOTICIA
            </router-link>

          </div>

        </article>

        <!-- LATERAL -->
        <div class="space-y-8">

          <article
            v-for="article in secondaryArticles"
            :key="article.id"
            class="border-b border-stone-300 pb-8"
          >

            <div class="grid grid-cols-[140px_1fr] gap-5">

              <img
                :src="article.cover_image"
                class="w-full h-28 object-cover"
              />

              <div>

                <p class="uppercase text-xs font-black tracking-[0.2em] text-[#6e0f1d]">
                  {{ article.category }}
                </p>

                <h3 class="text-xl font-black leading-tight mt-2">
                  {{ article.title }}
                </h3>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="inline-block mt-3 text-sm font-bold hover:text-[#6e0f1d]"
                >
                  Leer más →
                </router-link>

              </div>

            </div>

          </article>

        </div>

      </div>
    </section>

    <!-- MÁS NOTICIAS -->
   <!-- CUADRÍCULA EDITORIAL -->
<section
  v-if="restArticles.length"
  class="max-w-7xl mx-auto px-6 pb-20"
>

  <div class="flex items-center gap-4 mb-10">

    <div class="w-12 h-[3px] bg-[#6e0f1d]"></div>

    <h2 class="text-3xl font-black uppercase">
      Actualidad
    </h2>

  </div>

  <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">

    <article
      v-for="article in restArticles"
      :key="article.id"
      class="group"
    >

      <div class="overflow-hidden">

        <img
          :src="article.cover_image"
          class="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
        />

      </div>

      <div class="pt-5">

        <p class="uppercase text-xs font-black tracking-[0.2em] text-[#6e0f1d]">
          {{ article.category }}
        </p>

        <h3 class="text-2xl font-black leading-tight mt-3 group-hover:text-[#6e0f1d] transition">
          {{ article.title }}
        </h3>

        <p class="text-stone-600 mt-4 leading-relaxed line-clamp-3">
          {{ article.excerpt }}
        </p>

        <router-link
          :to="`/articulo/${article.slug}`"
          class="inline-block mt-5 text-sm font-black uppercase tracking-[0.15em] border-b-2 border-[#6e0f1d]"
        >
          Leer noticia
        </router-link>

      </div>

    </article>

  </div>

</section>

    <!-- FOOTER -->
    <footer class="bg-[#111111] text-white">

      <div class="max-w-7xl mx-auto px-6 py-12">

        <h3 class="text-3xl font-black text-[#a61d35]">
          ASTORGA AL DÍA
        </h3>

        <p class="text-stone-400 mt-4 max-w-xl">
          Revista digital local enfocada en actualidad, cultura,
          eventos y vida de la comarca.
        </p>

        <div class="border-t border-white/10 mt-10 pt-6 text-sm text-stone-500">
          Demo editorial desarrollada para presentación comercial.
        </div>

      </div>

    </footer>

  </main>
</template>
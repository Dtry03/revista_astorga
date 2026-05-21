<script setup>
import { ref, computed } from "vue";

const mobileMenu = ref(false);

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
  <main class="min-h-screen bg-white text-[#1a1a1a]">
    <section class="bg-white w-full max-w-7xl mx-auto">

      <!-- LOGO -->
      <section>
        <div class="px-4 py-3 text-center flex items-center justify-center">
          <img
            src="../assets/logo.png"
            alt="logo Horizonte León"
            class="w-44 sm:w-56 md:w-60 h-auto"
          />
        </div>
      </section>
<!-- MENU -->
<header class="border-y border-stone-300 bg-white sticky top-0 z-50">

  <!-- DESKTOP -->
  <nav
    class="hidden md:flex max-w-5xl mx-auto px-6 py-3 items-center justify-between text-stone-500"
  >
    <a href="#" class="hover:text-[#6e0f1d]">Actualidad</a>
    <a href="#" class="hover:text-[#6e0f1d]">Bierzo</a>
    <a href="#" class="hover:text-[#6e0f1d]">Astorga - La Bañeza</a>
    <a href="#" class="hover:text-[#6e0f1d]">León</a>
    <a href="#" class="hover:text-[#6e0f1d]">Sucesos</a>
    <a href="#" class="hover:text-[#6e0f1d]">Cultura</a>
    <a href="#" class="hover:text-[#6e0f1d]">Deportes</a>
    <a href="#" class="hover:text-[#6e0f1d]">Opinión</a>
  </nav>

  <!-- MOBILE -->
  <div class="md:hidden">

    <!-- TOP BAR -->
    <div class="flex items-center justify-between px-4 py-4">

      <span class="font-black uppercase tracking-[0.2em] text-sm">
        Menú
      </span>

      <button
        @click="mobileMenu = !mobileMenu"
        class="flex flex-col gap-1"
      >

        <span
          class="w-6 h-[2px] bg-black transition"
        ></span>

        <span
          class="w-6 h-[2px] bg-black transition"
        ></span>

        <span
          class="w-6 h-[2px] bg-black transition"
        ></span>

      </button>

    </div>

    <!-- DROPDOWN -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >

      <nav
        v-if="mobileMenu"
        class="border-t border-stone-200 px-4 pb-4 flex flex-col bg-white"
      >

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          Actualidad
        </a>

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          Bierzo
        </a>

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          Astorga - La Bañeza
        </a>

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          León
        </a>

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          Sucesos
        </a>

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          Cultura
        </a>

        <a href="#" class="py-3 border-b border-stone-100 hover:text-[#6e0f1d]">
          Deportes
        </a>

        <a href="#" class="py-3 hover:text-[#6e0f1d]">
          Opinión
        </a>

      </nav>

    </transition>

  </div>

</header>

      <!-- MAIN NEWS -->
      <section v-if="mainArticle" class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div class="flex flex-col gap-8 sm:gap-10">

          <!-- PRINCIPAL -->
          <article>
            <img
              :src="mainArticle.cover_image"
              class="w-full h-64 sm:h-80 md:h-[450px] object-cover"
            />

            <div class="mt-3">
              <router-link
                :to="`/articulo/${mainArticle.slug}`"
                class="block text-2xl sm:text-3xl md:text-4xl font-black leading-tight hover:underline"
              >
                {{ mainArticle.title }}
              </router-link>

              <p class="uppercase text-[10px] mt-3 font-black tracking-[0.25em] text-[#6e0f1d]">
                {{ mainArticle.category }}
              </p>

              <p class="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
                {{ mainArticle.excerpt }}
              </p>
            </div>
          </article>

          <!-- NOTICIAS SECUNDARIAS -->
          <div class="space-y-6 sm:space-y-8 border-t border-stone-300 pt-6 sm:pt-8">
            <article
              v-for="article in secondaryArticles"
              :key="article.id"
              class="border-b border-stone-300 pb-6 sm:pb-8"
            >
              <div class="grid grid-cols-1 sm:grid-cols-[220px_1fr] md:grid-cols-[240px_1fr] gap-4 sm:gap-5">
                <img
                  :src="article.cover_image"
                  class="w-full h-48 sm:h-32 md:h-28 object-cover"
                />

                <div>
                  <p class="uppercase text-[10px] font-black tracking-[0.2em] text-[#6e0f1d]">
                    {{ article.category }}
                  </p>

                  <h3 class="text-xl sm:text-2xl font-semibold leading-tight mt-2">
                    {{ article.title }}
                  </h3>

                  <p class="text-sm text-stone-600 leading-relaxed mt-2">
                    {{ article.excerpt }}
                  </p>

                  <router-link
                    :to="`/articulo/${article.slug}`"
                    class="inline-block mt-3 text-sm text-stone-500 underline hover:no-underline"
                  >
                    Leer más
                  </router-link>
                </div>
              </div>
            </article>
          </div>

        </div>
      </section>

      <!-- MÁS NOTICIAS -->
      <section
        v-if="restArticles.length"
        class="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20"
      >
        <div class="flex items-center gap-4 mb-8 sm:mb-10">
          <div class="w-10 sm:w-12 h-[3px] bg-[#6e0f1d]"></div>

          <h2 class="text-2xl sm:text-3xl font-black uppercase">
            Actualidad
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-14">
          <article
            v-for="article in restArticles"
            :key="article.id"
            class="group"
          >
            <div class="overflow-hidden">
              <img
                :src="article.cover_image"
                class="w-full h-56 sm:h-60 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div class="pt-4 sm:pt-5">
              <p class="uppercase text-[10px] font-black tracking-[0.2em] text-[#6e0f1d]">
                {{ article.category }}
              </p>

              <router-link
                :to="`/articulo/${article.slug}`"
                class="block text-xl sm:text-2xl font-semibold leading-tight mt-3 transition hover:underline"
              >
                {{ article.title }}
              </router-link>

              <p class="text-stone-600 mt-3 sm:mt-4 leading-relaxed line-clamp-3">
                {{ article.excerpt }}
              </p>
            </div>
          </article>
        </div>
      </section>

    </section>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";

import {
  Smartphone,
  Newspaper,
  MessageSquareText,
  MessageSquareHeart,
  Share2,
  CircleUserRound,
} from "lucide-vue-next";

const menuOpen = ref(false);

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
  <main class="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center border-stone-300 bg-white sticky top-0 z-50">
      <nav class="bg-[#B70041] flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center text-stone-500">
        <div class="flex w-full max-w-5xl justify-center gap-4 sm:gap-6 md:gap-16 text-white text-[12px] sm:text-[13px] md:text-[16px]">
          <a href="/categoria/leon" class="hover:underline whitespace-nowrap">León</a>
          <a href="/categoria/ponferrada" class="hover:underline whitespace-nowrap">Ponferrada</a>
          <a href="/categoria/astorga" class="hover:underline whitespace-nowrap">Astorga</a>
          <a href="/categoria/baneza" class="hover:underline whitespace-nowrap">Bañeza</a>
        </div>
      </nav>

      <div class="bg-white w-full mx-auto py-3 sm:py-5">
        <div class="w-full max-w-5xl mx-auto grid grid-cols-[38px_1fr_38px] sm:grid-cols-[52px_1fr_52px] items-center px-3 sm:px-6">
          <div class="flex items-center justify-start">
            <button
              @click="menuOpen = !menuOpen"
              class="flex flex-col gap-1.5"
              aria-label="Abrir menú"
            >
              <span class="w-6 h-0.5 bg-[#B70041]"></span>
              <span class="w-6 h-0.5 bg-[#B70041]"></span>
              <span class="w-6 h-0.5 bg-[#B70041]"></span>
            </button>
          </div>

          <div class="flex text-center items-center justify-center gap-1 sm:gap-2 min-w-0">
            <img
              src="../assets/logo-imagen.png"
              alt="logo Horizonte León"
              class="w-40 md:w-72 shrink-0"
            />

            <img
              src="../assets/logo.png"
              alt="logo Horizonte León"
              class="w-40  md:w-60 shrink-0"
            />
          </div>

          <div class="flex justify-end items-center">
            <CircleUserRound
              :stroke-width="1.5"
              class="w-7 h-7 sm:w-8 sm:h-8 text-[#B70041] hover:scale-105 transition"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center w-full max-w-5xl gap-3 sm:gap-5 text-white text-[13px] md:text-[16px] py-2 px-4 overflow-hidden">
        <Smartphone class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#B70041] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <Newspaper class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#B70041] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <MessageSquareText class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#B70041] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <MessageSquareHeart class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#B70041] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <Share2 class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#B70041] hover:scale-105 transition shrink-0" />
      </div>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="menuOpen"
          class="w-full bg-white border-t border-[#B70041]/20"
        >
          <nav class="flex flex-col justify-center items-center">
            <p class="text-sm md:text-md border-b text-[#B70041] font-bold border-[#B70041]/40 lg:max-w-4xl w-full py-2 px-4">
              Secciones
            </p>

            <router-link
              to="/categoria/leon"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              León
            </router-link>

            <router-link
              to="/categoria/ponferrada"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Ponferrada
            </router-link>

            <router-link
              to="/categoria/astorga"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Astorga
            </router-link>

            <router-link
              to="/categoria/baneza"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Bañeza
            </router-link>

            <router-link
              to="/categoria/deportes"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Deportes
            </router-link>

            <router-link
              to="/categoria/motor"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Motor
            </router-link>

            <router-link
              to="/zonaon/"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Zona<span class="font-bold">ON</span>
            </router-link>

            <router-link
              to="/tendency/"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              #tendencias
            </router-link>

            <router-link
              to="/categoria/tablon"
              class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041]"
              @click="menuOpen = false"
            >
              Tablón
            </router-link>
          </nav>
        </div>
      </transition>

      <div>
        <p class="text-[8px] sm:text-[9px] md:text-[10px] py-2 px-3 text-center font-bold">
          INFORMACIÓN SIN LIMITES.
          <span class="text-[#B70041]">CONECTAMOS CONTIGO</span>
        </p>
      </div>
    </header>

    <!-- PUBLICIDAD BILLBOARD 970x250 -->
    <section class="w-full px-3 sm:px-4 py-4 sm:py-5 overflow-hidden">
      <div class="max-w-[970px] mx-auto w-full">
        <div class="w-full aspect-[970/250] min-h-[86px] sm:min-h-[110px] md:min-h-[120px] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400 px-4 overflow-hidden">
          <span class="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1 sm:mb-2">
            Publicidad
          </span>
          <span class="text-lg sm:text-xl md:text-3xl font-light tracking-[0.12em] sm:tracking-[0.15em]">
            970 x 250
          </span>
          <span class="text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] mt-1">
            Billboard
          </span>
        </div>
      </div>
    </section>

    <!-- CONTENIDO + SIDEBAR PUBLICIDAD -->
    <section class="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-10 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden">
      <!-- COLUMNA PRINCIPAL -->
      <div class="min-w-0">
        <!-- NOTICIA PRINCIPAL -->
        <article v-if="mainArticle" class="min-w-0">
          <img
            :src="mainArticle.cover_image"
            :alt="mainArticle.title"
            class="w-full h-56 sm:h-80 md:h-[450px] object-cover"
          />

          <div class="mt-3 min-w-0">
            <router-link
              :to="`/articulo/${mainArticle.slug}`"
              class="block text-xl sm:text-3xl md:text-4xl font-black leading-tight md:leading-[1.05] text-left hyphens-auto max-w-[65ch] hover:underline break-words"
            >
              {{ mainArticle.title }}
            </router-link>

            <p class="uppercase text-[11px] sm:text-[14px] mt-2 tracking-[0.2em] sm:tracking-[0.25em] text-[#B70041]">
              {{ mainArticle.category }}
            </p>

            <p class="text-stone-600 mt-2 leading-relaxed text-[14px] md:text-[15px] md:text-justify text-left hyphens-auto max-w-[65ch]">
              {{ mainArticle.excerpt }}
            </p>
          </div>
        </article>

        <!-- PUBLICIDAD LEADERBOARD 728x90 -->
        <div class="w-full flex justify-center my-8 overflow-hidden">
          <div class="w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400 px-4 overflow-hidden">
            <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-base sm:text-lg md:text-2xl font-light tracking-[0.12em] sm:tracking-[0.15em]">
              728 x 90
            </span>
            <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em]">
              Leaderboard
            </span>
          </div>
        </div>

        <!-- PUBLICIDAD RECTÁNGULO MÓVIL 336x280 -->
        <div class="lg:hidden w-full flex justify-center mb-8 overflow-hidden">
          <div class="w-full max-w-[336px] aspect-[336/280] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400 px-4 overflow-hidden">
            <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-lg sm:text-xl font-light tracking-[0.12em] sm:tracking-[0.15em]">
              336 x 280
            </span>
            <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em]">
              Rectángulo
            </span>
          </div>
        </div>

        <!-- NOTICIAS SECUNDARIAS -->
        <div class="space-y-6 sm:space-y-8 border-t border-[#B70041]/30 pt-6 sm:pt-8">
          <template
            v-for="(article, index) in secondaryArticles"
            :key="article.id"
          >
            <article class="border-b border-[#B70041]/30 pb-6 sm:pb-8 min-w-0">
              <div class="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)] gap-4 sm:gap-5">
                <img
                  :src="article.cover_image"
                  :alt="article.title"
                  class="w-full h-52 sm:h-32 md:h-32 object-cover"
                />

                <div class="min-w-0">
                  <router-link
                    :to="`/articulo/${article.slug}`"
                    class="block text-xl sm:text-2xl font-semibold leading-tight hover:underline break-words"
                  >
                    {{ article.title }}
                  </router-link>

                  <p class="uppercase text-[10px] tracking-[0.2em] mt-2 text-[#B70041]">
                    {{ article.category }}
                  </p>

                  <p class="text-sm text-stone-600 leading-relaxed mt-2">
                    {{ article.excerpt }}
                  </p>
                </div>
              </div>
            </article>

            <!-- PUBLICIDAD LEADERBOARD ENTRE NOTICIAS -->
            <div
              v-if="index === 1"
              class="w-full flex justify-center py-3 overflow-hidden"
            >
              <div class="w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400 px-4 overflow-hidden">
                <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                  Publicidad
                </span>
                <span class="text-base sm:text-lg md:text-2xl font-light tracking-[0.12em] sm:tracking-[0.15em]">
                  728 x 90
                </span>
                <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em]">
                  Leaderboard
                </span>
              </div>
            </div>
          </template>
        </div>

        <!-- RESTO DE ARTÍCULOS / CUADRÍCULA -->
        <section
          v-if="restArticles.length"
          class="pt-10 min-w-0"
        >
          <div class="border-b-2 border-[#B70041] mb-6 flex items-center gap-2">
            <span class="w-3 h-3 bg-[#B70041] shrink-0"></span>
            <h2 class="text-xl font-bold text-[#B70041]">
              Más actualidad
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <template
              v-for="(article, index) in restArticles"
              :key="article.id"
            >
              <article class="border-b border-[#B70041]/30 pb-6 min-w-0">
                <router-link :to="`/articulo/${article.slug}`">
                  <img
                    :src="article.cover_image"
                    :alt="article.title"
                    class="w-full h-48 sm:h-44 object-cover"
                  />

                  <h3 class="text-xl font-black leading-tight mt-3 hover:underline break-words">
                    {{ article.title }}
                  </h3>
                </router-link>

                <p class="uppercase text-[10px] tracking-[0.2em] mt-2 text-[#B70041]">
                  {{ article.category }}
                </p>

                <p class="text-sm text-stone-600 leading-relaxed mt-2">
                  {{ article.excerpt }}
                </p>
              </article>

              <!-- PUBLICIDAD RECTÁNGULO 336x280 ENTRE BLOQUES -->
              <div
                v-if="index === 1"
                class="sm:col-span-2 w-full flex justify-center py-4 overflow-hidden"
              >
                <div class="w-full max-w-[336px] aspect-[336/280] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400 px-4 overflow-hidden">
                  <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                    Publicidad
                  </span>
                  <span class="text-lg sm:text-xl font-light tracking-[0.12em] sm:tracking-[0.15em]">
                    336 x 280
                  </span>
                  <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em]">
                    Rectángulo
                  </span>
                </div>
              </div>
            </template>
          </div>
        </section>
      </div>

      <!-- SIDEBAR DERECHA PUBLICIDAD -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- 300x250 ROBAPÁGINAS -->
          <div class="w-[300px] h-[250px] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400">
            <span class="text-[9px] uppercase tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-2xl font-light tracking-[0.15em]">
              300 x 250
            </span>
            <span class="text-[10px] uppercase tracking-[0.25em]">
              Robapáginas
            </span>
          </div>

          <!-- LO MÁS LEÍDO -->
          <div>
            <h3 class="font-bold border-b-2 border-[#B70041] text-[#B70041] pb-2 mb-3">
              Lo más leído
            </h3>

            <ol class="space-y-4">
              <li
                v-for="(article, index) in articles.slice(0, 5)"
                :key="article.id"
                class="grid grid-cols-[30px_minmax(0,1fr)] gap-3"
              >
                <span class="text-[#B70041] font-black">
                  {{ index + 1 }}
                </span>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="text-sm font-bold leading-tight hover:underline break-words"
                >
                  {{ article.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <!-- 300x600 HALF PAGE -->
          <div class="w-[300px] h-[600px] bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400">
            <span class="text-[9px] uppercase tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-2xl font-light tracking-[0.15em]">
              300 x 600
            </span>
            <span class="text-[10px] uppercase tracking-[0.25em]">
              Half Page
            </span>
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>
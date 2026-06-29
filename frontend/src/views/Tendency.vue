<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import {
  Smartphone,
  Newspaper,
  MessageSquareText,
  MessageSquareHeart,
  Share2,
  CircleUserRound,
} from "lucide-vue-next";

const menuOpen = ref(false);

const route = useRoute();

const articles = [
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
];

const categoryName = computed(() => {
  return route.params.slug
    ? String(route.params.slug).replaceAll("-", " ")
    : "tendencias";
});

const mainArticle = computed(() => articles[0]);
const listArticles = computed(() => articles.slice(1));
</script>

<template>
  <main class="min-h-screen bg-[#08080D] text-white overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center border-[#281325] bg-[#0D0D14] sticky top-0 z-50">
      <nav class="bg-[#B70041] flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center overflow-hidden">
        <div class="flex w-full max-w-5xl justify-center gap-4 sm:gap-6 md:gap-16 text-white text-[12px] sm:text-[13px] md:text-[16px]">
          <a href="/categoria/leon" class="hover:underline whitespace-nowrap">León</a>
          <a href="/categoria/ponferrada" class="hover:underline whitespace-nowrap">Ponferrada</a>
          <a href="/categoria/astorga" class="hover:underline whitespace-nowrap">Astorga</a>
          <a href="/categoria/baneza" class="hover:underline whitespace-nowrap">Bañeza</a>
        </div>
      </nav>

      <div class="bg-[#0D0D14] w-full mx-auto">
        <div class="w-full max-w-5xl mx-auto grid grid-cols-[38px_minmax(0,1fr)_38px] sm:grid-cols-[56px_minmax(0,1fr)_56px] items-center px-3 sm:px-6 py-4 sm:py-5">
          <div class="flex items-center justify-start">
            <button
              @click="menuOpen = !menuOpen"
              class="flex flex-col gap-1.5"
              aria-label="Abrir menú"
            >
              <span class="w-6 h-0.5 bg-[#FF2BD6]"></span>
              <span class="w-6 h-0.5 bg-[#00F5FF]"></span>
              <span class="w-6 h-0.5 bg-[#FF2BD6]"></span>
            </button>
          </div>

          <div class="flex text-center items-center justify-center min-w-0">
            <p class="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#B70041] leading-none whitespace-nowrap">
              #tendencias
            </p>
          </div>

          <div class="flex justify-end items-center">
            <CircleUserRound
              :stroke-width="1.5"
              class="w-7 h-7 sm:w-8 sm:h-8 text-[#00F5FF] hover:scale-105 transition shrink-0"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center w-full max-w-5xl gap-3 sm:gap-5 text-white text-[13px] md:text-[16px] py-2 px-4 overflow-hidden">
        <Smartphone class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00F5FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#FF2BD6] shrink-0" />

        <Newspaper class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00F5FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#FF2BD6] shrink-0" />

        <MessageSquareText class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00F5FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#FF2BD6] shrink-0" />

        <MessageSquareHeart class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00F5FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#FF2BD6] shrink-0" />

        <Share2 class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00F5FF] hover:scale-105 transition shrink-0" />
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
          class="w-full bg-[#0D0D14] border-t border-[#281325]"
        >
          <nav class="flex flex-col justify-center items-center">
            <p class="text-sm md:text-md border-b text-[#00F5FF] font-bold border-[#FF2BD6]/40 lg:max-w-4xl w-full py-2 px-4">
              Secciones
            </p>

            <router-link
              to="/categoria/leon"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              León
            </router-link>

            <router-link
              to="/categoria/ponferrada"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Ponferrada
            </router-link>

            <router-link
              to="/categoria/astorga"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Astorga
            </router-link>

            <router-link
              to="/categoria/baneza"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Bañeza
            </router-link>

            <router-link
              to="/categoria/deportes"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Deportes
            </router-link>

            <router-link
              to="/categoria/motor"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Motor
            </router-link>

            <router-link
              to="/zonaon/"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Zona<span class="font-bold">ON</span>
            </router-link>

            <router-link
              to="/tendency/"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4  "
              @click="menuOpen = false"
            >
              #tendencias
            </router-link>

            <router-link
              to="/categoria/tablon"
              class="text-sm md:text-[16px] border-b border-[#FF2BD6]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#FF2BD6] text-white"
              @click="menuOpen = false"
            >
              Tablón
            </router-link>
          </nav>
        </div>
      </transition>

      <div>
        <p class="text-[8px] sm:text-[9px] md:text-[10px] py-2 px-3 text-center font-bold text-[#00F5FF]">
          INFORMACIÓN SIN LIMITES.
          <span class="text-[#FF2BD6]">CONECTAMOS CONTIGO</span>
        </p>
      </div>
    </header>

    <!-- PUBLICIDAD BILLBOARD 970x250 -->
    <section class="w-full px-3 sm:px-4 py-4 sm:py-5 overflow-hidden">
      <div class="max-w-[970px] mx-auto w-full">
        <div class="w-full aspect-[970/250] min-h-[86px] sm:min-h-[110px] md:min-h-[120px] bg-[#12121C] border border-[#FF2BD6]/35 flex flex-col items-center justify-center text-[#C9D6FF] px-4 rounded-2xl overflow-hidden">
          <span class="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1 sm:mb-2">
            Publicidad
          </span>
          <span class="text-lg sm:text-xl md:text-3xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#00F5FF]">
            970 x 250
          </span>
          <span class="text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] mt-1 text-[#FF2BD6]">
            Billboard
          </span>
        </div>
      </div>
    </section>

    <!-- CONTENEDOR PRINCIPAL -->
    <section class="max-w-6xl mx-auto px-3 sm:px-4 pb-16 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden">
      <!-- COLUMNA IZQUIERDA -->
      <div class="min-w-0">
        <div class="border-b-2 border-[#FF2BD6] mb-5 flex items-center gap-2">
          <span class="w-3 h-3 bg-[#00F5FF] shrink-0"></span>
          <h2 class="text-lg sm:text-xl font-black capitalize text-white break-words">
            #{{ categoryName }}
          </h2>
        </div>

        <!-- PUBLICIDAD LEADERBOARD 728x90 -->
        <div class="w-full flex justify-center mb-7 overflow-hidden">
          <div class="w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px] bg-[#12121C] border border-[#00F5FF]/35 flex flex-col items-center justify-center text-[#C9D6FF] px-4 rounded-2xl overflow-hidden">
            <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-base sm:text-lg md:text-2xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#00F5FF]">
              728 x 90
            </span>
            <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#FF2BD6]">
              Leaderboard
            </span>
          </div>
        </div>

        <!-- NOTICIA PRINCIPAL -->
        <article v-if="mainArticle" class="mb-8 overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#FF2BD6]/35 bg-[#12121C] min-w-0">
          <router-link :to="`/articulo/${mainArticle.slug}`" class="block">
            <img
              :src="mainArticle.cover_image"
              :alt="mainArticle.title"
              class="w-full h-72 sm:h-[420px] md:h-[560px] object-cover"
            />
          </router-link>

          <div class="p-4 sm:p-5 min-w-0">
            <p class="text-[10px] sm:text-xs uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mb-2 font-bold">
              #tendencias
            </p>

            <router-link
              :to="`/articulo/${mainArticle.slug}`"
              class="block"
            >
              <h3 class="text-2xl sm:text-3xl md:text-3xl font-black leading-tight hover:underline text-white break-words">
                {{ mainArticle.title }}
              </h3>
            </router-link>

            <p class="text-[10px] sm:text-xs uppercase text-[#FF2BD6] tracking-[0.18em] sm:tracking-[0.2em] mt-2">
              {{ mainArticle.category }}
            </p>

            <p class="text-[#C9D6FF] text-sm sm:text-[15px] mt-2 leading-relaxed">
              {{ mainArticle.excerpt }}
            </p>
          </div>
        </article>

        <!-- PUBLICIDAD RECTÁNGULO 336x280 EN MÓVIL/TABLET -->
        <div class="lg:hidden w-full flex justify-center mb-8 overflow-hidden">
          <div class="w-full max-w-[336px] aspect-[336/280] bg-[#12121C] border border-[#FF2BD6]/35 flex flex-col items-center justify-center text-[#C9D6FF] px-4 rounded-2xl overflow-hidden">
            <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-lg sm:text-xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#00F5FF]">
              336 x 280
            </span>
            <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#FF2BD6]">
              Rectángulo
            </span>
          </div>
        </div>

        <!-- LISTA DE ARTÍCULOS -->
        <div class="space-y-5 min-w-0">
          <template
            v-for="(article, index) in listArticles"
            :key="article.id"
          >
            <article class="overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#2A1630] bg-[#12121C] min-w-0">
              <router-link :to="`/articulo/${article.slug}`" class="block">
                <img
                  :src="article.cover_image"
                  :alt="article.title"
                  class="w-full h-56 sm:h-72 md:h-96 object-cover"
                />
              </router-link>

              <div class="p-4 sm:p-5 min-w-0">
                <p class="text-[10px] sm:text-xs uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mb-2 font-bold">
                  #tendencias
                </p>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="text-xl md:text-2xl font-black leading-tight hover:underline text-white block break-words"
                >
                  {{ article.title }}
                </router-link>

                <p class="text-[10px] sm:text-xs uppercase text-[#FF2BD6] tracking-[0.18em] sm:tracking-[0.2em] mt-2">
                  {{ article.category }}
                </p>

                <p class="text-[#C9D6FF] text-sm mt-2 leading-relaxed">
                  {{ article.excerpt }}
                </p>
              </div>
            </article>

            <!-- PUBLICIDAD 728x90 ENTRE NOTICIAS -->
            <div
              v-if="index === 1"
              class="w-full flex justify-center py-3 overflow-hidden"
            >
              <div class="w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px] bg-[#12121C] border border-[#00F5FF]/35 flex flex-col items-center justify-center text-[#C9D6FF] px-4 rounded-2xl overflow-hidden">
                <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                  Publicidad
                </span>
                <span class="text-base sm:text-lg md:text-2xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#00F5FF]">
                  728 x 90
                </span>
                <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#FF2BD6]">
                  Leaderboard
                </span>
              </div>
            </div>

            <!-- PUBLICIDAD RECTÁNGULO 336x280 ENTRE BLOQUES -->
            <div
              v-if="index === 3"
              class="w-full flex justify-center py-4 overflow-hidden"
            >
              <div class="w-full max-w-[336px] aspect-[336/280] bg-[#12121C] border border-[#FF2BD6]/35 flex flex-col items-center justify-center text-[#C9D6FF] px-4 rounded-2xl overflow-hidden">
                <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                  Publicidad
                </span>
                <span class="text-lg sm:text-xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#00F5FF]">
                  336 x 280
                </span>
                <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em]">
                  Rectángulo
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- PUBLICIDAD 300x250 ROBAPÁGINAS -->
          <div class="w-[300px] h-[250px] bg-[#12121C] border border-[#FF2BD6]/35 flex flex-col items-center justify-center text-[#C9D6FF] rounded-2xl">
            <span class="text-[9px] uppercase tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-2xl font-light tracking-[0.15em] text-[#00F5FF]">
              300 x 250
            </span>
            <span class="text-[10px] uppercase tracking-[0.25em] text-[#FF2BD6]">
              Robapáginas
            </span>
          </div>

          <!-- LO MÁS LEÍDO -->
          <div>
            <h3 class="font-bold border-b-2 border-[#FF2BD6] text-[#FF2BD6] pb-2 mb-3">
              Lo más leído
            </h3>

            <ol class="space-y-4">
              <li
                v-for="(article, index) in articles.slice(0, 5)"
                :key="article.id"
                class="grid grid-cols-[30px_minmax(0,1fr)] gap-3"
              >
                <span class="text-[#00F5FF] font-black">
                  {{ index + 1 }}
                </span>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="text-sm font-bold leading-tight hover:underline text-white break-words"
                >
                  {{ article.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <!-- PUBLICIDAD 300x600 HALF PAGE -->
          <div class="w-[300px] h-[600px] bg-[#12121C] border border-[#00F5FF]/35 flex flex-col items-center justify-center text-[#C9D6FF] rounded-2xl">
            <span class="text-[9px] uppercase tracking-[0.35em] mb-1">
              Publicidad
            </span>
            <span class="text-2xl font-light tracking-[0.15em] text-[#00F5FF]">
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
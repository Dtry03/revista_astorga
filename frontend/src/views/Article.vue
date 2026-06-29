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
  },
];

const article = computed(() => {
  return articles.find((item) => item.slug === route.params.slug) || articles[0];
});

const relatedArticles = computed(() => {
  return articles.filter((item) => item.slug !== article.value.slug);
});

const articleParagraphs = [
  "Astorga afronta los próximos meses con una programación cultural pensada para vecinos, visitantes y negocios locales. La ciudad busca reforzar su actividad con propuestas culturales, gastronómicas y turísticas.",
  "La iniciativa pretende generar movimiento en el centro urbano, aumentar la presencia de visitantes y mejorar la conexión entre la vida cultural y el comercio de proximidad.",
  "Según fuentes cercanas a la organización, la agenda se irá completando durante las próximas semanas con nuevos actos, actividades familiares y eventos al aire libre.",
  "El objetivo principal es convertir la actividad cultural en una herramienta útil para dinamizar la ciudad y dar mayor visibilidad a los negocios locales.",
  "Este tipo de programación permite mantener viva la actividad durante más meses del año, no solo en fechas concretas o temporadas de mayor afluencia turística.",
  "La respuesta de los negocios locales será clave para medir el impacto real de estas iniciativas en la actividad comercial de la ciudad.",
];
</script>

<template>
  <main class="min-h-screen bg-white text-[#111] overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center border-stone-300 bg-white sticky top-0 z-50">
      <nav class="bg-[#B70041] flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center overflow-hidden">
        <div class="flex w-full max-w-5xl justify-center gap-4 sm:gap-6 md:gap-16 text-white text-[12px] sm:text-[13px] md:text-[16px]">
          <a href="/categoria/leon" class="hover:underline whitespace-nowrap">León</a>
          <a href="/categoria/ponferrada" class="hover:underline whitespace-nowrap">Ponferrada</a>
          <a href="/categoria/astorga" class="hover:underline whitespace-nowrap">Astorga</a>
          <a href="/categoria/baneza" class="hover:underline whitespace-nowrap">Bañeza</a>
        </div>
      </nav>

      <div class="bg-white w-full mx-auto py-3 sm:py-5">
        <div class="w-full max-w-5xl mx-auto grid grid-cols-[38px_minmax(0,1fr)_38px] sm:grid-cols-[52px_minmax(0,1fr)_52px] items-center px-3 sm:px-6">
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
              class="w-40  md:w-72 shrink-0"
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
              class="w-7 h-7 sm:w-8 sm:h-8 text-[#B70041] hover:scale-105 transition shrink-0"
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

    <!-- LAYOUT PRINCIPAL -->
    <section class="max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden">
      <!-- ARTÍCULO -->
      <article class="w-full max-w-[760px] min-w-0">
        <p class="uppercase text-[12px] sm:text-[15px] tracking-[0.18em] sm:tracking-[0.2em] text-[#B70041]">
          {{ article.category }}
        </p>

        <h1 class="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.05] font-black mt-2 break-words">
          {{ article.title }}
        </h1>

        <p class="text-[16px] sm:text-[17px] md:text-[20px] text-stone-600 leading-relaxed mt-3">
          {{ article.excerpt }}
        </p>

        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-stone-500 mt-4">
          <span>Redacción</span>
          <span>•</span>
          <span>Astorga</span>
          <span>•</span>
          <span>Actualizado hoy</span>
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-blue-600 flex justify-center items-center">
            <a href="#" class="fa-brands fa-facebook-f text-white"></a>
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-pink-500 flex justify-center items-center">
            <a href="#" class="fa-brands fa-instagram text-white"></a>
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-green-600 flex justify-center items-center">
            <a href="#" class="fa-brands fa-whatsapp text-white"></a>
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-stone-800 flex justify-center items-center">
            <a href="#" class="fa-brands fa-x-twitter text-white"></a>
          </span>
        </div>

        <!-- PUBLICIDAD LEADERBOARD 728x90 -->
        <div class="w-full flex justify-center my-6 overflow-hidden">
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

        <img
          :src="article.cover_image"
          :alt="article.title"
          class="w-full h-64 sm:h-[360px] md:h-[460px] object-cover mt-5"
        />

        <p class="text-[11px] text-stone-500 mt-1">
          Imagen principal de la información.
        </p>

        <!-- PUBLICIDAD RECTÁNGULO MÓVIL 336x280 -->
        <div class="lg:hidden w-full flex justify-center my-7 overflow-hidden">
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

        <!-- CUERPO -->
        <div class="mt-7 text-[16px] md:text-[17px] leading-[1.85] md:leading-[1.9] text-stone-800 space-y-5 min-w-0">
          <template
            v-for="(paragraph, index) in articleParagraphs"
            :key="index"
          >
            <p>
              {{ paragraph }}
            </p>

            <!-- PUBLICIDAD 336x280 DESPUÉS DEL SEGUNDO PÁRRAFO -->
            <div
              v-if="index === 1"
              class="w-full flex justify-center py-5 overflow-hidden"
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

            <!-- PUBLICIDAD LEADERBOARD 728x90 DESPUÉS DEL CUARTO PÁRRAFO -->
            <div
              v-if="index === 3"
              class="w-full flex justify-center py-5 overflow-hidden"
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

        <!-- COMPARTIR -->
        <div class="flex flex-wrap items-center gap-2 mt-8 border-t border-b border-[#B70041]/30 py-4">
          <span class="text-[11px] uppercase tracking-[0.2em] font-black text-[#B70041]/70 mr-2">
            Compartir
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-blue-600 flex justify-center items-center">
            <a href="#" class="fa-brands fa-facebook-f text-white"></a>
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-pink-500 flex justify-center items-center">
            <a href="#" class="fa-brands fa-instagram text-white"></a>
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-green-600 flex justify-center items-center">
            <a href="#" class="fa-brands fa-whatsapp text-white"></a>
          </span>

          <span class="w-7 h-7 sm:w-6 sm:h-6 rounded-full transition hover:scale-105 bg-stone-800 flex justify-center items-center">
            <a href="#" class="fa-brands fa-x-twitter text-white"></a>
          </span>
        </div>

        <!-- PUBLICIDAD FINAL 728x90 -->
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

        <!-- RELACIONADAS -->
        <section class="my-8">
          <h2 class="text-xl font-bold border-b-2 text-[#B70041] border-[#B70041] pb-2 mb-4">
            Te puede interesar
          </h2>

          <div class="space-y-4">
            <article
              v-for="item in relatedArticles"
              :key="item.id"
              class="grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)] gap-3 sm:gap-4 min-w-0"
            >
              <img
                :src="item.cover_image"
                :alt="item.title"
                class="w-full h-24 object-cover"
              />

              <div class="min-w-0">
                <router-link
                  :to="`/articulo/${item.slug}`"
                  class="block font-black leading-tight hover:underline break-words"
                >
                  {{ item.title }}
                </router-link>

                <p class="text-[10px] sm:text-[11px] uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mt-1">
                  {{ item.category }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </article>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- 300x250 ROBAPÁGINAS -->
          <div class="w-[300px] h-[250px] border border-stone-300 bg-stone-50 flex flex-col items-center justify-center text-stone-400">
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
            <h3 class="border-b-2 text-[#B70041] pb-3 font-bold border-[#B70041] mb-3">
              Lo más leído
            </h3>

            <ol class="space-y-3">
              <li
                v-for="(item, index) in relatedArticles"
                :key="item.id"
                class="grid grid-cols-[24px_minmax(0,1fr)] gap-2"
              >
                <span class="text-[#B70041] text-md font-black">
                  {{ index + 1 }}
                </span>

                <router-link
                  :to="`/articulo/${item.slug}`"
                  class="text-sm font-bold leading-tight hover:underline break-words"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <!-- 300x600 HALF PAGE -->
          <div class="w-[300px] h-[600px] border border-stone-300 bg-stone-50 flex flex-col items-center justify-center text-stone-400">
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
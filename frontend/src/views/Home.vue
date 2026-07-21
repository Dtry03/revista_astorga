<script setup>
import { ref, computed, onMounted } from "vue";
import { getArticles } from "../services/articlesApi";
import AdSlot from "../components/AdSlot.vue";

import {
  Smartphone,
  Newspaper,
  MessageSquareText,
  MessageSquareHeart,
  Share2,
  CircleUserRound,
} from "lucide-vue-next";

const menuOpen = ref(false);

const articles = ref([]);
const loading = ref(true);
const error = ref("");

const fallbackImage =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop";

onMounted(async () => {
  try {
    articles.value = await getArticles({ limit: 20 });
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar las noticias.";
  } finally {
    loading.value = false;
  }
});

const mainArticle = computed(() => articles.value[0]);
const secondaryArticles = computed(() => articles.value.slice(1, 3));
const restArticles = computed(() => articles.value.slice(3));
const mostReadArticles = computed(() => articles.value.slice(0, 5));

function getArticleImage(article) {
  return article?.cover_image?.trim() || fallbackImage;
}
</script>

<template>
  <main class="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center border-stone-300 bg-white sticky top-0 z-50">
      <nav class="bg-[#B70041] flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center text-stone-500 overflow-hidden">
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
              class="w-20 sm:w-36 md:w-72 shrink-0"
            />

            <img
              src="../assets/logo.png"
              alt="logo Horizonte León"
              class="w-24 sm:w-36 md:w-60 shrink-0"
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
          class="w-full bg-white "
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
      <AdSlot placement="billboard_970x250" />
    </section>

    <!-- ESTADOS -->
    <div
      v-if="loading"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-stone-500"
    >
      Cargando noticias...
    </div>

    <div
      v-else-if="error"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-[#B70041] font-bold"
    >
      {{ error }}
    </div>

    <div
      v-else-if="!articles.length"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-stone-500"
    >
      Todavía no hay noticias publicadas.
    </div>

    <!-- CONTENIDO + SIDEBAR PUBLICIDAD -->
    <section
      v-else
      class="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-10 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden"
    >
      <!-- COLUMNA PRINCIPAL -->
      <div class="min-w-0">
        <!-- NOTICIA PRINCIPAL -->
        <article
          v-if="mainArticle"
          class="min-w-0"
        >
          <router-link
            :to="`/articulo/${mainArticle.slug}`"
            class="block"
          >
            <img
              :src="getArticleImage(mainArticle)"
              :alt="mainArticle.title"
              class="w-full h-56 sm:h-80 md:h-[450px] object-cover"
            />
          </router-link>

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
        <div class="w-full my-8 overflow-hidden">
          <AdSlot placement="leaderboard_728x90" />
        </div>

        <!-- PUBLICIDAD RECTÁNGULO MÓVIL 336x280 -->
        <div class="lg:hidden w-full mb-8 overflow-hidden">
          <AdSlot placement="rectangle_336x280" />
        </div>

        <!-- NOTICIAS SECUNDARIAS -->
        <div
          v-if="secondaryArticles.length"
          class="space-y-6 sm:space-y-8 border-t border-[#B70041]/30 pt-6 sm:pt-8"
        >
          <template
            v-for="(article, index) in secondaryArticles"
            :key="article.id"
          >
            <article class="border-b border-[#B70041]/30 pb-6 sm:pb-8 min-w-0">
              <div class="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)] gap-4 sm:gap-5">
                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="block"
                >
                  <img
                    :src="getArticleImage(article)"
                    :alt="article.title"
                    class="w-full h-52 sm:h-32 md:h-32 object-cover"
                  />
                </router-link>

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
              class="w-full py-3 overflow-hidden"
            >
              <AdSlot placement="leaderboard_728x90" />
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
                    :src="getArticleImage(article)"
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
                class="sm:col-span-2 w-full py-4 overflow-hidden"
              >
                <AdSlot placement="rectangle_336x280" />
              </div>
            </template>
          </div>
        </section>
      </div>

      <!-- SIDEBAR DERECHA PUBLICIDAD -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- 300x250 ROBAPÁGINAS -->
          <AdSlot placement="sidebar_300x250" />

          <!-- LO MÁS LEÍDO -->
          <div v-if="mostReadArticles.length">
            <h3 class="font-bold border-b-2 border-[#B70041] text-[#B70041] pb-2 mb-3">
              Lo más leído
            </h3>

            <ol class="space-y-4">
              <li
                v-for="(article, index) in mostReadArticles"
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
          <AdSlot placement="sidebar_300x600" />
        </div>
      </aside>
    </section>
  </main>
</template>
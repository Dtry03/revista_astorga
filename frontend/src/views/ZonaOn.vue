<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
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
const route = useRoute();

const articles = ref([]);
const loading = ref(true);
const error = ref("");

const fallbackImage =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop";

const categoryMap = {
  leon: "León",
  ponferrada: "Ponferrada",
  astorga: "Astorga",
  baneza: "Bañeza",
  deportes: "Deportes",
  motor: "Motor",
  zonaon: "ZonaON",
  tendencias: "#tendencias",
  tablon: "Tablón",
  actualidad: "Actualidad",
};

const categorySlug = computed(() => {
  return route.params.slug ? String(route.params.slug).toLowerCase() : "zonaon";
});

const categoryName = computed(() => {
  return categoryMap[categorySlug.value] || "ZonaON";
});

const mainArticle = computed(() => articles.value[0]);
const listArticles = computed(() => articles.value.slice(1));
const mostReadArticles = computed(() => articles.value.slice(0, 5));

function getArticleImage(article) {
  return article?.cover_image?.trim() || fallbackImage;
}

async function loadCategoryArticles() {
  loading.value = true;
  error.value = "";
  articles.value = [];

  try {
    articles.value = await getArticles({
      limit: 20,
      category: categoryName.value,
    });
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar las noticias de esta categoría.";
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.slug,
  () => {
    loadCategoryArticles();
  },
  { immediate: true }
);
</script>

<template>
  <main class="zonaon-bg min-h-screen text-[#111] overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center border-stone-200 bg-white sticky top-0 z-50">
      <nav class="bg-[#B70041] flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center overflow-hidden">
        <div class="flex w-full max-w-5xl justify-center gap-4 sm:gap-6 md:gap-16 text-white text-[12px] sm:text-[13px] md:text-[16px]">
          <a href="/categoria/leon" class="hover:underline whitespace-nowrap">León</a>
          <a href="/categoria/ponferrada" class="hover:underline whitespace-nowrap">Ponferrada</a>
          <a href="/categoria/astorga" class="hover:underline whitespace-nowrap">Astorga</a>
          <a href="/categoria/baneza" class="hover:underline whitespace-nowrap">Bañeza</a>
        </div>
      </nav>

      <div class="w-full mx-auto">
        <div class="w-full max-w-5xl mx-auto grid grid-cols-[38px_minmax(0,1fr)_38px] sm:grid-cols-[56px_minmax(0,1fr)_56px] items-center px-3 sm:px-6 py-4 sm:py-5">
          <div class="flex items-center justify-start">
            <button
              @click="menuOpen = !menuOpen"
              class="flex flex-col gap-1.5"
              aria-label="Abrir menú"
            >
              <span class="w-6 h-0.5 bg-[#D15615]"></span>
              <span class="w-6 h-0.5 bg-[#D15615]"></span>
              <span class="w-6 h-0.5 bg-[#D15615]"></span>
            </button>
          </div>

          <div class="flex text-center items-center justify-center min-w-0">
              <img
              src="../assets/logo-imagen.png"
              alt="logo Horizonte León"
              class="w-20 sm:w-36 md:w-72 shrink-0"
            />
            <p class="text-xl min-[380px]:text-xl sm:text-xl md:text-5xl  font-black tracking-tight text-[#D15615] leading-none whitespace-nowrap">
              Zona<span class="text-[#B70041]">ON</span>
            </p>
          </div>

          <div class="flex justify-end items-center">
            <CircleUserRound
              :stroke-width="1.5"
              class="w-7 h-7 sm:w-8 sm:h-8 text-[#D15615] hover:scale-105 transition shrink-0"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center w-full max-w-5xl gap-3 sm:gap-5 text-black text-[13px] md:text-[16px] py-2 px-4 overflow-hidden">
        <Smartphone class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#D15615] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#D15615] shrink-0" />

        <Newspaper class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#D15615] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#D15615] shrink-0" />

        <MessageSquareText class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#D15615] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#D15615] shrink-0" />

        <MessageSquareHeart class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#D15615] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#D15615] shrink-0" />

        <Share2 class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#D15615] hover:scale-105 transition shrink-0" />
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
            <p class="text-sm md:text-md border-b text-[#D15615] font-bold border-[#D15615]/40 lg:max-w-4xl w-full py-2 px-4">
              Secciones
            </p>

            <router-link
              to="/categoria/leon"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              León
            </router-link>

            <router-link
              to="/categoria/ponferrada"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Ponferrada
            </router-link>

            <router-link
              to="/categoria/astorga"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Astorga
            </router-link>

            <router-link
              to="/categoria/baneza"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Bañeza
            </router-link>

            <router-link
              to="/categoria/deportes"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Deportes
            </router-link>

            <router-link
              to="/categoria/motor"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Motor
            </router-link>

            <router-link
              to="/zonaon/"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Zona<span class="font-bold">ON</span>
            </router-link>

            <router-link
              to="/tendency/"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              #tendencias
            </router-link>

            <router-link
              to="/categoria/tablon"
              class="text-sm md:text-[16px] border-b border-[#D15615]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Tablón
            </router-link>
          </nav>
        </div>
      </transition>

      <div>
        <p class="text-[8px] sm:text-[9px] md:text-[10px] py-2 px-3 text-center font-bold text-[#D15615]">
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
      Cargando noticias de {{ categoryName }}...
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
      Todavía no hay noticias publicadas en {{ categoryName }}.
    </div>

    <!-- CONTENEDOR PRINCIPAL -->
    <section
      v-else
      class="max-w-6xl mx-auto px-3 sm:px-4 pb-16 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden"
    >
      <!-- COLUMNA IZQUIERDA -->
      <div class="min-w-0">
        <div class="border-b-2 border-[#D15615] mb-5 flex items-center gap-2">
          <span class="w-3 h-3 bg-[#B70041] shrink-0"></span>
          <h2 class="text-lg sm:text-xl font-bold capitalize text-[#D15615] break-words">
            {{ categoryName }}
          </h2>
        </div>

        <!-- PUBLICIDAD LEADERBOARD 728x90 -->
        <div class="w-full mb-7 overflow-hidden">
          <AdSlot placement="leaderboard_728x90" />
        </div>

        <!-- NOTICIA PRINCIPAL -->
        <article v-if="mainArticle" class="mb-8 min-w-0">
          <router-link :to="`/articulo/${mainArticle.slug}`">
            <img
              :src="getArticleImage(mainArticle)"
              :alt="mainArticle.title"
              class="w-full h-56 sm:h-72 md:h-[320px] object-cover"
            />

            <h3 class="text-2xl sm:text-3xl md:text-3xl font-black leading-tight mt-3 hover:underline text-black break-words">
              {{ mainArticle.title }}
            </h3>
          </router-link>

          <p class="text-[10px] sm:text-xs uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mt-2">
            {{ mainArticle.category }}
          </p>

          <p class="text-[#D15615] text-sm sm:text-[15px] mt-2 leading-relaxed">
            {{ mainArticle.excerpt }}
          </p>
        </article>

        <!-- PUBLICIDAD RECTÁNGULO 336x280 EN MÓVIL/TABLET -->
        <div class="lg:hidden w-full mb-8 overflow-hidden">
          <AdSlot placement="rectangle_336x280" />
        </div>

        <!-- LISTA DE ARTÍCULOS -->
        <div
          v-if="listArticles.length"
          class="space-y-5 min-w-0"
        >
          <template
            v-for="(article, index) in listArticles"
            :key="article.id"
          >
            <article class="grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)] md:grid-cols-[180px_minmax(0,1fr)] gap-3 sm:gap-4 border-b border-[#1D4E78]/40 pb-5 min-w-0">
              <router-link :to="`/articulo/${article.slug}`" class="min-w-0">
                <img
                  :src="getArticleImage(article)"
                  :alt="article.title"
                  class="w-full h-24 sm:h-28 md:h-32 object-cover"
                />
              </router-link>

              <div class="min-w-0">
                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="block text-base sm:text-lg md:text-xl font-black leading-tight hover:underline text-black break-words"
                >
                  {{ article.title }}
                </router-link>

                <p class="text-[9px] sm:text-xs uppercase text-[#B70041] tracking-[0.16em] sm:tracking-[0.2em] mt-2">
                  {{ article.category }}
                </p>

                <p class="text-[#D15615] text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {{ article.excerpt }}
                </p>
              </div>
            </article>

            <!-- PUBLICIDAD 728x90 ENTRE NOTICIAS -->
            <div
              v-if="index === 1"
              class="w-full py-3 overflow-hidden"
            >
              <AdSlot placement="leaderboard_728x90" />
            </div>

            <!-- PUBLICIDAD RECTÁNGULO 336x280 ENTRE BLOQUES -->
            <div
              v-if="index === 3"
              class="w-full py-4 overflow-hidden"
            >
              <AdSlot placement="rectangle_336x280" />
            </div>
          </template>
        </div>
      </div>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- PUBLICIDAD 300x250 ROBAPÁGINAS -->
          <AdSlot placement="sidebar_300x250" />

          <!-- LO MÁS LEÍDO -->
          <div v-if="mostReadArticles.length">
            <h3 class="font-bold border-b-2 border-[#D15615] text-[#D15615] pb-2 mb-3">
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
                  class="text-sm font-bold leading-tight hover:underline text-black break-words"
                >
                  {{ article.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <!-- PUBLICIDAD 300x600 HALF PAGE -->
          <AdSlot placement="sidebar_300x600" />
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.zonaon-bg {
  background-color: #ffffff;
  background-image: url("/uploads/fondozonaonmovil.jpg");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

@media (min-width: 768px) {
  .zonaon-bg {
    background-image: url("/uploads/fondozonaonpc.jpg");
    background-attachment: fixed;
    background-position: center center;
  }
}
</style>
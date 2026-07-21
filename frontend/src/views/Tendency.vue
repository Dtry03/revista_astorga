<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getArticles } from "../services/articlesApi";
import { getAdByPlacement } from "../services/adsApi";

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
const ads = ref({});
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
  return route.params.slug
    ? String(route.params.slug).toLowerCase()
    : "tendencias";
});

const categoryName = computed(() => {
  return route.params.slug
    ? String(route.params.slug).replaceAll("-", " ")
    : "tendencias";
});

const apiCategoryName = computed(() => {
  return categoryMap[categorySlug.value] || "#tendencias";
});

const mainArticle = computed(() => articles.value[0]);
const listArticles = computed(() => articles.value.slice(1));
const mostReadArticles = computed(() => articles.value.slice(0, 5));

function getArticleImage(article) {
  return article?.cover_image?.trim() || fallbackImage;
}

function getAd(placement) {
  return ads.value[placement] || null;
}

function hasRealAd(placement) {
  return Boolean(getAd(placement)?.image_url);
}

async function loadAds() {
  const placements = [
    "billboard_970x250",
    "leaderboard_728x90",
    "rectangle_336x280",
    "sidebar_300x250",
    "sidebar_300x600",
  ];

  const entries = await Promise.all(
    placements.map(async (placement) => {
      try {
        const ad = await getAdByPlacement(placement);
        return [placement, ad];
      } catch (err) {
        console.error(err);
        return [placement, null];
      }
    })
  );

  ads.value = Object.fromEntries(entries);
}

async function loadCategoryArticles() {
  loading.value = true;
  error.value = "";
  articles.value = [];

  try {
    articles.value = await getArticles({
      limit: 20,
      category: apiCategoryName.value,
    });
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar las noticias de esta categoría.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadAds();
});

watch(
  () => route.params.slug,
  () => {
    loadCategoryArticles();
  },
  { immediate: true }
);
</script>

<template>
  <main class="tendencias-bg min-h-screen text-[#111] overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center   sticky top-0 z-50 ">
      <nav class="bg-[#B70041] flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center overflow-hidden">
        <div class="flex w-full max-w-5xl justify-center gap-4 sm:gap-6 md:gap-16 text-white text-[12px] sm:text-[13px] md:text-[16px]">
          <a href="/categoria/leon" class="hover:underline whitespace-nowrap">León</a>
          <a href="/categoria/ponferrada" class="hover:underline whitespace-nowrap">Ponferrada</a>
          <a href="/categoria/astorga" class="hover:underline whitespace-nowrap">Astorga</a>
          <a href="/categoria/baneza" class="hover:underline whitespace-nowrap">Bañeza</a>
        </div>
      </nav>

      <div class=" w-full mx-auto">
        <div class="w-full max-w-5xl mx-auto grid grid-cols-[38px_minmax(0,1fr)_38px] sm:grid-cols-[56px_minmax(0,1fr)_56px] items-center px-3 sm:px-6 py-4 sm:py-5">
          <div class="flex items-center justify-start">
            <button
              @click="menuOpen = !menuOpen"
              class="flex flex-col gap-1.5"
              aria-label="Abrir menú"
            >
              <span class="w-6 h-0.5 bg-[#B70041]"></span>
              <span class="w-6 h-0.5 bg-[#00AFC2]"></span>
              <span class="w-6 h-0.5 bg-[#B70041]"></span>
            </button>
          </div>

          <div class="flex text-center items-center justify-center min-w-0">
              <img
              src="../assets/logo-imagen.png"
              alt="logo Horizonte León"
              class="w-20 sm:w-36 md:w-72 shrink-0"
            />
            <p class="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#B70041] leading-none whitespace-nowrap">
              #tendencias
            </p>
            
          </div>

          <div class="flex justify-end items-center">
            <CircleUserRound
              :stroke-width="1.5"
              class="w-7 h-7 sm:w-8 sm:h-8 text-[#00AFC2] hover:scale-105 transition shrink-0"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center w-full max-w-5xl gap-3 sm:gap-5 text-[#111] text-[13px] md:text-[16px] py-2 px-4 overflow-hidden">
        <Smartphone class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00AFC2] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <Newspaper class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00AFC2] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <MessageSquareText class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00AFC2] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <MessageSquareHeart class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00AFC2] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#B70041] shrink-0" />

        <Share2 class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#00AFC2] hover:scale-105 transition shrink-0" />
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
          class="w-full "
        >
          <nav class="flex flex-col justify-center items-center">
            <p class="text-sm md:text-md border-b text-[#B70041] font-bold border-[#F3A6C8] lg:max-w-4xl w-full py-2 px-4">
              Secciones
            </p>

            <router-link
              to="/categoria/leon"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              León
            </router-link>

            <router-link
              to="/categoria/ponferrada"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Ponferrada
            </router-link>

            <router-link
              to="/categoria/astorga"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Astorga
            </router-link>

            <router-link
              to="/categoria/baneza"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Bañeza
            </router-link>

            <router-link
              to="/categoria/deportes"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Deportes
            </router-link>

            <router-link
              to="/categoria/motor"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Motor
            </router-link>

            <router-link
              to="/zonaon/"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Zona<span class="font-bold">ON</span>
            </router-link>

            <router-link
              to="/tendency/"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              #tendencias
            </router-link>

            <router-link
              to="/categoria/tablon"
              class="text-sm md:text-[16px] border-b border-[#F3A6C8]/70 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-[#111]"
              @click="menuOpen = false"
            >
              Tablón
            </router-link>
          </nav>
        </div>
      </transition>

      <div>
        <p class="text-[8px] sm:text-[9px] md:text-[10px] py-2 px-3 text-center font-bold text-[#00AFC2]">
          INFORMACIÓN SIN LIMITES.
          <span class="text-[#B70041]">CONECTAMOS CONTIGO</span>
        </p>
      </div>
    </header>

    <!-- PUBLICIDAD BILLBOARD 970x250 -->
    <section class="w-full px-3 sm:px-4 py-4 sm:py-5 overflow-hidden">
      <div class="max-w-[970px] mx-auto w-full">
        <component
          :is="getAd('billboard_970x250')?.target_url ? 'a' : 'div'"
          :href="getAd('billboard_970x250')?.target_url || undefined"
          :target="getAd('billboard_970x250')?.target_url ? '_blank' : undefined"
          :rel="getAd('billboard_970x250')?.target_url ? 'noopener noreferrer' : undefined"
          class="w-full aspect-[970/250] min-h-[86px] sm:min-h-[110px] md:min-h-[120px] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] px-4 rounded-2xl overflow-hidden shadow-sm"
        >
          <img
            v-if="hasRealAd('billboard_970x250')"
            :src="getAd('billboard_970x250').image_url"
            :alt="getAd('billboard_970x250').alt_text || getAd('billboard_970x250').name || 'Publicidad'"
            class="w-full h-full object-cover"
          />

          <template v-else>
            <span class="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1 sm:mb-2">
              Publicidad
            </span>
            <span class="text-lg sm:text-xl md:text-3xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#B70041]">
              970 x 250
            </span>
            <span class="text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] mt-1 text-[#00AFC2]">
              Billboard
            </span>
          </template>
        </component>
      </div>
    </section>

    <!-- ESTADOS -->
    <div
      v-if="loading"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-[#5E3346] font-bold"
    >
      Cargando noticias de #{{ categoryName }}...
    </div>

    <div
      v-else-if="error"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-[#B70041] font-bold"
    >
      {{ error }}
    </div>

    <div
      v-else-if="!articles.length"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-[#5E3346] font-bold"
    >
      Todavía no hay noticias publicadas en #{{ categoryName }}.
    </div>

    <!-- CONTENEDOR PRINCIPAL -->
    <section
      v-else
      class="max-w-6xl mx-auto px-3 sm:px-4 pb-16 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden"
    >
      <!-- COLUMNA IZQUIERDA -->
      <div class="min-w-0">
        <div class="border-b-2 border-[#B70041] mb-5 flex items-center gap-2 bg-[#FFF3F8]/90 backdrop-blur-sm rounded-t-2xl px-3 py-3">
          <span class="w-3 h-3 bg-[#00AFC2] shrink-0"></span>
          <h2 class="text-lg sm:text-xl font-black capitalize text-[#B70041] break-words">
            #{{ categoryName }}
          </h2>
        </div>

        <!-- PUBLICIDAD LEADERBOARD 728x90 -->
        <div class="w-full flex justify-center mb-7 overflow-hidden">
          <component
            :is="getAd('leaderboard_728x90')?.target_url ? 'a' : 'div'"
            :href="getAd('leaderboard_728x90')?.target_url || undefined"
            :target="getAd('leaderboard_728x90')?.target_url ? '_blank' : undefined"
            :rel="getAd('leaderboard_728x90')?.target_url ? 'noopener noreferrer' : undefined"
            class="w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] px-4 rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              v-if="hasRealAd('leaderboard_728x90')"
              :src="getAd('leaderboard_728x90').image_url"
              :alt="getAd('leaderboard_728x90').alt_text || getAd('leaderboard_728x90').name || 'Publicidad'"
              class="w-full h-full object-cover"
            />

            <template v-else>
              <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                Publicidad
              </span>
              <span class="text-base sm:text-lg md:text-2xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#B70041]">
                728 x 90
              </span>
              <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#00AFC2]">
                Leaderboard
              </span>
            </template>
          </component>
        </div>

        <!-- NOTICIA PRINCIPAL -->
        <article v-if="mainArticle" class="mb-8 overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#F3A6C8] bg-[#FFF3F8]/95 backdrop-blur-sm min-w-0 shadow-sm">
          <router-link :to="`/articulo/${mainArticle.slug}`" class="block">
            <img
              :src="getArticleImage(mainArticle)"
              :alt="mainArticle.title"
              class="w-full h-72 sm:h-[420px] md:h-[560px] object-cover"
            />
          </router-link>

          <div class="p-4 sm:p-5 min-w-0">
            <p class="text-[10px] sm:text-xs uppercase text-[#00AFC2] tracking-[0.18em] sm:tracking-[0.2em] mb-2 font-black">
              #tendencias
            </p>

            <router-link
              :to="`/articulo/${mainArticle.slug}`"
              class="block"
            >
              <h3 class="text-2xl sm:text-3xl md:text-3xl font-black leading-tight hover:underline text-[#111] break-words">
                {{ mainArticle.title }}
              </h3>
            </router-link>

            <p class="text-[10px] sm:text-xs uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mt-2 font-bold">
              {{ mainArticle.category }}
            </p>

            <p class="text-[#5E3346] text-sm sm:text-[15px] mt-2 leading-relaxed font-medium">
              {{ mainArticle.excerpt }}
            </p>
          </div>
        </article>

        <!-- PUBLICIDAD RECTÁNGULO 336x280 EN MÓVIL/TABLET -->
        <div class="lg:hidden w-full flex justify-center mb-8 overflow-hidden">
          <component
            :is="getAd('rectangle_336x280')?.target_url ? 'a' : 'div'"
            :href="getAd('rectangle_336x280')?.target_url || undefined"
            :target="getAd('rectangle_336x280')?.target_url ? '_blank' : undefined"
            :rel="getAd('rectangle_336x280')?.target_url ? 'noopener noreferrer' : undefined"
            class="w-full max-w-[336px] aspect-[336/280] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] px-4 rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              v-if="hasRealAd('rectangle_336x280')"
              :src="getAd('rectangle_336x280').image_url"
              :alt="getAd('rectangle_336x280').alt_text || getAd('rectangle_336x280').name || 'Publicidad'"
              class="w-full h-full object-cover"
            />

            <template v-else>
              <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                Publicidad
              </span>
              <span class="text-lg sm:text-xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#B70041]">
                336 x 280
              </span>
              <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#00AFC2]">
                Rectángulo
              </span>
            </template>
          </component>
        </div>

        <!-- LISTA DE ARTÍCULOS -->
        <div class="space-y-5 min-w-0">
          <template
            v-for="(article, index) in listArticles"
            :key="article.id"
          >
            <article class="overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#F3A6C8] bg-[#FFF3F8]/95 backdrop-blur-sm min-w-0 shadow-sm">
              <router-link :to="`/articulo/${article.slug}`" class="block">
                <img
                  :src="getArticleImage(article)"
                  :alt="article.title"
                  class="w-full h-56 sm:h-72 md:h-96 object-cover"
                />
              </router-link>

              <div class="p-4 sm:p-5 min-w-0">
                <p class="text-[10px] sm:text-xs uppercase text-[#00AFC2] tracking-[0.18em] sm:tracking-[0.2em] mb-2 font-black">
                  #tendencias
                </p>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="text-xl md:text-2xl font-black leading-tight hover:underline text-[#111] block break-words"
                >
                  {{ article.title }}
                </router-link>

                <p class="text-[10px] sm:text-xs uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mt-2 font-bold">
                  {{ article.category }}
                </p>

                <p class="text-[#5E3346] text-sm mt-2 leading-relaxed font-medium">
                  {{ article.excerpt }}
                </p>
              </div>
            </article>

            <!-- PUBLICIDAD 728x90 ENTRE NOTICIAS -->
            <div
              v-if="index === 1"
              class="w-full flex justify-center py-3 overflow-hidden"
            >
              <component
                :is="getAd('leaderboard_728x90')?.target_url ? 'a' : 'div'"
                :href="getAd('leaderboard_728x90')?.target_url || undefined"
                :target="getAd('leaderboard_728x90')?.target_url ? '_blank' : undefined"
                :rel="getAd('leaderboard_728x90')?.target_url ? 'noopener noreferrer' : undefined"
                class="w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] px-4 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  v-if="hasRealAd('leaderboard_728x90')"
                  :src="getAd('leaderboard_728x90').image_url"
                  :alt="getAd('leaderboard_728x90').alt_text || getAd('leaderboard_728x90').name || 'Publicidad'"
                  class="w-full h-full object-cover"
                />

                <template v-else>
                  <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                    Publicidad
                  </span>
                  <span class="text-base sm:text-lg md:text-2xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#B70041]">
                    728 x 90
                  </span>
                  <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#00AFC2]">
                    Leaderboard
                  </span>
                </template>
              </component>
            </div>

            <!-- PUBLICIDAD RECTÁNGULO 336x280 ENTRE BLOQUES -->
            <div
              v-if="index === 3"
              class="w-full flex justify-center py-4 overflow-hidden"
            >
              <component
                :is="getAd('rectangle_336x280')?.target_url ? 'a' : 'div'"
                :href="getAd('rectangle_336x280')?.target_url || undefined"
                :target="getAd('rectangle_336x280')?.target_url ? '_blank' : undefined"
                :rel="getAd('rectangle_336x280')?.target_url ? 'noopener noreferrer' : undefined"
                class="w-full max-w-[336px] aspect-[336/280] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] px-4 rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  v-if="hasRealAd('rectangle_336x280')"
                  :src="getAd('rectangle_336x280').image_url"
                  :alt="getAd('rectangle_336x280').alt_text || getAd('rectangle_336x280').name || 'Publicidad'"
                  class="w-full h-full object-cover"
                />

                <template v-else>
                  <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
                    Publicidad
                  </span>
                  <span class="text-lg sm:text-xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#B70041]">
                    336 x 280
                  </span>
                  <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#00AFC2]">
                    Rectángulo
                  </span>
                </template>
              </component>
            </div>
          </template>
        </div>
      </div>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- PUBLICIDAD 300x250 ROBAPÁGINAS -->
          <component
            :is="getAd('sidebar_300x250')?.target_url ? 'a' : 'div'"
            :href="getAd('sidebar_300x250')?.target_url || undefined"
            :target="getAd('sidebar_300x250')?.target_url ? '_blank' : undefined"
            :rel="getAd('sidebar_300x250')?.target_url ? 'noopener noreferrer' : undefined"
            class="w-[300px] h-[250px] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              v-if="hasRealAd('sidebar_300x250')"
              :src="getAd('sidebar_300x250').image_url"
              :alt="getAd('sidebar_300x250').alt_text || getAd('sidebar_300x250').name || 'Publicidad'"
              class="w-full h-full object-cover"
            />

            <template v-else>
              <span class="text-[9px] uppercase tracking-[0.35em] mb-1">
                Publicidad
              </span>
              <span class="text-2xl font-light tracking-[0.15em] text-[#B70041]">
                300 x 250
              </span>
              <span class="text-[10px] uppercase tracking-[0.25em] text-[#00AFC2]">
                Robapáginas
              </span>
            </template>
          </component>

          <!-- LO MÁS LEÍDO -->
          <div class="bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] rounded-2xl p-4 shadow-sm">
            <h3 class="font-black border-b-2 border-[#B70041] text-[#B70041] pb-2 mb-3">
              Lo más leído
            </h3>

            <ol class="space-y-4">
              <li
                v-for="(article, index) in mostReadArticles"
                :key="article.id"
                class="grid grid-cols-[30px_minmax(0,1fr)] gap-3"
              >
                <span class="text-[#00AFC2] font-black">
                  {{ index + 1 }}
                </span>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="text-sm font-black leading-tight hover:underline text-[#111] break-words"
                >
                  {{ article.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <!-- PUBLICIDAD 300x600 HALF PAGE -->
          <component
            :is="getAd('sidebar_300x600')?.target_url ? 'a' : 'div'"
            :href="getAd('sidebar_300x600')?.target_url || undefined"
            :target="getAd('sidebar_300x600')?.target_url ? '_blank' : undefined"
            :rel="getAd('sidebar_300x600')?.target_url ? 'noopener noreferrer' : undefined"
            class="w-[300px] h-[600px] bg-[#FFF3F8]/95 backdrop-blur-sm border border-[#F3A6C8] flex flex-col items-center justify-center text-[#5E3346] rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              v-if="hasRealAd('sidebar_300x600')"
              :src="getAd('sidebar_300x600').image_url"
              :alt="getAd('sidebar_300x600').alt_text || getAd('sidebar_300x600').name || 'Publicidad'"
              class="w-full h-full object-cover"
            />

            <template v-else>
              <span class="text-[9px] uppercase tracking-[0.35em] mb-1">
                Publicidad
              </span>
              <span class="text-2xl font-light tracking-[0.15em] text-[#B70041]">
                300 x 600
              </span>
              <span class="text-[10px] uppercase tracking-[0.25em] text-[#00AFC2]">
                Half Page
              </span>
            </template>
          </component>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.tendencias-bg {
  background-image: url("/uploads/fondotendenciamovil.jpg");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

@media (min-width: 768px) {
  .tendencias-bg {
    background-image: url("/uploads/fondotendenciapc.jpg");
    background-attachment: fixed;
    background-position: center center;
  }
}
</style>
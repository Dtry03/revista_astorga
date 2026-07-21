<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getArticleBySlug, getArticles } from "../services/articlesApi";
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

const article = ref(null);
const relatedArticles = ref([]);
const loading = ref(true);
const error = ref("");

const fallbackImage =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop";

function getArticleImage(item) {
  return item?.cover_image?.trim() || fallbackImage;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const articleBodyHtml = computed(() => {
  const body = article.value?.body || "";

  if (!body.trim()) {
    return "";
  }

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(body);

  if (looksLikeHtml) {
    return body;
  }

  return body
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
});

const formattedDate = computed(() => {
  const rawDate = article.value?.published_at || article.value?.created_at;

  if (!rawDate) {
    return "Actualizado hoy";
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(rawDate));
});

async function loadArticle(slug) {
  if (!slug) {
    error.value = "No se encontró la noticia.";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const currentArticle = await getArticleBySlug(slug);
    article.value = currentArticle;

    const articles = await getArticles({ limit: 8 });

    relatedArticles.value = articles
      .filter((item) => item.slug !== currentArticle.slug)
      .slice(0, 4);
  } catch (err) {
    console.error(err);
    error.value = "No se pudo cargar la noticia.";
    article.value = null;
    relatedArticles.value = [];
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.slug,
  (slug) => {
    loadArticle(String(slug || ""));
  },
  { immediate: true }
);
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
      Cargando noticia...
    </div>

    <div
      v-else-if="error"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-[#B70041] font-bold"
    >
      {{ error }}
    </div>

    <div
      v-else-if="!article"
      class="max-w-6xl mx-auto px-4 py-16 text-center text-stone-500"
    >
      No se encontró la noticia.
    </div>

    <!-- LAYOUT PRINCIPAL -->
    <section
      v-else
      class="max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden"
    >
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
          <span>{{ article.category }}</span>
          <span>•</span>
          <span>{{ formattedDate }}</span>
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
        <div class="w-full my-6 overflow-hidden">
          <AdSlot placement="leaderboard_728x90" />
        </div>

        <img
          :src="getArticleImage(article)"
          :alt="article.title"
          class="w-full h-64 sm:h-[360px] md:h-[460px] object-cover mt-5"
        />

        <p class="text-[11px] text-stone-500 mt-1">
          Imagen principal de la información.
        </p>

        <!-- PUBLICIDAD RECTÁNGULO MÓVIL 336x280 -->
        <div class="lg:hidden w-full my-7 overflow-hidden">
          <AdSlot placement="rectangle_336x280" />
        </div>

        <!-- CUERPO REAL DEL ARTÍCULO -->
        <div
          v-if="articleBodyHtml"
          class="article-content mt-7 text-[16px] md:text-[17px] leading-[1.85] md:leading-[1.9] text-stone-800 min-w-0"
          v-html="articleBodyHtml"
        ></div>

        <div
          v-else
          class="mt-7 text-[16px] md:text-[17px] leading-[1.85] md:leading-[1.9] text-stone-800 min-w-0"
        >
          <p>
            {{ article.excerpt }}
          </p>
        </div>

        <!-- PUBLICIDAD 336x280 DESPUÉS DEL CUERPO -->
        <div class="w-full py-5 overflow-hidden">
          <AdSlot placement="rectangle_336x280" />
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
        <div class="w-full my-8 overflow-hidden">
          <AdSlot placement="leaderboard_728x90" />
        </div>

        <!-- RELACIONADAS -->
        <section
          v-if="relatedArticles.length"
          class="my-8"
        >
          <h2 class="text-xl font-bold border-b-2 text-[#B70041] border-[#B70041] pb-2 mb-4">
            Te puede interesar
          </h2>

          <div class="space-y-4">
            <article
              v-for="item in relatedArticles"
              :key="item.id"
              class="grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)] gap-3 sm:gap-4 min-w-0"
            >
              <router-link
                :to="`/articulo/${item.slug}`"
                class="block"
              >
                <img
                  :src="getArticleImage(item)"
                  :alt="item.title"
                  class="w-full h-24 object-cover"
                />
              </router-link>

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
          <AdSlot placement="sidebar_300x250" />

          <!-- LO MÁS LEÍDO -->
          <div v-if="relatedArticles.length">
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
          <AdSlot placement="sidebar_300x600" />
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.article-content :deep(p) {
  margin-bottom: 1.25rem;
}

.article-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  line-height: 1.15;
  font-weight: 900;
  color: #111;
}

.article-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 800;
  color: #111;
}

.article-content :deep(a) {
  color: #b70041;
  text-decoration: underline;
  font-weight: 700;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}

.article-content :deep(ul) {
  list-style: disc;
}

.article-content :deep(ol) {
  list-style: decimal;
}

.article-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid #b70041;
  color: #57534e;
  font-weight: 600;
}
</style>
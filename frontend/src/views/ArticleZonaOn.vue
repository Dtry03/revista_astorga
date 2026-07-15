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

const currentUrl = computed(() => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.href;
});

const whatsappShareUrl = computed(() => {
  const text = encodeURIComponent(`${article.value?.title || "Noticia"} ${currentUrl.value}`);
  return `https://wa.me/?text=${text}`;
});

const twitterShareUrl = computed(() => {
  const text = encodeURIComponent(article.value?.title || "Noticia");
  const url = encodeURIComponent(currentUrl.value);
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
});

const facebookShareUrl = computed(() => {
  const url = encodeURIComponent(currentUrl.value);
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
});

async function loadArticle(slug) {
  if (!slug) {
    error.value = "No se encontró la noticia.";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = "";
  article.value = null;
  relatedArticles.value = [];

  try {
    const currentArticle = await getArticleBySlug(slug);
    article.value = currentArticle;

    const articles = await getArticles({
      limit: 8,
      category: currentArticle.category,
    });

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
  <main class="zonaon-bg min-h-screen text-[#111] overflow-x-hidden">
    <!-- MENU -->
    <header class="flex flex-col justify-center items-center border-stone-200 bg-white sticky top-0 z-50">
      <nav class="flex w-full mx-auto px-3 sm:px-6 py-1 items-center justify-center overflow-hidden">
        <div class="flex w-full max-w-5xl justify-center gap-4 sm:gap-6 md:gap-16 text-black text-[12px] sm:text-[13px] md:text-[16px]">
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
              <span class="w-6 h-0.5 bg-[#4AA3FF]"></span>
              <span class="w-6 h-0.5 bg-[#4AA3FF]"></span>
              <span class="w-6 h-0.5 bg-[#4AA3FF]"></span>
            </button>
          </div>

          <div class="flex text-center items-center justify-center min-w-0">
            <router-link
              to="/categoria/zonaon"
              class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#4AA3FF] leading-none whitespace-nowrap"
            >
              Zona<span class="text-[#B70041]">ON</span>
            </router-link>
          </div>

          <div class="flex justify-end items-center">
            <CircleUserRound
              :stroke-width="1.5"
              class="w-7 h-7 sm:w-8 sm:h-8 text-[#4AA3FF] hover:scale-105 transition shrink-0"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center w-full max-w-5xl gap-3 sm:gap-5 text-black text-[13px] md:text-[16px] py-2 px-4 overflow-hidden">
        <Smartphone class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#4AA3FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#4AA3FF] shrink-0" />

        <Newspaper class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#4AA3FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#4AA3FF] shrink-0" />

        <MessageSquareText class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#4AA3FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#4AA3FF] shrink-0" />

        <MessageSquareHeart class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#4AA3FF] hover:scale-105 transition shrink-0" />
        <hr class="border h-4 border-[#4AA3FF] shrink-0" />

        <Share2 class="w-4 sm:w-5 md:w-6 h-5 md:h-6 text-[#4AA3FF] hover:scale-105 transition shrink-0" />
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
          class="w-full bg-white border-t border-[#4AA3FF]/30"
        >
          <nav class="flex flex-col justify-center items-center">
            <p class="text-sm md:text-md border-b text-[#4AA3FF] font-bold border-[#4AA3FF]/40 lg:max-w-4xl w-full py-2 px-4">
              Secciones
            </p>

            <router-link
              to="/categoria/leon"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              León
            </router-link>

            <router-link
              to="/categoria/ponferrada"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Ponferrada
            </router-link>

            <router-link
              to="/categoria/astorga"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Astorga
            </router-link>

            <router-link
              to="/categoria/baneza"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Bañeza
            </router-link>

            <router-link
              to="/categoria/deportes"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Deportes
            </router-link>

            <router-link
              to="/categoria/motor"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Motor
            </router-link>

            <router-link
              to="/zonaon/"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Zona<span class="font-bold">ON</span>
            </router-link>

            <router-link
              to="/tendency/"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              #tendencias
            </router-link>

            <router-link
              to="/categoria/tablon"
              class="text-sm md:text-[16px] border-b border-[#4AA3FF]/20 lg:max-w-4xl w-full py-2 px-4 hover:text-[#B70041] text-black"
              @click="menuOpen = false"
            >
              Tablón
            </router-link>
          </nav>
        </div>
      </transition>

      <div>
        <p class="text-[8px] sm:text-[9px] md:text-[10px] py-2 px-3 text-center font-bold text-[#4AA3FF]">
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
      class="max-w-6xl mx-auto px-3 sm:px-4 pb-16 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 overflow-hidden"
    >
      <!-- ARTÍCULO -->
      <article class="w-full max-w-[760px] min-w-0">
        <div class="bg-white/92 backdrop-blur-sm border border-[#4AA3FF]/20 px-4 sm:px-6 md:px-8 py-6 sm:py-8 shadow-sm">
          <p class="uppercase text-[12px] sm:text-[15px] tracking-[0.18em] sm:tracking-[0.2em] text-[#B70041] font-black">
            {{ article.category }}
          </p>

          <h1 class="text-[30px] sm:text-[40px] md:text-[52px] leading-[1.02] font-black mt-3 text-black break-words">
            {{ article.title }}
          </h1>

          <p class="text-[16px] sm:text-[18px] md:text-[21px] text-[#4AA3FF] font-semibold leading-relaxed mt-4">
            {{ article.excerpt }}
          </p>

          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-stone-500 mt-5">
            <span>Redacción</span>
            <span>•</span>
            <span>{{ article.category }}</span>
            <span>•</span>
            <span>{{ formattedDate }}</span>
          </div>

          <!-- COMPARTIR SUPERIOR -->
          <div class="flex flex-wrap gap-2 mt-5">
            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-blue-600 flex justify-center items-center">
              <a
                :href="facebookShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="fa-brands fa-facebook-f text-white text-sm"
                aria-label="Compartir en Facebook"
              ></a>
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-pink-500 flex justify-center items-center">
              <a
                href="#"
                class="fa-brands fa-instagram text-white text-sm"
                aria-label="Instagram"
              ></a>
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-green-600 flex justify-center items-center">
              <a
                :href="whatsappShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="fa-brands fa-whatsapp text-white text-sm"
                aria-label="Compartir por WhatsApp"
              ></a>
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-stone-800 flex justify-center items-center">
              <a
                :href="twitterShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="fa-brands fa-x-twitter text-white text-sm"
                aria-label="Compartir en X"
              ></a>
            </span>
          </div>

          <!-- PUBLICIDAD LEADERBOARD 728x90 -->
          <div class="w-full my-7 overflow-hidden">
            <AdSlot placement="leaderboard_728x90" />
          </div>

          <img
            :src="getArticleImage(article)"
            :alt="article.title"
            class="w-full h-64 sm:h-[360px] md:h-[460px] object-cover mt-5"
          />

          <p class="text-[11px] text-stone-500 mt-2">
            Imagen principal de la información.
          </p>

          <!-- PUBLICIDAD RECTÁNGULO MÓVIL 336x280 -->
          <div class="lg:hidden w-full my-7 overflow-hidden">
            <AdSlot placement="rectangle_336x280" />
          </div>

          <!-- CUERPO REAL DEL ARTÍCULO -->
          <div
            v-if="articleBodyHtml"
            class="article-content mt-8 text-[16px] md:text-[18px] leading-[1.85] md:leading-[1.9] text-stone-800 min-w-0"
            v-html="articleBodyHtml"
          ></div>

          <div
            v-else
            class="mt-8 text-[16px] md:text-[18px] leading-[1.85] md:leading-[1.9] text-stone-800 min-w-0"
          >
            <p>
              {{ article.excerpt }}
            </p>
          </div>

          <!-- PUBLICIDAD 336x280 DESPUÉS DEL CUERPO -->
          <div class="w-full py-5 overflow-hidden">
            <AdSlot placement="rectangle_336x280" />
          </div>

          <!-- COMPARTIR INFERIOR -->
          <div class="flex flex-wrap items-center gap-2 mt-8 border-t border-b border-[#4AA3FF]/30 py-4">
            <span class="text-[11px] uppercase tracking-[0.2em] font-black text-[#4AA3FF] mr-2">
              Compartir
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-blue-600 flex justify-center items-center">
              <a
                :href="facebookShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="fa-brands fa-facebook-f text-white text-sm"
                aria-label="Compartir en Facebook"
              ></a>
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-pink-500 flex justify-center items-center">
              <a
                href="#"
                class="fa-brands fa-instagram text-white text-sm"
                aria-label="Instagram"
              ></a>
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-green-600 flex justify-center items-center">
              <a
                :href="whatsappShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="fa-brands fa-whatsapp text-white text-sm"
                aria-label="Compartir por WhatsApp"
              ></a>
            </span>

            <span class="w-8 h-8 rounded-full transition hover:scale-105 bg-stone-800 flex justify-center items-center">
              <a
                :href="twitterShareUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="fa-brands fa-x-twitter text-white text-sm"
                aria-label="Compartir en X"
              ></a>
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
            <h2 class="text-xl font-black border-b-2 text-[#4AA3FF] border-[#4AA3FF] pb-2 mb-4">
              Te puede interesar
            </h2>

            <div class="space-y-4">
              <article
                v-for="item in relatedArticles"
                :key="item.id"
                class="grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)] gap-3 sm:gap-4 min-w-0 border-b border-[#4AA3FF]/20 pb-4"
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
                    class="block font-black leading-tight hover:underline break-words text-black"
                  >
                    {{ item.title }}
                  </router-link>

                  <p class="text-[10px] sm:text-[11px] uppercase text-[#B70041] tracking-[0.18em] sm:tracking-[0.2em] mt-1">
                    {{ item.category }}
                  </p>

                  <p class="text-[#4AA3FF] text-xs sm:text-sm mt-1 line-clamp-2">
                    {{ item.excerpt }}
                  </p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </article>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-40 space-y-7">
          <!-- 300x250 ROBAPÁGINAS -->
          <AdSlot placement="sidebar_300x250" />

          <!-- LO MÁS LEÍDO -->
          <div
            v-if="relatedArticles.length"
            class="bg-white/92 backdrop-blur-sm border border-[#4AA3FF]/20 p-4"
          >
            <h3 class="border-b-2 text-[#4AA3FF] pb-3 font-black border-[#4AA3FF] mb-3">
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
                  class="text-sm font-bold leading-tight hover:underline break-words text-black"
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
  color: #4aa3ff;
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
  border-left: 4px solid #4aa3ff;
  color: #57534e;
  font-weight: 600;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
}
</style>
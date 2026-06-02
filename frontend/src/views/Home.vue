<script setup>
import { ref, computed } from "vue";

import {Smartphone, Newspaper, MessageSquareText, MessageSquareHeart, Share2, CircleUserRound} from 'lucide-vue-next'

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
  <main class="min-h-screen bg-white text-[#1a1a1a]">
  <!-- MENU -->
<header class=" flex flex-col justify-center items-center border-stone-300 bg-white sticky top-0 z-50">
    <nav
    class="bg-[#B70041] flex w-full  mx-auto px-6 py-1 items-center justify-center text-stone-500">
    <div class="flex max-w-5xl gap-5 md:gap-15 text-white md:text-[16px] text-[13px]">
    <a href="#" class="hover:underline">León</a>
    <a href="#" class="hover:underline">Ponferrada</a> 
    <a href="#" class="hover:underline">Astorga</a>
    <a href="#" class="hover:underline">Bañeza</a>
    </div>

  </nav>

    <div class="bg-white w-full max-w-7xl mx-auto">

    

      <!-- LOGO -->
      <div class="flex items-center justify-center gap-5 mx-5">
       <div class="flex items-center justify-center mr-8">  
      <button
        @click="menuOpen = !menuOpen"
        class="flex flex-col gap-1.5"
      >
        <span class="w-6 h-0.5 bg-[#B70041]"></span>
        <span class="w-6 h-0.5 bg-[#B70041]"></span>
        <span class="w-6 h-0.5 bg-[#B70041]"></span>
      </button>

      </div>
        <div class="flex  text-center  items-center justify-center">
          <img
            src="../assets/logo-imagen.png"
            alt="logo Horizonte León"
            class="w-36  md:w-60 "
          />

            <img
            src="../assets/logo.png"
            alt="logo Horizonte León"
            class="w-36  md:w-60 "
          />
        </div>
        <div class="flex justify-center items-center ml-12">
          <CircleUserRound  :stroke-width="1.5" class="w-8 h-8  text-[#B70041] hover:scale-105 transition" />
        </div>

             

     
      </div>
       </div>


    <div class="flex justify-center items-center max-w-5xl gap-5 md:gap-5 text-white md:text-[16px] text-[13px] border-r  ">
          <Smartphone class="w-4 md:w-6 h-6 text-[#B70041] hover:scale-105 transition" />
          <hr class="border h-4 border-[#B70041]">
          <Newspaper class="w-4 md:w-6 h-6 text-[#B70041] hover:scale-105 transition"  />
          <hr class="border h-4 border-[#B70041]">
          <MessageSquareText class="w-4 md:w-6 h-6 text-[#B70041] hover:scale-105 transition" />
          <hr class="border h-4 border-[#B70041]">
          <MessageSquareHeart class="w-4 md:w-6 h-6 text-[#B70041] hover:scale-105 transition" />
          <hr class="border h-4 border-[#B70041]">
          <Share2 class="w-4 md:w-6 h-6 text-[#B70041] hover:scale-105 transition" />

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
        class="w-full bg-[#B70041]/10 my-2"
      >

        <nav class="flex justify-center items-center gap-5 py-2">

          <router-link
            to="/"
            class="text-sm md:text-[16px] border-b border-white/10 hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Deportes
          </router-link>

          <router-link
            to="/categoria/cultura"
            class="text-sm md:text-[16px] border-b border-white/10 hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Motor
          </router-link>

          <router-link
            to="/categoria/economia"
            class="text-sm md:text-[16px] border-b border-white/10 hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            #tendencias
          </router-link>

          <router-link
            to="/categoria/deporte"
            class="text-sm md:text-[16px] border-b border-white/10 hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            ZonaON
          </router-link>

                    <router-link
            to="/categoria/deporte"
            class="text-sm md:text-[16px] border-b border-white/10 hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Tablón
          </router-link>




        </nav>

      </div>

    </transition>
    <div>
      <p class=" text-[9px] md:text-[10px] py-2 font-bold">INFORMACIÓN SIN LIMITES.<span class="text-[#B70041]"> CONECTAMOS CONTIGO</span> </p>
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
                class="block text-xl sm:text-3xl md:text-4xl font-black teading-relaxed text-justify hyphens-auto max-w-[65ch] hover:underline "
              >
                {{ mainArticle.title }}
              </router-link>

              <p class="uppercase text-[10px] mt-1 font-extrabold tracking-[0.25em] text-[#B70041]">
                {{ mainArticle.category }}
              </p>

              <p class="text-stone-600 mt-1 teading-relaxed text-[12px] text-justify hyphens-auto max-w-[65ch]">
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
              <div class="grid grid-cols-2 sm:grid-cols-[220px_1fr] md:grid-cols-[240px_1fr] gap-4 sm:gap-5">
                <img
                  :src="article.cover_image"
                  class="w-full h-48 sm:h-32 md:h-28 object-cover"
                />

                <div>
               
                  <router-link
                    :to="`/articulo/${article.slug}`" class="text-xl sm:text-2xl font-semibold leading-tight mt-2 hover:underline">
                    {{ article.title }}
                  </router-link>
                  <p class="uppercase text-[10px] font-black tracking-[0.2em] mt-2 text-[#B70041]">
                    {{ article.category }}
                  </p>


                  <p class="text-sm text-stone-600 leading-relaxed mt-2">
                    {{ article.excerpt }}
                  </p>

                </div>
              </div>
            </article>
          </div>

        </div>
      </section>

      

   
  </main>
  
</template>
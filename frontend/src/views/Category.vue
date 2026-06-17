<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import {Smartphone, Newspaper, MessageSquareText, MessageSquareHeart, Share2, CircleUserRound} from 'lucide-vue-next'

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
    : "Actualidad";
});

const mainArticle = computed(() => articles[0]);
const listArticles = computed(() => articles.slice(1));
</script>

<template>
  <main class="min-h-screen bg-white text-[#111]">
     <!-- MENU -->
<header class=" flex flex-col justify-center items-center border-stone-300 bg-white sticky top-0 z-50">
    <nav
    class="bg-[#B70041] flex w-full  mx-auto px-6 py-1 items-center justify-center text-stone-500">
    <div class="flex max-w-5xl gap-5 md:gap-15 text-white md:text-[16px] text-[13px]">
    <a href="/categoria/leon" class="hover:underline">León</a>
    <a href="/categoria/ponferrada" class="hover:underline">Ponferrada</a> 
    <a href="/categoria/astorga" class="hover:underline">Astorga</a>
    <a href="/categoria/banneza" class="hover:underline">Bañeza</a>
    </div>

  </nav>

    <div class="bg-white w-full  mx-auto ">

    

      <!-- LOGO -->
      <div class="flex items-center justify-center gap-5 md:gap-40 mx-5 ">
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
        <div class="flex  text-center  items-center justify-center md:gap-2">
          <img
            src="../assets/logo-imagen.png"
            alt="logo Horizonte León"
            class="w-36  md:w-70 "
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
        class="lg:max-w-4xl w-full  my-2 "
      >

        <nav class="flex flex-col justify-center items-center  ">

          <p class="text-md md:text-md border-b text-[#B70041] font-bold border-[#B70041]  lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]">
            Secciones
          </p>
          
             <router-link
            to ="/categoria/leon"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            León
          </router-link>

          <router-link
            to ="/categoria/ponferrada"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Ponferrada
          </router-link>

          <router-link
            to ="/categoria/astorga"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Astorga
          </router-link>

          <router-link
            to ="/categoria/banneza"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Bañeza
          </router-link>

          <router-link
            to = "/categoria/deportes"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Deportes
          </router-link>

        
          
          <router-link
            to = "/categoria/motor"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center   hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Motor
          </router-link>

          <router-link
            to = "/categoria/zonaon"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Zona<span class=" font-bold">ON</span>
          </router-link>

             <router-link
            to ="/categoria/tendencias"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5 items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            #tendencias
          </router-link>

                    <router-link
            to ="/categoria/tablon"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 lg:max-w-4xl w-full py-2 pl-5  hover:text-[#B70041]"
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

    <!-- PUBLICIDAD SUPERIOR -->
    <section class="max-w-5xl mx-auto px-4 py-4">
      <div class="border border-stone-200 bg-stone-50 h-28 flex items-center justify-center text-stone-400 text-xs uppercase tracking-[0.25em]">
        Publicidad 970x250
      </div>
    </section>

    <!-- CONTENEDOR PRINCIPAL -->
    <section class="max-w-5xl mx-auto px-4 pb-16 grid lg:grid-cols-[1fr_300px] gap-8">
      <!-- COLUMNA IZQUIERDA -->
      <div>
        <div class="border-b-2 border-[#B70041] mb-5 flex items-center gap-2">
          <span class="w-3 h-3 bg-[#B70041]"></span>
          <h2 class="text-xl font-bold capitalize text-[#B70041]">
            {{ categoryName }}
          </h2>
        </div>

        <!-- NOTICIA PRINCIPAL -->
        <article v-if="mainArticle" class="mb-8">
          <router-link :to="`/articulo/${mainArticle.slug}`">
            <img
              :src="mainArticle.cover_image"
              :alt="mainArticle.title"
              class="w-full h-[320px] object-cover"
            />

            <h3 class="text-2xl md:text-3xl font-black leading-tight mt-3 hover:underline">
              {{ mainArticle.title }}
            </h3>
          </router-link>

          <p class="text-xs uppercase text-[#B70041]  tracking-[0.2em] mt-2">
            {{ mainArticle.category }}
          </p>

          <p class="text-stone-600 text-sm mt-2 leading-relaxed">
            {{ mainArticle.excerpt }}
          </p>
        </article>

        <!-- LISTA DE ARTÍCULOS -->
        <div class="space-y-5">
          <article
            v-for="article in listArticles"
            :key="article.id"
            class="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-4 border-b border-[#B70041]/30 pb-5"
          >
            <router-link :to="`/articulo/${article.slug}`">
              <img
                :src="article.cover_image"
                :alt="article.title"
                class="w-full h-24 md:h-32 object-cover "
              />
            </router-link>

            <div>
              <router-link
                :to="`/articulo/${article.slug}`"
                class="text-lg md:text-xl font-black leading-tight hover:underline"
              >
                {{ article.title }}
              </router-link>

              <p class="text-xs uppercase text-[#B70041] tracking-[0.2em] mt-2">
                {{ article.category }}
              </p>

              <p class="text-stone-600 text-sm mt-2 leading-relaxed line-clamp-3">
                {{ article.excerpt }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-20 space-y-6">
          <div class="border border-stone-200 bg-stone-50 h-[300px] flex items-center justify-center text-stone-400 text-xs uppercase tracking-[0.25em]">
            Publicidad 300x250
          </div>

          <div>
            <h3 class="font-bold border-b-2 border-[#B70041] text-[#B70041] pb-2 mb-3">
              Lo más leído
            </h3>

            <ol class="space-y-4">
              <li
                v-for="(article, index) in articles.slice(0, 5)"
                :key="article.id"
                class="grid grid-cols-[30px_1fr] gap-3"
              >
                <span class="text-[#B70041] ">
                  {{ index + 1 }}
                </span>

                <router-link
                  :to="`/articulo/${article.slug}`"
                  class="text-sm font-bold leading-tight hover:underline"
                >
                  {{ article.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <div class="border border-stone-200 bg-stone-50 h-[600px] flex items-center justify-center text-stone-400 text-xs uppercase tracking-[0.25em]">
            Publicidad 300x600
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>
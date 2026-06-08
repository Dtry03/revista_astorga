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
</script>

<template>
  <main class="min-h-screen bg-white text-[#111]">
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
        <div class="flex  text-center  items-center justify-center md:gap-40">
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
        class="w-full bg-[#B70041]/10 my-2 "
      >

        <nav class="flex flex-col justify-center items-center  w-full">

          <p class="text-md md:text-md border-b text-[#B70041] font-bold border-[#B70041]  w-[99vw] py-2 text-center items-center  hover:text-[#B70041]">
            Secciones
          </p>
          
             <router-link
            to ="/categoria/leon"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            León
          </router-link>

          <router-link
            to ="/categoria/ponferrada"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Ponferrada
          </router-link>

          <router-link
            to ="/categoria/astorga"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Astorga
          </router-link>

          <router-link
            to ="/categoria/banneza"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Bañeza
          </router-link>

          <router-link
            to = "/categoria/deportes"
            class="text-sm md:text-[16px] border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Deportes
          </router-link>

        
          
          <router-link
            to = "/categoria/motor"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center   hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            Motor
          </router-link>

          <router-link
            to = "/categoria/zonaon"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            ZonaON
          </router-link>

             <router-link
            to ="/categoria/tendencias"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 w-[99vw] py-2 text-center items-center  hover:text-[#B70041]"
            @click="menuOpen = false"
          >
            #tendencias
          </router-link>

                    <router-link
            to ="/categoria/tablon"
            class="text-sm md:text-[16px]  border-b border-[#B70041]/20 w-[99vw] py-2 text-center  hover:text-[#B70041]"
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
    <section class="max-w-[1040px] mx-auto px-4 py-3">
      <div class="h-[90px] bg-stone-50 border border-stone-200 flex items-center justify-center text-[11px] text-stone-400 uppercase tracking-[0.25em]">
        Publicidad superior 970x90
      </div>
    </section>

    <!-- LAYOUT PRINCIPAL -->
    <section class="max-w-[1040px] mx-auto px-4 grid lg:grid-cols-[680px_300px] gap-8">
      <!-- ARTÍCULO -->
      <article>
        <p class="uppercase text-[15px] tracking-[0.2em]  text-[#B70041]">
          {{ article.category }}
        </p>

        <h1 class="text-[30px] md:text-[42px] leading-[1.05] font-black mt-2">
          {{ article.title }}
        </h1>

        <p class="text-[17px] md:text-[19px] text-stone-600 leading-relaxed mt-3">
          {{ article.excerpt }}
        </p>

        <div class="flex items-center gap-3 text-[12px] text-stone-500 mt-4">
          <span>Redacción</span>
          <span>•</span>
          <span>Astorga</span>
          <span>•</span>
          <span>Actualizado hoy</span>
        </div>

        <div class="flex gap-2 mt-4">
          <span class=" w-6 h-6 rounded-full transition hover:scale-105 bg-blue-600 flex justify-center items-center"><a href="" class="fa-brands fa-facebook-f text-white"></a></span>
          <span class="w-6 h-6 rounded-full transition hover:scale-105 bg-pink-500 flex justify-center items-center"><a href="" class="fa-brands fa-instagram text-white"></a></span>
          <span class="w-6 h-6 rounded-full transition hover:scale-105 bg-green-600 flex justify-center items-center"><a href="" class="fa-brands fa-whatsapp text-white"></a></span>
          <span class="w-6 h-6 rounded-full transition hover:scale-105 bg-stone-800 flex justify-center items-center"><a href="" class="fa-brands fa-x-twitter text-white"></a></span>
        </div>

        <img
          :src="article.cover_image"
          :alt="article.title"
          class="w-full h-[360px] md:h-[460px] object-cover mt-5"
        />

        <p class="text-[11px] text-stone-500 mt-1">
          Imagen principal de la información.
        </p>

        <!-- CUERPO -->
        <div class="mt-7 grid md:grid-cols-[1fr_250px] gap-6">
          <div class="text-[16px] leading-[1.85] text-stone-800 space-y-5">
            <p>
              Astorga afronta los próximos meses con una programación cultural pensada para vecinos,
              visitantes y negocios locales. La ciudad busca reforzar su actividad con propuestas
              culturales, gastronómicas y turísticas.
            </p>

            <p>
              La iniciativa pretende generar movimiento en el centro urbano, aumentar la presencia de
              visitantes y mejorar la conexión entre la vida cultural y el comercio de proximidad.
            </p>

            <!-- AD INTERIOR -->
            <div class="md:hidden h-[250px] border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-400 text-[11px] uppercase tracking-[0.2em]">
              Publicidad 300x250
            </div>

            <p>
              Según fuentes cercanas a la organización, la agenda se irá completando durante las
              próximas semanas con nuevos actos, actividades familiares y eventos al aire libre.
            </p>

            <p>
              El objetivo principal es convertir la actividad cultural en una herramienta útil para
              dinamizar la ciudad y dar mayor visibilidad a los negocios locales.
            </p>

            <div class="h-[250px] border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-400 text-[11px] uppercase tracking-[0.2em]">
              Publicidad integrada 300x250
            </div>

            <p>
              Este tipo de programación permite mantener viva la actividad durante más meses del año,
              no solo en fechas concretas o temporadas de mayor afluencia turística.
            </p>

            <p>
              La respuesta de los negocios locales será clave para medir el impacto real de estas
              iniciativas en la actividad comercial de la ciudad.
            </p>
          </div>

          <!-- AD DENTRO DEL CUERPO -->
          <aside class="hidden md:block space-y-5">
            <div class="h-[300px] border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-400 text-[11px] uppercase tracking-[0.2em]">
              Publicidad 250x300
            </div>

            <div class="h-[180px] border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-400 text-[11px] uppercase tracking-[0.2em]">
              Anuncio
            </div>
          </aside>
        </div>

        <!-- COMPARTIR -->
        <div class="flex items-center gap-2 mt-8 border-t border-b border-[#B70041]/30 py-4">
          <span class="text-[11px] uppercase tracking-[0.2em] font-black text-[#B70041]/70 mr-2">
            Compartir
          </span>
         
          <span class=" w-6 h-6 rounded-full transition hover:scale-105 bg-blue-600 flex justify-center items-center"><a href="" class="fa-brands fa-facebook-f text-white"></a></span>
          <span class="w-6 h-6 rounded-full transition hover:scale-105 bg-pink-500 flex justify-center items-center"><a href="" class="fa-brands fa-instagram text-white"></a></span>
          <span class="w-6 h-6 rounded-full transition hover:scale-105 bg-green-600 flex justify-center items-center"><a href="" class="fa-brands fa-whatsapp text-white"></a></span>
          <span class="w-6 h-6 rounded-full transition hover:scale-105 bg-stone-800 flex justify-center items-center"><a href="" class="fa-brands fa-x-twitter text-white"></a></span>
 
        </div>

        <!-- RELACIONADAS -->
        <section class="my-8">
          <h2 class="text-xl font-bold border-b-2 border-b  text-[#B70041] border-[#B70041] pb-2 mb-4">
            Te puede interesar
          </h2>

          <div class="space-y-4">
            <article
              v-for="item in relatedArticles"
              :key="item.id"
              class="grid grid-cols-[130px_1fr] gap-4"
            >
              <img :src="item.cover_image" class="w-full h-24 object-cover" />

              <div>
                <router-link
                  :to="`/articulo/${item.slug}`"
                  class="font-black leading-tight hover:underline"
                >
                  {{ item.title }}
                </router-link>

                <p class="text-[11px] uppercase text-[#B70041]  tracking-[0.2em] mt-1">
                  {{ item.category }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </article>

      <!-- SIDEBAR DERECHA -->
      <aside class="hidden lg:block">
        <div class="sticky top-14 space-y-6">
          <div class="h-[300px] border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-400 text-[11px] uppercase tracking-[0.2em]">
            Publicidad 300x250
          </div>

          <div class="">
            <h3 class="border-b-2 text-[#B70041] pb-3 font-bold border-[#B70041] mb-3">Lo más leído</h3>
            <ol class="space-y-3">
              <li
                v-for="(item, index) in relatedArticles"
                :key="item.id"
                class="grid grid-cols-[24px_1fr] gap-2"
              >
                <span class="text-[#B70041] text-md">{{ index + 1 }}</span>
                <router-link
                  :to="`/articulo/${item.slug}`"
                  class="text-sm font-bold leading-tight hover:underline"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ol>
          </div>

          <div class="h-[600px] border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-400 text-[11px] uppercase tracking-[0.2em]">
            Publicidad 300x600
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>
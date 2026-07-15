<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getAdByPlacement } from "../services/adsApi";

const props = defineProps({
  placement: {
    type: String,
    required: true,
  },
});

const ad = ref(null);
const loading = ref(true);

const fallbackConfig = {
  billboard_970x250: {
    label: "Publicidad",
    size: "970 x 250",
    format: "Billboard",
    boxClass:
      "w-full max-w-[970px] aspect-[970/250] min-h-[86px] sm:min-h-[110px] md:min-h-[120px]",
    textSizeClass: "text-lg sm:text-xl md:text-3xl",
  },
  leaderboard_728x90: {
    label: "Publicidad",
    size: "728 x 90",
    format: "Leaderboard",
    boxClass:
      "w-full max-w-[728px] aspect-[728/90] min-h-[58px] sm:min-h-[70px]",
    textSizeClass: "text-base sm:text-lg md:text-2xl",
  },
  rectangle_336x280: {
    label: "Publicidad",
    size: "336 x 280",
    format: "Rectángulo",
    boxClass: "w-full max-w-[336px] aspect-[336/280]",
    textSizeClass: "text-lg sm:text-xl",
  },
  sidebar_300x250: {
    label: "Publicidad",
    size: "300 x 250",
    format: "Robapáginas",
    boxClass: "w-[300px] h-[250px]",
    textSizeClass: "text-2xl",
  },
  sidebar_300x600: {
    label: "Publicidad",
    size: "300 x 600",
    format: "Half Page",
    boxClass: "w-[300px] h-[600px]",
    textSizeClass: "text-2xl",
  },
};

const config = computed(() => {
  return fallbackConfig[props.placement] || fallbackConfig.leaderboard_728x90;
});

const hasRealAd = computed(() => {
  return ad.value && ad.value.image_url;
});

async function loadAd() {
  loading.value = true;

  try {
    ad.value = await getAdByPlacement(props.placement);
  } catch (err) {
    console.error(err);
    ad.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(loadAd);

watch(
  () => props.placement,
  () => {
    loadAd();
  }
);
</script>

<template>
  <div class="w-full flex justify-center overflow-hidden">
    <component
      :is="hasRealAd && ad.target_url ? 'a' : 'div'"
      :href="hasRealAd && ad.target_url ? ad.target_url : undefined"
      target="_blank"
      rel="noopener noreferrer"
      :class="[
        config.boxClass,
        'bg-stone-50 border border-stone-300 flex flex-col items-center justify-center text-stone-400 px-4 overflow-hidden',
      ]"
    >
      <img
        v-if="hasRealAd"
        :src="ad.image_url"
        :alt="ad.alt_text || ad.name || 'Publicidad'"
        class="w-full h-full object-cover"
      />

      <template v-else>
        <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-1">
          {{ config.label }}
        </span>

        <span
          :class="[
            config.textSizeClass,
            'font-light tracking-[0.12em] sm:tracking-[0.15em]',
          ]"
        >
          {{ config.size }}
        </span>

        <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em]">
          {{ config.format }}
        </span>
      </template>
    </component>
  </div>
</template>
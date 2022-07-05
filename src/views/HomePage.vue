<template>
  <NowPlaying />
  <CarouselTemplate
    title="Top Rated"
    getter="movies/topRated"
    action="movies/loadTopRated"
  />
  <CarouselTemplate
    title="Top Series"
    getter="series/series"
    action="series/loadSeries"
  />
</template>

<script>
import NowPlaying from "../components/movies/NowPlayingCarousel.vue";
import CarouselTemplate from "../components/UI/CarouselTemplate.vue";

export default {
  components: {
    NowPlaying,
    CarouselTemplate,
  },
};
</script>


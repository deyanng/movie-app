<template>
  <NowPlaying />
  <CarouselTemplate title="Top Rated" category="movie" />
  <CarouselTemplate title="Top Series" category="tv" />
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


<template>
  <now-playing></now-playing>
  <carousel-template
    title="Top Rated"
    getter="movies/topRated"
    action="movies/loadTopRated"
  ></carousel-template>
  <carousel-template
    title="Top Series"
    getter="series/series"
    action="series/loadSeries"
  ></carousel-template>
  <!-- <top-rated-movies></top-rated-movies>
  <top-rated-series></top-rated-series> -->
</template>

<script>
import NowPlaying from "../components/movies/NowPlayingCarousel.vue";
import CarouselTemplate from "../components/UI/CarouselTemplate.vue";
// import TopRatedMovies from "../components/movies/TopRatedMovies.vue";
// import TopRatedSeries from "../components/series/TopRatedSeries.vue";
export default {
  components: {
    NowPlaying,
    CarouselTemplate,
    // TopRatedMovies,
    // TopRatedSeries,
  },
};
</script>


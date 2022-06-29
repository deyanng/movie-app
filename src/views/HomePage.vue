<template>
  <now-playing></now-playing>
  <top-rated-movies></top-rated-movies>
  <top-rated-series></top-rated-series>
</template>

<script>
import NowPlaying from "../components/movies/NowPlayingCarousel.vue";
import TopRatedMovies from "../components/movies/TopRatedMovies.vue";
import TopRatedSeries from "../components/series/TopRatedSeries.vue";
export default {
  components: {
    NowPlaying,
    TopRatedMovies,
    TopRatedSeries,
  },
};
</script>


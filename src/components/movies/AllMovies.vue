<template>
  <div class="wraper">
    <div class="item" v-for="movie in getNowPlaying" :key="movie.id">
      <h3>{{ movie.original_title }}</h3>
      <img :src="imgUrl + movie.backdrop_path" alt="Movie image" />
    </div>
    <hr class="solid" />
    <h1>TOP RATED MOVIES</h1>
    <hr class="solid" />
    <div class="item" v-for="movie in getTopRated" :key="movie.id">
      <h3>{{ movie.original_title }}</h3>
      <img :src="imgUrl + movie.poster_path" alt="Movie image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "https://image.tmdb.org/t/p/w500",
    };
  },
  computed: {
    getNowPlaying() {
      return this.$store.getters["movies/nowPlaying"];
    },
    getTopRated() {
      return this.$store.getters["movies/topRated"];
    },
  },
  methods: {
    async loadNowPlaying() {
      try {
        await this.$store.dispatch("movies/loadNowPlaying");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    async loadTopRated() {
      try {
        await this.$store.dispatch("movies/loadTopRated");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadNowPlaying();
    this.loadTopRated();
  },
};
</script>

<style scoped>
div.wraper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
div.item {
  flex-basis: 33.333333%;
}

hr.solid {
  border-top: 4px solid black;
}
</style>
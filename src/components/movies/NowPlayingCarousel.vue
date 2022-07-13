<template>
  <div class="container">
    <transition-group class="carousel" tag="div">
      <div
        class="carousel-item"
        v-for="movie in array"
        :key="movie.id"
        :id="movie.id"
      >
        <router-link
          :to="{
            name: 'MovieDetails',
            params: { id: movie.id, kind: movie.kind },
          }"
        >
          <div class="image">
            <img :src="imgUrl + movie.backdrop_path" alt="Movie image" />
          </div>
          <div class="info">
            <h2>{{ movie.title }}</h2>
            <h4>Rating: {{ movie.vote_average }}/10</h4>
            <h5>Release date: {{ movie.release_date }}</h5>
          </div>
        </router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "https://image.tmdb.org/t/p/w500",
      array: [],
      intrevalId: null,
    };
  },
  computed: {
    getNowPlaying() {
      return this.$store.getters["movies/nowPlaying"];
    },
  },
  methods: {
    async loadNowPlaying() {
      try {
        await this.$store.dispatch("movies/loadNowPlaying");
        this.array = this.getNowPlaying;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadNowPlaying();
  },
  mounted() {
    this.intervalId = setInterval(() => {
      const first = this.array.shift();
      this.array = this.array.concat(first);
    }, 4000);
  },
  unmounted() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  /* flex-wrap: wrap; */
  /* width: 100%; */
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 320px;
}
.carousel-item {
  flex: 0 0 300px;
  height: 300px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 2s ease-in-out;
}
.carousel-item img {
  border-radius: 20px;
}
.info {
  color: #ffffff;
  opacity: 0.8;
  position: absolute;
  left: 20px;
  bottom: 50px;
  text-align: left;
}
.carousel-item:first-of-type {
  opacity: 0;
}
.carousel-item:last-of-type {
  opacity: 0;
}
</style>
<template>
  <div class="container">
    <transition-group class="carousel" tag="div">
      <div
        class="carousel-item"
        v-for="movie in array"
        :key="movie.id"
        :id="movie.id"
      >
        <div class="image">
          <router-link :to="'/movie/' + movie.id" :id="movie.id"
            ><img :src="imgUrl + movie.backdrop_path" alt="Movie image"
          /></router-link>
        </div>
        <div class="info">
          <h2>{{ movie.title }}</h2>
          <h4>Rating: {{ movie.vote_average }}/10</h4>
          <h5>Release date: {{ movie.release_date }}</h5>
        </div>
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
    setInterval(() => {
      const first = this.array.shift();
      this.array = this.array.concat(first);
    }, 5000);
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
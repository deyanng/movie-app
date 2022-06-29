<template>
  <h2>Top Rated Series</h2>
  <div class="containerr">
    <div class="carousel-controls">
      <button class="btn" @click="previous">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="btn" @click="next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <transition-group class="carousel" tag="div">
      <div class="carousel-item" v-for="movie in array" :key="movie.id">
        <div class="image">
          <img :src="imgUrl + movie.poster_path" alt="Movie poster" />
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
    getSeries() {
      return this.$store.getters["series/series"];
    },
  },
  methods: {
    async loadSeries() {
      try {
        await this.$store.dispatch("series/loadSeries");
        this.array = this.getSeries;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    next() {
      const first = this.array.shift();
      this.array = this.array.concat(first);
    },
    previous() {
      const last = this.array.pop();
      this.array = [last].concat(this.array);
    },
  },
  created() {
    this.loadSeries();
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
  color: #ffffff;
  opacity: 0.7;
  margin-left: 50px;
  margin-top: 50px;
  margin-bottom: -30px;
}

.containerr {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.carousel-controls {
  display: flex;
  margin-left: 1000px;
  margin-bottom: 20px;
}
.btn {
  margin-right: 10px;
}

.btn .fa-solid {
  font-size: 20pt;
  color: #ffffff;
  opacity: 0.8;
}
.btn .fa-solid:hover {
  color: #aaa7a7;
}
.carousel {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 280px;
}
.carousel-item {
  flex: 0 0 220px;
  height: 280px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-in-out;
}

.carousel-item img {
  border-radius: 20px;
  width: 85%;
  height: 100%;
}

.carousel-item:first-of-type {
  opacity: 0;
}
.carousel-item:last-of-type {
  opacity: 0;
}
</style>
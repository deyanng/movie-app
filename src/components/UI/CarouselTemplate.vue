<template>
  <h2>{{ title }}</h2>
  <div class="container">
    <div class="carousel-controls">
      <button class="btn" @click="previous">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="btn" @click="next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>

  <transition-group class="carousel" tag="div" name="carousel">
    <div class="carousel-item" v-for="object in getData" :key="object.id">
      <!-- router-link -->
      <router-link
        :to="{
          name: object.kind === 'movie' ? 'MovieDetails' : 'TvDetails',
          params: { id: object.id, kind: object.kind },
        }"
      >
        <div class="image">
          <img :src="imgUrl + object.poster_path" alt="Media poster" />
          <!-- /router-link -->
        </div>
      </router-link>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imgUrl: "https://image.tmdb.org/t/p/w500",
      startPage: 1,
      currPage: 1,
    };
  },
  computed: {
    setGetter() {
      if (this.category === "movie") {
        return "movies/topRated";
      } else if (this.category === "tv") {
        return "series/series";
      } else {
        return "";
      }
    },
    setAction() {
      if (this.category === "movie") {
        return "movies/loadTopRated";
      } else if (this.category === "tv") {
        return "series/loadSeries";
      } else {
        return "";
      }
    },
    getData() {
      return this.$store.getters[this.setGetter];
    },
  },
  watch: {
    currPage(newPage) {
      this.loadData(newPage);
    },
  },
  methods: {
    async loadData(value = this.currPage) {
      try {
        await this.$store.dispatch(this.setAction, { currPage: value });
      } catch (error) {
        this.error =
          error.message || "There is a problem with the fetch request!";
      }
    },
    next() {
      if (this.currPage > 10) {
        return;
      }
      this.currPage++;
    },
    previous() {
      if (this.currPage <= this.startPage) {
        return;
      }
      this.currPage--;
    },
  },
  mounted() {
    this.loadData();
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
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  min-height: 280px;
}
.carousel-item {
  flex: 0 0 220px;
  height: 280px;
  margin: 5px;
  display: flex;
}

.carousel-item img {
  border-radius: 20px;
  width: 85%;
  height: 100%;
}

.carousel-move,
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.8s cubic-bezier(0.5, 0.2, 0.5, 1);
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.carousel-leave-active {
  position: absolute;
}
</style>
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

  <transition-group class="carousel" tag="div">
    <div class="carousel-item" v-for="object in data" :key="object.id">
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
  props: ["title", "getter", "action"],
  data() {
    return {
      imgUrl: "https://image.tmdb.org/t/p/w500",
      data: [],
    };
  },
  computed: {
    getData() {
      return this.$store.getters[this.getter];
    },
  },
  methods: {
    async loadData() {
      try {
        await this.$store.dispatch(this.action);
        this.data = this.getData;
        // console.log(this.getData);
      } catch (error) {
        this.error =
          error.message || "There is a problem with the fetch request!";
      }
    },
    next() {
      const first = this.data.shift();
      this.data = this.data.concat(first);
    },
    previous() {
      const last = this.data.pop();
      this.data = [last].concat(this.data);
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
<template>
  <div
    v-if="searchingResult && searchingResult.length > 0"
    class="result-container"
  >
    <div class="result-item" v-for="result in searchingResult" :key="result.id">
      <router-link
        :class="{ disabled: result.media_type === 'person' }"
        :to="{
          name: result.media_type === 'movie' ? 'MovieDetails' : 'TvDetails',
          params: { id: result.id, kind: result.media_type },
        }"
      >
        <h2>
          {{
            result.original_title
              ? result.original_title
              : result.original_name
              ? result.original_name
              : result.name
              ? result.name
              : "No name"
          }}
        </h2>
        <img
          :src="
            result.poster_path
              ? imgUrl + result.poster_path
              : result.backdrop_path
              ? imgUrl + result.backdrop_path
              : result.profile_path
              ? imgUrl + result.profile_path
              : noImage
          "
          alt="Movie poster"
        />
      </router-link>
    </div>
  </div>
  <h1 v-else>There is no results for '{{ query }}'.</h1>
  <PaginationTemplate
    @clicked="
      getCurrentPage($event);
      scrollChange();
    "
  />
</template>

<script>
import PaginationTemplate from "../components/UI/PaginattionTemplate.vue";
export default {
  components: { PaginationTemplate },
  props: {
    query: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      searchingResult: [],
      currPage: 1,
      imgUrl: "https://image.tmdb.org/t/p/w500",
      noImage:
        "https://behssa.com/wp-content/uploads/2016/07/no-profile-img.gif",
    };
  },
  watch: {
    query(newVal) {
      this.searching(newVal, (this.currPage = 1));
    },
  },
  methods: {
    async searching(query = this.query, page = this.currPage) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=7074bb722049de6c4c14dd7d06db2407&query=${query}&page=${page}`
      );
      const resData = await response.json();
      this.searchingResult = resData.results.slice(0, 12);
    },
    getCurrentPage($event) {
      if ($event === "prev" && this.currPage > 1) {
        this.currPage -= 1;
      } else if ($event === "next" && this.currPage < 6) {
        this.currPage += 1;
      } else {
        this.currPage = $event;
      }
      this.searching(this.query, this.currPage);
    },
    scrollChange() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.searching();
  },
};
</script>

<style scoped>
h1 {
  color: #ffffff;
  margin: 300px auto;
}
.result-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.result-item {
  width: 25%;
  background-color: #0c1930;
  margin: 10px;
  padding: 5px;
  border-radius: 20px;
  flex-basis: 25%;
}
.result-item h2 {
  color: #ffffff;
}
a {
  text-decoration: none;
}
.result-item img {
  width: 350px;
  border-radius: 10px;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
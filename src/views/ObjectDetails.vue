<template>
  <div v-if="isReady" class="row details-row">
    <div class="col">
      <img
        class="poster"
        :src="imgUrl + objectDetails.poster_path"
        alt="Poster image"
      />
    </div>
    <div class="col info">
      <h1>
        {{
          objectDetails.original_title
            ? objectDetails.original_title
            : objectDetails.original_name
        }}
        <a :href="objectDetails.homepage" target="_blank" title="Visit homepage"
          ><i class="fa-solid fa-display"></i
        ></a>
      </h1>
      <h3 v-for="genre in objectDetails.genres" :key="genre.id">
        | {{ genre.name }} |
      </h3>
      <h5>{{ objectDetails.overview }}</h5>
    </div>
  </div>
  <div class="more-details">
    <nav class="nav">
      <a href="#credits" class="nav-link">Credits</a>
      <a href="#" class="nav-link">Reviews</a>
      <a href="#" class="nav-link">Videos</a>
      <a href="#" class="nav-link">Similar</a>
    </nav>
    <hr class="solid" />
    <!-- <h1>Credits</h1> -->
    <div v-if="objectCredits.length > 0" class="row" id="credits">
      <div
        class="col credits-col"
        v-for="credit in objectCredits"
        :key="credit.id"
      >
        <img :src="imgUrl + credit.profile_path" alt="Profile image" />
        <h4>{{ credit.name }}</h4>
        <p>{{ credit.character }}</p>
      </div>
      <hr class="solid" />
    </div>
    <h1>Reviews</h1>
    <hr class="solid" />
    <h1>Videos (optional)</h1>
    <hr class="solid" />
    <h1>Similar Movies</h1>
    <hr class="solid" />
  </div>
</template>

<script>
export default {
  props: ["id", "kind"],
  data() {
    return {
      objectDetails: null,
      objectCredits: null,
      objectReviews: null,
      objectVideos: null,
      objectSimilars: null,
      isReady: false,
      imgUrl: "https://image.tmdb.org/t/p/w500",
    };
  },
  computed: {
    details() {
      return this.$store.getters["details/details"];
    },
    credits() {
      return this.$store.getters["details/credits"];
    },
    reviews() {
      return this.$store.getters["details/reviews"];
    },
    videos() {
      return this.$store.getters["details/videos"];
    },
    similars() {
      return this.$store.getters["details/similars"];
    },
  },
  methods: {
    async loadObjectDetails() {
      await this.$store.dispatch("details/loadObjectDetails", {
        id: this.id,
        kind: this.kind,
      });
      this.objectDetails = this.details;
      this.isReady = true;
      // console.log(this.objectDetails.genres);
    },
    async loadObjectCredits() {
      await this.$store.dispatch("details/loadObjectCredits", {
        id: this.id,
        kind: this.kind,
      });
      this.objectCredits = this.credits;
      console.log(this.credits);
      this.isReady = true;
      // console.log(this.objectDetails.genres);
    },
  },
  created() {
    this.loadObjectDetails();
    this.loadObjectCredits();
  },
};
</script>

<style scoped>
.nav {
  justify-content: space-around;
}
.nav .nav-link {
  margin-top: 12px;
  /* padding: 10px; */
  width: 25%;
  border-radius: 10px;
  color: #c2c1c1;
}
.nav .nav-link:hover {
  color: #c2c1c1;
  background-color: #315799;
  border-radius: 10px;
}
.details-row {
  margin: 50px 80px;
}
i.fa-display {
  font-size: 22pt;
}
h3 {
  display: inline;
}
.info {
  margin-top: 60px;
}
.info > * {
  color: #c2c1c1;
  margin: 20px 0;
}

.col img.poster {
  max-width: 300px;
  border-radius: 20px;
}

.more-details {
  width: 100%;
  background: #182131 0% 0% no-repeat;
  /* background-color: #1b2b47; */
  color: #cecaca;
}
.credits-col {
  width: 15%;
  margin: 0 20px;
  padding: 10px;
  background-color: #1f2b3f;
  border-radius: 10px;
}
.credits-col img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}
.credits-col p {
  font-style: italic;
}
hr.solid {
  margin-top: 10px;
  border-top: 4px solid #cecaca;
}
</style>
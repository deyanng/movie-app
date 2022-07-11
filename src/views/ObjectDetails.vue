<template>
  <div v-if="objectDetails" class="row details-row">
    <div class="col">
      <img
        class="poster"
        :src="
          objectDetails.poster_path
            ? imgUrl + objectDetails.poster_path
            : objectDetails.backdrop_path
            ? imgUrl + objectDetails.backdrop_path
            : objectDetails.profile_path
            ? imgUrl + objectDetails.profile_path
            : noImage
        "
        alt="Poster image"
      />
    </div>
    <div class="col info">
      <h1>
        {{
          objectDetails.original_title
            ? objectDetails.original_title
            : objectDetails.original_name
            ? objectDetails.original_name
            : objectDetails.name
            ? objectDetails.name
            : "No name"
        }}
        <a :href="objectDetails.homepage" target="_blank" title="Visit homepage"
          ><i class="fa-solid fa-display"></i
        ></a>
      </h1>
      <h3 v-for="genre in objectDetails.genres" :key="genre.id">
        | {{ genre.name }} |
      </h3>
      <h5>
        {{
          objectDetails.overview
            ? objectDetails.overview
            : objectDetails.known_for_department
        }}
      </h5>
    </div>
  </div>
  <div class="more-details">
    <nav class="nav">
      <a href="#credits" class="nav-link">Credits</a>
      <a href="#reviews" class="nav-link">Reviews</a>
      <a href="#videos" class="nav-link">Videos</a>
      <a href="#similars" class="nav-link">Similar</a>
    </nav>
    <hr class="solid" />
    <div
      v-if="objectCredits && objectCredits.length > 0"
      class="row"
      id="credits"
    >
      <h2>Credits</h2>
      <div
        class="col credits-col"
        v-for="credit in objectCredits"
        :key="credit.id"
      >
        <img
          :src="credit.profile_path ? imgUrl + credit.profile_path : noImage"
          alt="Profile image"
        />
        <h4>{{ credit.name }}</h4>
        <p>{{ credit.character }}</p>
      </div>
    </div>
    <h2 v-else>There is no credits available!</h2>
    <hr class="solid" />
    <div
      v-if="objectReviews && objectReviews.length > 0"
      class="row reviews-row"
      id="reviews"
    >
      <h2>Reviews</h2>
      <div
        class="col reviews-col"
        v-for="review in objectReviews.slice(0, 2)"
        :key="review.id"
      >
        <img
          :src="
            review.author_details.avatar_path.height > 30
              ? review.author_details.avatar_path
              : noImage
          "
          alt="Author review avatar"
        />
        <!-- disableClick expect boolean, but works with string -->
        <vue3-star-ratings
          :numberOfStars="10"
          :showControl="false"
          disableClick="false"
          v-model="review.author_details.rating"
        />
        <h4>{{ review.author }}</h4>
        <p>{{ review.content.substr(0, 300) }}...</p>
      </div>
    </div>
    <h2 v-else>There is no reviews available!</h2>
    <hr class="solid" />

    <div v-if="objectVideos && objectVideos.length > 0" class="row" id="videos">
      <h2>Videos</h2>
      <div
        class="col video-col"
        v-for="video in objectVideos.slice(0, 3)"
        :key="video.id"
      >
        <iframe :src="videoUrl + video.key" allowfullscreen></iframe>
        <!-- CORS policy error with video tag -->
      </div>
    </div>
    <h2 v-else>There is no videos available!</h2>
    <hr class="solid" />
    <div
      class="row"
      v-if="objectSimilars && objectSimilars.length > 0"
      id="similars"
    >
      <h2>Similar Media</h2>
      <div
        class="col similars-col"
        v-for="similar in objectSimilars.slice(0, 5)"
        :key="similar.id"
      >
        <img :src="imgUrl + similar.poster_path" alt="Similar movie poster" />
      </div>
    </div>
    <h2 v-else>There is no similar media available!</h2>
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
      videoUrl: "https://www.youtube.com/embed/",
      noImage:
        "https://behssa.com/wp-content/uploads/2016/07/no-profile-img.gif",
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
    },
    async loadObjectCredits() {
      await this.$store.dispatch("details/loadObjectCredits", {
        id: this.id,
        kind: this.kind,
      });
      this.objectCredits = this.credits;
      this.isReady = true;
    },
    async loadObjectReviews() {
      await this.$store.dispatch("details/loadObjectReviews", {
        id: this.id,
        kind: this.kind,
      });
      this.objectReviews = this.reviews;
      this.isReady = true;
    },
    async loadObjectVideos() {
      await this.$store.dispatch("details/loadObjectVideos", {
        id: this.id,
        kind: this.kind,
      });
      this.objectVideos = this.videos;
      this.isReady = true;
    },
    async loadObjectSimilars() {
      await this.$store.dispatch("details/loadObjectSimilars", {
        id: this.id,
        kind: this.kind,
      });
      this.objectSimilars = this.similars;
      this.isReady = true;
    },
  },
  created() {
    this.loadObjectDetails();
    this.loadObjectCredits();
    this.loadObjectReviews();
    this.loadObjectVideos();
    this.loadObjectSimilars();
  },
};
</script>

<style scoped>
.nav {
  justify-content: space-around;
}
.nav .nav-link {
  margin-top: 12px;
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
  width: 90%;
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.credits-col p {
  font-style: italic;
}
.row {
  justify-content: space-around;
}
.reviews-col {
  width: 40%;
  max-width: 400px;
  margin: 0 20px;
  padding: 10px;
  background-color: #1f2b3f;
  border-radius: 10px;
}
.reviews-col img {
  width: 15%;
  border-radius: 50%;
}
.video-col {
  width: 33%;
  max-width: 600px;
  margin: 0 20px;
  padding: 10px;
  background-color: #1f2b3f;
  border-radius: 10px;
}
.video-col iframe {
  width: 500px;
  height: 300px;
  border-radius: 10px;
}
.similars-col {
  width: 20%;
  margin: 0 20px;
  padding: 10px;
  background-color: #1f2b3f;
  border-radius: 10px;
}
.similars-col img {
  width: 90%;
  border-radius: 20px;
}
hr.solid {
  margin-top: 10px;
  border-top: 4px solid #cecaca;
}
</style>
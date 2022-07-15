<template>
  <div
    v-if="details && Object.keys(details).length > 0"
    class="row details-row"
  >
    <div class="col">
      <img
        class="poster"
        :src="
          details.poster_path
            ? imgUrl + details.poster_path
            : details.backdrop_path
            ? imgUrl + details.backdrop_path
            : details.profile_path
            ? imgUrl + details.profile_path
            : noImage
        "
        alt="Poster image"
      />
    </div>
    <div class="col info">
      <h1>
        {{
          details.original_title
            ? details.original_title
            : details.original_name
            ? details.original_name
            : details.name
            ? details.name
            : "No name"
        }}
        <a :href="details.homepage" target="_blank" title="Visit homepage"
          ><i class="fa-solid fa-display"></i
        ></a>
      </h1>
      <h3 v-for="genre in details.genres" :key="genre.id">
        | {{ genre.name }} |
      </h3>
      <h5>
        {{ details.overview ? details.overview : details.known_for_department }}
      </h5>
    </div>
  </div>
  <div class="more-details">
    <!-- <nav class="nav">
      <a href="#credits" class="nav-link">Credits</a>
      <a href="#reviews" class="nav-link">Reviews</a>
      <a href="#videos" class="nav-link">Videos</a>
      <a href="#similars" class="nav-link">Similar</a>
    </nav> -->

    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          class="nav-link active"
          id="nav-credits-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-credits"
          type="button"
          role="tab"
          aria-controls="nav-credits"
          aria-selected="true"
        >
          Credits
        </button>
        <button
          class="nav-link"
          id="nav-videos-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-videos"
          type="button"
          role="tab"
          aria-controls="nav-videos"
          aria-selected="false"
        >
          Videos
        </button>
        <button
          class="nav-link"
          id="nav-images-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-images"
          type="button"
          role="tab"
          aria-controls="nav-images"
          aria-selected="false"
        >
          Images
        </button>
        <button
          class="nav-link"
          id="nav-similar-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-similar"
          type="button"
          role="tab"
          aria-controls="nav-similar"
          aria-selected="false"
        >
          Similar Movies
        </button>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-credits"
        role="tabpanel"
        aria-labelledby="nav-credits-tab"
      >
        <div v-if="credits && credits.length > 0" class="row" id="credits">
          <h2>Credits</h2>
          <div
            class="col credits-col"
            v-for="credit in credits"
            :key="credit.id"
          >
            <img
              :src="
                credit.profile_path ? imgUrl + credit.profile_path : noImage
              "
              alt="Profile image"
            />
            <h4>{{ credit.name }}</h4>
            <p>{{ credit.character }}</p>
          </div>
        </div>
        <h2 v-else>There is no credits available!</h2>
        <hr class="solid" />
      </div>
      <div
        class="tab-pane fade"
        id="nav-videos"
        role="tabpanel"
        aria-labelledby="nav-videos-tab"
      >
        <div v-if="videos && videos.length > 0" class="row videos">
          <h2>Videos</h2>
          <div
            class="col video-col"
            v-for="video in videos.slice(0, 12)"
            :key="video.id"
          >
            <iframe :src="videoUrl + video.key" allowfullscreen></iframe>
            <!-- CORS policy error with video tag -->
          </div>
        </div>
        <h2 v-else>There is no videos available!</h2>
        <hr class="solid" />
      </div>
      <div
        class="tab-pane fade"
        id="nav-images"
        role="tabpanel"
        aria-labelledby="nav-images-tab"
      >
        <div
          v-if="images.backdrops && images.backdrops.length > 0"
          class="row images"
        >
          <h2>Images</h2>
          <div
            class="col images-col"
            v-for="image in images.backdrops.slice(0, 12)"
            :key="image.file_path"
          >
            <img :src="imgUrl + image.file_path" alt="Image poster" />
          </div>
        </div>
        <h2 v-else>There is no Images available!</h2>
        <hr class="solid" />
      </div>
      <div
        class="tab-pane fade"
        id="nav-similar"
        role="tabpanel"
        aria-labelledby="nav-similar-tab"
      >
        <div class="row similars" v-if="similars && similars.length > 0">
          <h2>Similar Media</h2>
          <div
            class="col similars-col"
            v-for="similar in similars.slice(0, 12)"
            :key="similar.id"
          >
            <img
              :src="imgUrl + similar.poster_path"
              alt="Similar movie poster"
            />
          </div>
        </div>
        <h2 v-else>There is no similar media available!</h2>
        <hr class="solid" />
      </div>
    </div>

    <div
      v-if="reviews && reviews.length > 0"
      class="row reviews-row"
      id="reviews"
    >
      <h2>Reviews</h2>
      <div
        class="col reviews-col"
        v-for="review in reviews.slice(0, 2)"
        :key="review.id"
      >
        <img
          :src="
            review.author_details.avatar_path &&
            review.author_details.avatar_path.height > 30
              ? review.author_details.avatar_path
              : noImage
          "
          alt="Author review avatar"
        />
        <!-- disableClick expect boolean, but works with string -->
        <vue3-star-ratings
          class="disabled"
          :numberOfStars="10"
          :showControl="false"
          v-model="review.author_details.rating"
        />
        <h4>{{ review.author }}</h4>
        <p>{{ review.content.substr(0, 300) }}...</p>
      </div>
    </div>
    <h2 v-else>There is no reviews available!</h2>
    <hr class="solid" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    kind: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
    images() {
      return this.$store.getters["details/images"];
    },
  },
  methods: {
    fetchAllDetails() {
      this.$store.dispatch("details/fetchAllDetails", {
        id: this.id,
        kind: this.kind,
      });
    },
  },
  created() {
    this.fetchAllDetails();
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
  font-size: 16pt;
}

.nav .nav-link:hover {
  color: #c2c1c1;
  background-color: #315799;
  border-radius: 10px;
}
.active {
  color: #c2c1c1 !important;
  background-color: #2a3b57 !important;
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
h2 {
  margin-top: 10px;
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
.images {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.images-col {
  width: 25%;
  margin: 10px;
  background-color: #1f2b3f;
  padding: 5px;
  border-radius: 20px;
  flex-basis: 25%;
}
.images-col img {
  width: 95%;
  border-radius: 10px;
}
.videos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.video-col {
  width: 25%;
  max-width: 600px;
  margin: 10px;
  padding: 5px;
  background-color: #1f2b3f;
  border-radius: 10px;
  flex-basis: 25%;
}
.video-col iframe {
  width: 95%;
  height: 300px;
  border-radius: 10px;
}
.similars {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.similars-col {
  width: 25%;
  margin: 10px;
  padding: 10px;
  background-color: #1f2b3f;
  border-radius: 10px;
  flex-basis: 25%;
}
.similars-col img {
  width: 95%;
  border-radius: 10px;
}
hr.solid {
  margin-top: 10px;
  border-top: 4px solid #cecaca;
}
.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
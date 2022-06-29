<template>
  <h2>{{ id }}</h2>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      movie: null,
      movieId: this.$route.params.id,
    };
  },
  computed: {
    getDetails() {
      return this.$store.getters["movies/details"];
    },
  },
  methods: {
    async loadDetails() {
      try {
        await this.$store.dispatch("movies/loadDetails", {
          id: this.movieId,
        });
        this.movie = this.getDetails;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
  mounted() {
    this.loadDetails();
    console.log(this.$route.params.id);
  },
};
</script>
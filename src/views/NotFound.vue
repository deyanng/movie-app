<template>
  <h2>The page was not found!</h2>
  <h4>
    You will be redirected to our <router-link to="/">Home page</router-link>
  </h4>
</template>

<script>
export default {
  methods: {
    redirect() {
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>
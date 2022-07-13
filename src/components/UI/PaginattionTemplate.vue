<template>
  <ul>
    <li>
      <a href="#" @click.prevent="page('prev')">Prev</a>
    </li>
    <li>
      <a href="#" @click.prevent="page(1)">Page 1</a>
    </li>
    <li>
      <a href="#" @click.prevent="page(2)">Page 2</a>
    </li>
    <li>
      <a href="#" @click.prevent="page(3)">Page 3</a>
    </li>
    <li>
      <a href="#" @click.prevent="page(4)">Page 4</a>
    </li>
    <li>
      <a href="#" @click.prevent="page(5)">Page 5</a>
    </li>
    <li><a href="#" @click.prevent="page('next')">Next</a></li>
  </ul>
</template>

<script>
export default {
  methods: {
    page(pageNum) {
      this.$emit("clicked", pageNum);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  width: 80%;
  margin: 50px auto;
  flex-direction: row;
  justify-content: center;
}
li {
  width: 100px;
  margin: 0 10px;
  background-color: #172c50;
  border-radius: 10px;
}
a {
  text-decoration: none;
  font-size: 16pt;
  color: #ffffff;
}
li:hover,
a:hover {
  color: #ffffff;
  background-color: #234279;
}
</style>
<template>
  <!-- |First|Prev|1|2|...|12|13|Next|Last| -->
  <ul>
    <li @click="goToPage(1)" :inactive="isFirstPage">
      <a>First Page</a>
    </li>
    <li @click="goToPage(this.currPage - 1)" :inactive="isFirstPage">
      <a>Prev</a>
    </li>
    <li
      v-for="item in allPages"
      :key="item.num"
      :active="item.isActive"
      :class="{ active: isSelected(item.num) }"
      @click="goToPage(item.num)"
    >
      <a>{{ item.num }}</a>
    </li>
    <li @click="goToPage(this.currPage + 1)" :inactive="isLastPage">
      <a>Next</a>
    </li>
    <li @click="goToPage(this.totalPages)" :inactive="isLastPage">
      <a>Last Page</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: false,
    },
    currPage: {
      type: Number,
      required: false,
    },
    visiblePages: {
      type: Number,
      required: false,
      default: 4,
    },
  },
  computed: {
    startingPage() {
      if (this.currPage === 1) {
        return 1;
      }
      if (this.currPage === this.totalPages) {
        return this.totalPages - this.visiblePages;
      }

      return this.currPage - 1;
    },
    allPages() {
      const totalPages = [];

      for (
        let i = this.startingPage;
        i <=
        Math.min(this.startingPage + this.visiblePages - 1, this.totalPages);
        i++
      ) {
        totalPages.push({ num: i, isActive: i === this.currPage });
      }

      return totalPages;
    },
    isFirstPage() {
      return this.currPage === 1;
    },
    isLastPage() {
      return this.currPage === this.totalPages;
    },
  },
  methods: {
    isSelected(pageNum) {
      return this.currPage === pageNum;
    },
    goToPage(value) {
      this.$emit("goTo", value);
    },
  },
};
</script>

<style scoped>
a,
li {
  cursor: pointer;
}
ul {
  list-style-type: none;
  display: flex;
  width: 85%;
  margin: 50px auto;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
li {
  width: 120px;
  height: 35px;
  margin: 5px 10px;
  background-color: #172c50;
  color: #ffffff;
  border-radius: 10px;
}
a {
  text-decoration: none;
  font-size: 16pt;
  padding: 5px;
  color: #ffffff;
}
li:hover {
  color: #ffffff;
  background-color: #234279;
}
.active {
  color: #ffffff;
  background-color: #3164bb;
}
</style>
<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <router-link to="/" class="navbar-brand flex-grow-1"
        ><img id="logo" src="../../assets/images/Image17.png" alt="Logo"
      /></router-link>

      <div class="flex-grow-1 d-flex">
        <form
          @submit.prevent="searching"
          class="form-inline flex-nowrap mx-0 mx-lg-auto rounded p-1"
        >
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            v-model="searchWord"
          />
          <i
            id="search"
            class="fa-solid fa-magnifying-glass"
            :hidden="showSearchIcon"
          ></i>
        </form>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fa-solid fa-sliders"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link" href="#"
            ><i class="fa-solid fa-plus"></i
          ></a>
          <a class="nav-item nav-link" href="#">
            <span class="fa-stack">
              <i class="fa-solid fa-bell fa-stack-1x"></i>
              <i class="fa-solid fa-circle fa-stack-1x"></i>
            </span>
          </a>
          <a class="nav-item nav-link" href="#">
            <div class="dropdown">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  id="avatar"
                  src="../../assets/images/avatar.jpg"
                  alt="Avatar"
                />
                Deyan Georgiev
              </a>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a class="dropdown-item" href="#">My Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="solid" /></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      searchWord: "",
    };
  },
  methods: {
    searching() {
      this.$router.push({ name: "Search", params: { query: this.searchWord } });
    },
  },
  computed: {
    showSearchIcon() {
      return this.searchWord.length;
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 90px;
  background: #182131 0% 0% no-repeat padding-box;
  opacity: 0.91;
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);

  z-index: 9999; /* show menu always at the top of other elements */
}
.fa-stack {
  font-size: 15px;
}
.fa-solid.fa-circle {
  font-size: 7px;
  margin-top: -7px;
  margin-left: 4px;
  color: green;
}
.navbar-nav a {
  margin-right: 10px;
  background-color: #182131;
  color: #ffffff51;
  text-decoration: none;
}
.navbar-nav .dropdown {
  margin-right: 50px;
}
.navbar-nav a:hover {
  color: #ffffff9d;
}
.dropdown-menu {
  background-color: #182131;
}
hr.solid {
  border-top: 2px solid #ffffff51;
}
img#logo {
  width: 121px;
  height: 90px;
}
img#avatar {
  width: 30px;
  border-radius: 50%;
}
input[type="search"] {
  width: 398px;
  height: 52px;
  background: #ffffff51 0% 0% no-repeat padding-box;
  color: #ffffff;
  border-radius: 30px;
  opacity: 0.3;
}
input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ffffff;
  opacity: 1; /* Firefox */
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #ffffff;
}

input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #ffffff;
}
i#search {
  font-size: 20px;
  margin-left: -60px;
}
.navbar-toggler {
  background: #ffffff51 0% 0%;
}
</style>
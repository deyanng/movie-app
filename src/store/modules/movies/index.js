export default {
  namespaced: true,
  state() {
    return {
      nowPlaying: [],
      topRated: [],
      details: null,
    };
  },
  mutations: {
    loadNowPlaying(state, payload) {
      state.nowPlaying = payload;
    },
    loadTopRated(state, payload) {
      state.topRated = payload;
    },
    loadDetails(state, payload) {
      state.details = payload;
    },
  },
  actions: {
    async loadNowPlaying(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=7074bb722049de6c4c14dd7d06db2407'
      );

      const responseData = await response.json();
      console.log(responseData.results);
      this.nowPlaying = responseData.results;
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadNowPlaying', responseData.results);
    },
    async loadTopRated(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407'
      );

      const responseData = await response.json();
      this.topRated = responseData.results;
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadTopRated', responseData.results);
    },
    async loadDetails(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${payload.id}?api_key=7074bb722049de6c4c14dd7d06db2407`
      );

      const responseData = await response.json();
      console.log(responseData.results);
      this.details = responseData.results;
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadDetails', responseData.results);
    },
  },
  getters: {
    nowPlaying(state) {
      return state.nowPlaying;
    },
    topRated(state) {
      return state.topRated;
    },
    details(state) {
      return state.details;
    },
  },
};

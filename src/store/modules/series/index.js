export default {
  namespaced: true,
  state() {
    return {
      series: [],
    };
  },
  mutations: {
    loadSeries(state, payload) {
      state.series = payload;
    },
  },
  actions: {
    async loadSeries(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/tv/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407'
      );

      const responseData = await response.json();
      console.log(responseData.results);
      this.series = responseData.results;
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadSeries', responseData.results);
    },
  },
  getters: {
    series(state) {
      return state.series;
    },
  },
};

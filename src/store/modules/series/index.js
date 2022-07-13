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
    async loadSeries(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407&page=${payload.currPage}`
        );

        const responseData = await response.json();
        responseData.results.every((item) =>
          Object.assign(item, { kind: 'tv' })
        );
        // console.log(responseData.results, 'action series');
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('loadSeries', responseData.results);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    series(state) {
      return state.series;
    },
  },
};

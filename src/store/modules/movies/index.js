export default {
  namespaced: true,
  state() {
    return {
      nowPlaying: [],
      topRated: [],
    };
  },
  mutations: {
    SET_MOVIES(state, payload) {
      state[payload.key] = payload.data;
    },
  },
  actions: {
    async loadNowPlaying(context) {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=7074bb722049de6c4c14dd7d06db2407'
        );

        const responseData = await response.json();
        responseData.results.every((item) =>
          Object.assign(item, { kind: 'movie' })
        );
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_MOVIES', {
          key: 'nowPlaying',
          data: responseData.results,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadTopRated(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407&page=${payload.currPage}`
        );

        const responseData = await response.json();
        responseData.results.every((item) =>
          Object.assign(item, { kind: 'movie' })
        );
        // console.log(responseData, 'action toprated');
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_MOVIES', {
          key: 'topRated',
          data: responseData.results,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    nowPlaying(state) {
      return state.nowPlaying;
    },
    topRated(state) {
      return state.topRated;
    },
  },
};

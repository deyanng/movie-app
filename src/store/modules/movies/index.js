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
    loadNowPlaying(state, payload) {
      state.nowPlaying = payload;
    },
    loadTopRated(state, payload) {
      state.topRated = payload;
    },
  },
  actions: {
    async loadNowPlaying(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=7074bb722049de6c4c14dd7d06db2407'
      );

      const responseData = await response.json();
      responseData.results.every((item) =>
        Object.assign(item, { kind: 'movie' })
      );
      console.log(responseData.results, 'action load nowplaying');
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
    },
    async loadTopRated(context) {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=7074bb722049de6c4c14dd7d06db2407'
      );

      const responseData = await response.json();
      responseData.results.every((item) =>
        Object.assign(item, { kind: 'movie' })
      );
      // console.log(responseData.results, 'action toprated');
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

export default {
  namespaced: true,
  state() {
    return {
      objectDetails: null,
      objectCredits: null,
      objectReviews: null,
      objectVideos: null,
      objectSimilars: null,
    };
  },
  mutations: {
    loadObjectDetails(state, payload) {
      state.objectDetails = payload;
    },
    loadObjectCredits(state, payload) {
      state.objectCredits = payload;
    },
    loadObjectReviews(state, payload) {
      state.objectReviews = payload;
    },
    loadObjectVideos(state, payload) {
      state.objectVideos = payload;
    },
    loadObjectSimilars(state, payload) {
      state.objectSimilars = payload;
    },
  },
  actions: {
    async loadObjectDetails(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.kind}/${payload.id}?api_key=7074bb722049de6c4c14dd7d06db2407`
      );

      const responseData = await response.json();
      if (payload.kind === 'movie') {
        Object.assign(responseData, { kind: 'movie' });
      } else if (payload.kind === 'tv') {
        Object.assign(responseData, { kind: 'tv' });
      }
      // console.log(responseData, 'resdata details in actions');
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadObjectDetails', responseData);
    },
    async loadObjectCredits(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/credits?api_key=7074bb722049de6c4c14dd7d06db2407`
      );

      const responseData = await response.json();
      // console.log(responseData.cast.slice(0, 6));
      // if (payload.kind === 'movie') {
      //   Object.assign(responseData, { kind: 'movie' });
      // } else if (payload.kind === 'tv') {
      //   Object.assign(responseData, { kind: 'tv' });
      // }
      // console.log(responseData, 'resdata details in actions');
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadObjectCredits', responseData.cast.slice(0, 5));
    },
    async loadObjectReviews(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/reviews?api_key=7074bb722049de6c4c14dd7d06db2407`
      );

      const responseData = await response.json();
      // if (payload.kind === 'movie') {
      //   Object.assign(responseData.results, { kind: 'movie' });
      // } else if (payload.kind === 'tv') {
      //   Object.assign(responseData.results, { kind: 'tv' });
      // }
      // console.log(responseData, 'resdata details in actions');
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadObjectReviews', responseData.results);
    },
    async loadObjectVideos(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/videos?api_key=7074bb722049de6c4c14dd7d06db2407`
      );

      const responseData = await response.json();
      // if (payload.kind === 'movie') {
      //   Object.assign(responseData, { kind: 'movie' });
      // } else if (payload.kind === 'tv') {
      //   Object.assign(responseData, { kind: 'tv' });
      // }
      // console.log(responseData, 'resdata details in actions');
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadObjectVideos', responseData.results);
    },
    async loadObjectSimilars(context, payload) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/similar?api_key=7074bb722049de6c4c14dd7d06db2407`
      );

      const responseData = await response.json();
      // if (payload.kind === 'movie') {
      //   Object.assign(responseData, { kind: 'movie' });
      // } else if (payload.kind === 'tv') {
      //   Object.assign(responseData, { kind: 'tv' });
      // }
      // console.log(responseData, 'resdata details in actions');
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'An error occured during the fetch request!'
        );
        throw error;
      }
      context.commit('loadObjectSimilars', responseData.results);
    },
  },
  getters: {
    details(state) {
      return state.objectDetails;
    },
    credits(state) {
      return state.objectCredits;
    },
    reviews(state) {
      return state.objectReviews;
    },
    videos(state) {
      return state.objectVideos;
    },
    similars(state) {
      return state.objectSimilars;
    },
  },
};

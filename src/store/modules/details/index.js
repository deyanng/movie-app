export default {
  namespaced: true,
  state() {
    return {
      objectDetails: null,
      objectCredits: null,
      objectReviews: null,
      objectVideos: null,
      objectImages: null,
      objectSimilars: null,
    };
  },
  mutations: {
    SET_DATA(state, payload) {
      state[payload.key] = payload.data;
    },
  },
  actions: {
    async loadObjectDetails(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.kind}/${payload.id}?api_key=7074bb722049de6c4c14dd7d06db2407`
        );

        const responseData = await response.json();

        if (payload.kind === 'movie') {
          Object.assign(responseData, { kind: 'movie' });
        } else if (payload.kind === 'tv') {
          Object.assign(responseData, { kind: 'tv' });
        }
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_DATA', {
          key: 'objectDetails',
          data: responseData,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadObjectCredits(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/credits?api_key=7074bb722049de6c4c14dd7d06db2407`
        );

        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_DATA', {
          key: 'objectCredits',
          data: responseData.cast.slice(0, 5),
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadObjectReviews(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/reviews?api_key=7074bb722049de6c4c14dd7d06db2407`
        );

        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_DATA', {
          key: 'objectReviews',
          data: responseData.results,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadObjectVideos(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/videos?api_key=7074bb722049de6c4c14dd7d06db2407`
        );

        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_DATA', {
          key: 'objectVideos',
          data: responseData.results,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadObjectImages(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/images?api_key=7074bb722049de6c4c14dd7d06db2407`
        );

        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
          throw error;
        }
        context.commit('SET_DATA', {
          key: 'objectImages',
          data: responseData,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadObjectSimilars(context, payload) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${payload.kind}/${payload.id}/similar?api_key=7074bb722049de6c4c14dd7d06db2407`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || 'An error occured during the fetch request!'
          );
        }
        context.commit('SET_DATA', {
          key: 'objectSimilars',
          data: responseData.results,
        });
      } catch (error) {
        console.log(error);
      }
    },
    fetchAllDetails({ dispatch }, payload) {
      const list = [
        dispatch('loadObjectDetails', payload),
        dispatch('loadObjectCredits', payload),
        dispatch('loadObjectReviews', payload),
        dispatch('loadObjectVideos', payload),
        dispatch('loadObjectImages', payload),
        dispatch('loadObjectSimilars', payload),
      ];
      return Promise.all(list);
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
    images(state) {
      return state.objectImages;
    },
  },
};

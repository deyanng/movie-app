import { createStore } from 'vuex';

import MoviesModule from './modules/movies/index.js';
import SeriesModule from './modules/series/index.js';
import DetailsModule from './modules/details/index.js';

const store = createStore({
  modules: {
    movies: MoviesModule,
    series: SeriesModule,
    details: DetailsModule,
  },
});

export default store;

import { createStore } from 'vuex';

import MoviesModule from './modules/movies/index.js';
import SeriesModule from './modules/series/index.js';

const store = createStore({
  modules: { movies: MoviesModule, series: SeriesModule },
});

export default store;

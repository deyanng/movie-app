import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import MovieDetails from '../components/movies/MovieDetails.vue';
import NotFound from '../views/NotFound.vue';
import AllMovies from '../components/movies/AllMovies.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/movies',
    name: 'movies',
    component: AllMovies,
  },
  {
    path: '/movie/:id',
    name: 'movieDetails',
    component: MovieDetails,
    props: true,
  },
  {
    path: '/tv/:id',
    name: 'seriesDetails',
    component: HomePage,
  },
  {
    path: '/:NotFound(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

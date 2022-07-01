import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ObjectDetails from '../views/ObjectDetails.vue';
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
    path: '/movie/id=:id&kind=:kind',
    name: 'MovieDetails',
    component: ObjectDetails,
    props: true,
  },
  {
    path: '/tv/id=:id&kind=:kind',
    name: 'TvDetails',
    component: ObjectDetails,
    props: true,
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

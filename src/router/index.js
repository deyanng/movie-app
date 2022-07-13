import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ObjectDetails from '../views/ObjectDetails.vue';
import SearchResults from '../views/SearchResults.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/search?query=:query',
    name: 'Search',
    component: SearchResults,
    props: true,
  },
  {
    path: '/movie/id=:id?kind=:kind',
    name: 'MovieDetails',
    component: ObjectDetails,
    props: true,
  },
  {
    path: '/tv/id=:id?kind=:kind',
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

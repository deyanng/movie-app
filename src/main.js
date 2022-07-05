import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vue3StarRatings from 'vue3-star-ratings';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('vue3-star-ratings', vue3StarRatings);
app.mount('#app');

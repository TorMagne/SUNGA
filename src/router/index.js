import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import InfoPage from '../views/InfoPage';
import Userpage from '../views/Userpage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/infopage',
    name: 'InfoPage',
    component: InfoPage,
  },
  {
    path: '/brukerside',
    name: 'brukerside',
    component: Userpage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'nav-active',
});

export default router;

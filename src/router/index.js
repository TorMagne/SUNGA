import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import InfoPage from '../views/InfoPage';
import Userpage from '../views/Userpage';
import PageNotFound from '../views/PageNotFound';
import axios from 'axios';
import { store } from '../store/store';

Vue.use(VueRouter);

const guardRoutes = async (to, from, next) => {
  let user = store.state.userData;

  console.log('loltest', user);

  try {
    const response = await axios.post(process.env.VUE_APP_API_URL + 'auth/local', user);
    console.log('auth response', response);
  } catch (error) {
    console.log(error);
  }

  let isAuthenticated = false;
  if (localStorage.getItem('userData')) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next();
  } else {
    next('/');
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/infoside',
    name: 'Infoside',
    component: InfoPage,
    beforeEnter: guardRoutes,
  },
  {
    path: '/brukerside',
    name: 'brukerside',
    component: Userpage,
    beforeEnter: guardRoutes,
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'nav-active',
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import InfoPage from '../views/InfoPage';
import Userpage from '../views/Userpage';
import PageNotFound from '../views/PageNotFound';
import axios from 'axios';

Vue.use(VueRouter);

const guardRoutes = async (to, from, next) => {
  // let user = JSON.parse(window.localStorage.getItem('userData'));
  // console.log(user);

  try {
    const response = await axios.post(process.env.VUE_APP_API_URL + 'auth/local');
    console.log('testing auth', response);
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
<<<<<<< HEAD
=======
  },
  {
    path: '/selskapside',
    name: 'selskap',
    component: PartyPage,
    beforeEnter: guardRoutes,
>>>>>>> 33124ce90bcb48db4e43f037eb956e2ad77416a2
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

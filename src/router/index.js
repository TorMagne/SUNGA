import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import InfoPage from '../views/InfoPage';
import Userpage from '../views/Userpage';

Vue.use(VueRouter);

const guardRoutes = ((to, from ,next) => {
  let isAuthenticated = false;
  if(localStorage.getItem('userData')){
    isAuthenticated = true
  } else {
    isAuthenticated = false;
  }
  if(isAuthenticated){
    next();
  } else {
    next('/')
  }
})

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
    beforeEnter : guardRoutes,
  },
  {
    path: '/brukerside',
    name: 'brukerside',
    component: Userpage,
    beforeEnter : guardRoutes,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'nav-active',
});

export default router;

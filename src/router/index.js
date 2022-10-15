import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminView from '../views/AdminView.vue';
import GuideView from '../views/GuideView.vue';
import WorkView from '../views/WorkView.vue';
import LoginView from '../views/LoginView.vue';
// store
import store from '@/store';

Vue.use(VueRouter);

let routerGuard = (to, from, next) => {
  if (!store.getters['auth/authenticaded']) {
    return next({
      name: 'login',
    });
  } else {
    if (to.name == 'admin') {
      if (store.getters['auth/admin']) {
        next();
      } else {
        next('guide');
      }
    } else {
      next();
    }
  }
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/guide',
    name: 'guide',
    component: GuideView,
    beforeEnter: routerGuard,
  },
  {
    path: '/work',
    name: 'work',
    component: WorkView,
    beforeEnter: routerGuard,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    beforeEnter: routerGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

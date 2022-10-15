import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
import axios from 'axios';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

require('@/store/subscriber');

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

// re authing the user on each page
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});

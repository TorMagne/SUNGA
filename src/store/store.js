import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userData: {},
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('userInfo')) {
        // Replace the state object with the stored item
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('userInfo'))));
      }
    },
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('userInfo', JSON.stringify(state));
});

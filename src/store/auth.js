import axios from 'axios';
export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    admin: null,
    newMessages: null,
  },
  getters: {
    authenticaded(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
    admin(state) {
      return state.admin;
    },
    newMessages(state) {
      return state.newMessages;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SET_ADMIN(state, data) {
      state.admin = data;
    },
    SET_NEWMESSAGES(state, data) {
      state.newMessages = data;
    },
  },
  actions: {
    // sign in
    async signIn({ dispatch }, credentials) {
      let response = await axios.post('auth/local', credentials);
      return dispatch('attempt', response.data.jwt);
    },

    // check user
    async attempt({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token);
      }
      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get('users/me');
        commit('SET_USER', response.data);
        commit('SET_ADMIN', response.data.isAdmin);
      } catch (error) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        commit('SET_ADMIN', null);
      }

      // check messages
      try {
        let responseRead = await axios.get('messages');
        commit('SET_NEWMESSAGES', responseRead.data)
      } catch (error) {
        commit('SET_NEWMESSAGES', null);
      }
    },

    signOut({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      commit('SET_ADMIN', null);
      commit('SET_NEWMESSAGES', null);
    },
  },

};

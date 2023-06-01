import { createStore } from 'vuex';
import { auth } from './firebase.js';
import router from './router';

const store = createStore({
  state: {
    currentUser: null,
    error: null
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      commit('setError', null);

      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          commit('setCurrentUser', user);
          // Presmerovanie na dashboard
          router.push('/dashboard');
        })
        .catch(error => {
          commit('setError', error.message);
          console.error(error);
        });
    },
    logout({ commit }) {
      auth.signOut()
        .then(() => {
          commit('setCurrentUser', null);
          // Presmerovanie na login alebo inú stránku
          router.push('/login');
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Ostatné akcie
  },
  getters: {
    // Vaše gettery
  }
});

// Obnoviť stav currentUser pri načítaní aplikácie
const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
  store.commit('setCurrentUser', JSON.parse(storedUser));
}

export default store;

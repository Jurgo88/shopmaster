<template>
    <div>
      <v-card v-if="!currentUser" class="pa-4">
        <v-card-title class="headline">Prihlásenie</v-card-title>
        <v-form @submit="submitForm">
          <v-text-field v-model="form.email" label="E-mail" type="email" required></v-text-field>
          <v-text-field v-model="form.password" label="Heslo" type="password" required></v-text-field>
          <v-btn type="submit" color="primary">Prihlásiť sa</v-btn>
        </v-form>
        <p v-if="error" v-text="error"></p>
      </v-card>
      <v-btn v-else @click="submitLogout" color="primary">Odhlásiť sa</v-btn>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebase.js';
  import store from '../store';
  import { VCard, VCardTitle, VForm, VTextField, VBtn } from 'vuetify/lib/components';
  
  export default {
    components: {
      VCard,
      VCardTitle,
      VForm,
      VTextField,
      VBtn
    },
    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      submitForm(event) {
        event.preventDefault();
        store.dispatch('login', {
          email: this.form.email,
          password: this.form.password
        });
      },
      submitLogout() {
        store.dispatch('logout');
      },
      // Ostatné metódy
    },
    computed: {
      currentUser() {
        return store.state.currentUser;
      },
      error() {
        return store.state.error;
      }
    }
  };
  </script>
  
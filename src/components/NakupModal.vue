<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ editNakupData.id ? 'Editovať nákup' : 'Pridať nákup' }}</h2>
      <form @submit.prevent="$emit('submitNakup')">
        <div class="form-group">
          <label for="obchod">Obchod:</label>
          <v-text-field v-model="editNakupData.obchod" id="obchod" outlined required></v-text-field>
        </div>
        <div class="form-group">
          <label for="suma">Suma:</label>
          <v-text-field v-model.number="editNakupData.suma" id="suma" type="number" step="0.01" outlined required></v-text-field>
        </div>
        <div class="form-group">
          <label for="datum">Dátum:</label>
          <input type="date" id="datum" v-model="editNakupData.datum" required>
          <v-date-picker v-model.date="picker"></v-date-picker>
        </div>
        <v-btn type="submit" color="secondary">{{ editNakupData.id ? 'Uložiť' : 'Pridať' }}</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { VTextField, VBtn, VDatePicker } from 'vuetify/lib/components';

export default {
  props: {
    editNakupData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    VTextField,
    VBtn,
    VDatePicker,
  },
  data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

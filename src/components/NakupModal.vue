<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>{{ editNakupData.id ? 'Editovať nákup' : 'Pridať nákup' }}</h2>
        <form @submit.prevent="$emit('submitNakup')">
          <div class="form-group">
            <label for="obchod">Obchod:</label>
            <input type="text" id="obchod" v-model="editNakupData.obchod" required>
          </div>
          <div class="form-group">
            <label for="suma">Suma:</label>
            <input type="number" step="0.01" id="suma" v-model="editNakupData.suma" required>
          </div>
          <div class="form-group">
            <label for="date">Dátum:</label>
            <input type="date" id="datum" v-model="editNakupData.datum" required>
          </div>
          <button type="submit">{{ editNakupData.id ? 'Uložiť' : 'Pridať' }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      editNakupData: {
        type: Object,
        default: () => ({})
      }
    }
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
    background-color: rgba(0,0,0,0.4);
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
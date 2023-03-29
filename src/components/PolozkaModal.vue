<template>
    <div class="modal">
      <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2 v-if="!editMode">Pridať novú položku</h2>
      <h2 v-if="editMode">Upraviť položku</h2>      
      <form @submit.prevent="submitPolozka">
        <div>
          <label for="nazov">Názov:</label>
          <input type="text" id="nazov" v-model="editPolozkaData.nazov" required>
        </div>
        <div>
          <label for="cena">Cena:</label>
          <input type="number" step="0.01" id="cena" v-model.number="editPolozkaData.cena" required>
        </div>
        <div>
          <label for="kategoria">Kategoria:</label>
          <input type="text" id="kategoria" v-model="editPolozkaData.kategoria" required>
        </div>
        <!-- <div>
          <label for="datum">Dátum:</label>
           <input type="date" id="datum" v-model="editPolozkaData.datum" required>
        </div> -->
        <div>
          <button type="submit">{{ editMode ? 'Uložiť zmeny' : 'Pridať položku' }}</button>
          <button type="button" @click="closePolozkaModal">Zrušiť</button>
        </div>
      </form>
    </div>
    </div>
  </template>
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
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #ccc;
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
  <script>
  export default {
    props: {
      editPolozkaData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editMode: !!Object.keys(this.editPolozkaData).length
      }
    },
    methods: {
      submitPolozka() {
        this.$emit('submitPolozka');
      },
      closePolozkaModal() {
        this.$emit('close');
      }
    }
  };
  </script>
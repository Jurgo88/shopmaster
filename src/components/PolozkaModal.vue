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
        
        <SelectBox id="selectboxKategoria" v-model="selectedCategory"  :name="'selectboxKategoria'" :label="'Kategoria: '" :options="categoryOptions" />
        
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
 // Importing Vue features
 import { ref, watch, computed } from 'vue';
 import SelectBox from './MySelectbox.vue';
 import { options } from '../categoryOptions.js';
 
 // Exporting component
 export default {
   // Declaring component props
   props: {
     editPolozkaData: {
       type: Object,
       required: true
     },
     value: {
       type: String,
       default: '',
     }
   },
   // Registering component dependencies
   components: {
     SelectBox,
   },
   // Defining component logic with setup function
   setup(props, { emit }) {
     // Initializing variables with reactive refs
     const editMode = !!Object.keys(props.editPolozkaData).length;
     const categoryOptions = options;
     const selectedCategory = ref(props.value);
 
     // Setting up watchers for reactive variables
     watch(selectedCategory, (newVal, oldVal) => {
       console.log('selectedCategory changed', oldVal, '->', newVal);
     });
 
     watch(() => props.editPolozkaData, (newVal, oldVal) => {
       console.log('editPolozkaData changed', oldVal, '->', newVal);
     }, { deep: true });
 
     // Setting up computed property to sync prop value with local state
     const localselected = computed({
       get: () => selectedCategory.value,
       set: (value) => {
         emit('update:value', value);
       }
     });
 
     // Defining functions to handle component events
     const submitPolozka = () => {
       console.log(props.editPolozkaData);
       console.log("Selected " + selectedCategory.value);
       props.editPolozkaData.kategoria = selectedCategory.value;
       emit('submitPolozka');
     };
 
     const closePolozkaModal = () => {
       emit('close');
     };
 
     // Returning values to be used in component template
     return {
       editMode,
       categoryOptions,
       selectedCategory,
       localselected,
       submitPolozka,
       closePolozkaModal,
     };
   }
 };
</script>
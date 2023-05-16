<template>
    <div>
      <div class="gear-icon" @click="toggleExpanded">
        <!-- Vložte ikonu ozubeného kolesa -->
        <i class="fa fa-cog"></i>
      </div>
      <div class="expanded-content" :class="{ show: expanded }">
        <div class="checkbox-row">
          <label v-for="checkbox in checkboxes" :key="checkbox.id">
            <input type="checkbox" v-model="checkbox.checked" @change="checkboxChanged" />
            {{ checkbox.label }}
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import '@fortawesome/fontawesome-free/css/all.css';
  
  export default {
    data() {
      return {
        expanded: false,
        checkboxes: [
          { id: 1, label: 'Poslednych 30 dni', checked: false },
          { id: 2, label: 'Aktualny mesiac', checked: false },
          { id: 3, label: 'Checkbox 3', checked: false },
          { id: 4, label: 'Checkbox 4', checked: false },
          { id: 5, label: 'Checkbox 5', checked: false },
          { id: 6, label: 'Checkbox 6', checked: false },
        ],
      };
    },
    methods: {
      toggleExpanded() {
        this.expanded = !this.expanded;
      },
      checkboxChanged() {
        // Implementujte prípadnú logiku pre zmeny checkboxov
        // Napríklad môžete vyvolať udalosť alebo aktualizovať dáta
      },
    },
  };
  </script>
  
  <style>
  .gear-icon {
    cursor: pointer;
    /* Pridajte ďalšie CSS štýly pre ikonu ozubeného kolesa */
    text-align: end;
    padding: 10px;
  }
  
  .expanded-content {
    display: none;
    /* Pridajte ďalšie CSS štýly pre rozbalený obsah */
  }
  
  .expanded-content.show {
    display: block;
    background-color: aquamarine;
    width: 450px;
    height: auto;
    padding: 10px;
    right: 20px;
    position: absolute;
    border: 1px black solid;
    background: rgba(182, 182, 182, 0.8);
  }
    .checkbox-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    }
  </style>
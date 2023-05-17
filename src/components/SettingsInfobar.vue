<template>
  <div>
    <div class="gear-icon" @click="toggleExpanded">
      <!-- Vložte ikonu ozubeného kolesa -->
      <i class="fa fa-cog"></i>
    </div>
    <div class="expanded-content" :class="{ show: expanded }">
      <div class="checkbox-row">
        <label v-for="checkbox in checkboxes" :key="checkbox.id">
          <input type="checkbox" v-model="checkbox.checked" @change="checkboxChanged(checkbox)" />
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
        { id: 1, label: 'Posledných 30 dní', name: 'lastMonth', checked: false },
        { id: 2, label: 'Aktuálny mesiac', name: 'thisMonth', checked: false },
        { id: 3, label: 'Obľúbená položka', name: 'favoritAll', checked: false },
        { id: 4, label: 'Checkbox 4', name: '4', checked: false },
        { id: 5, label: 'Checkbox 5', name: '5', checked: false },
        { id: 6, label: 'Checkbox 6', name: '6', checked: false },
      ],
    };
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    checkboxChanged(checkbox) {
      console.log('Checked ID:', checkbox.label);
      this.saveToLocalStorage();
      this.$emit('checkbox-changed', checkbox.name);
    },
    getCheckboxValue(id) {
      const checkbox = this.checkboxes.find(item => item.id === id);
      return checkbox ? checkbox.checked : false;
    },
    loadFromLocalStorage() {
      const savedSettings = localStorage.getItem('settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.checkboxes.forEach(checkbox => {
          checkbox.checked = settings.includes(checkbox.name);
        });
      }
    },
    saveToLocalStorage() {
        console.log('Ukladám do localStorage');
        const settings = [];
        this.checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
            settings.push(checkbox.name);
            }
        });
        localStorage.setItem('settings', JSON.stringify(settings));
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
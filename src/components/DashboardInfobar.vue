<template>
    <div>
      <div class="infobar">
        <DashboardInfobarItem v-for="box in boxes" :key="box.id" :title="box.title" :content="box.content" />
      </div>
      <SettingsInfobar ref="settingsInfobar" @checkbox-changed="handleCheckboxChanged" />
    </div>
  </template>
  
  <script>
  import DashboardInfobarItem from './DashboardInfobarItem.vue';
  import SettingsInfobar from './SettingsInfobar.vue';
  
  export default {
    components: {
      DashboardInfobarItem,
      SettingsInfobar,
    },
    props: {
      sumaLastMonth: {
        type: Number,
        required: true,
      },
      sumaThisMonth: {
        type: Number,
        required: true,
      },
      favoritAll: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        boxes: [
          { id: 1, title: '', content: '' },
          { id: 2, title: '', content: '' },
          { id: 3, title: '', content: '' },
          { id: 4, title: '', content: '' },
        ],
      };
    },
    mounted() {
      this.updateBoxContents();
      this.handleCheckboxChanged();
    },
    watch: {
      sumaLastMonth() {
        this.updateBoxContents();
      },
      sumaThisMonth() {
        this.updateBoxContents();
      },
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
      },
      updateBoxContents() {
        const lastMonthCheckbox = this.$refs.settingsInfobar.getCheckboxValue(1);
        const thisMonthCheckbox = this.$refs.settingsInfobar.getCheckboxValue(2);
        const favoritAllCheckbox = this.$refs.settingsInfobar.getCheckboxValue(3);
  
        this.boxes[0].title = lastMonthCheckbox ? 'Posledný mesiac' : '';
        this.boxes[0].content = lastMonthCheckbox ? `Suma za posledný mesiac: ${this.formatCurrency(this.sumaLastMonth)}` : '';
  
        this.boxes[1].title = thisMonthCheckbox ? 'Aktuálny mesiac' : '';
        this.boxes[1].content = thisMonthCheckbox ? `Suma za aktuálny mesiac: ${this.formatCurrency(this.sumaThisMonth)}` : '';

        this.boxes[2].title = favoritAllCheckbox ? 'Tvoj favorit' : '';
        this.boxes[2].content = favoritAllCheckbox ? `${(this.favoritAll)}` : '';
      },
      handleCheckboxChanged(checkboxName) {
        console.log('Zmena checkboxu:', checkboxName);
  
        if (checkboxName === 'lastMonth') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(1);
          console.log(checkbox);
          this.updateBoxContents();
        }
  
        if (checkboxName === 'thisMonth') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(2);
          console.log(checkbox);
          this.updateBoxContents();
        }

        if (checkboxName === 'favoritAll') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(3);
          console.log(checkbox);
          this.updateBoxContents();
        }
      },
    },
  };
  </script>
  
  <style>
  .infobar {
    display: flex;
  }
  </style>
  
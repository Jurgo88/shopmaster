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
    },
    data() {
      return {
        boxes: [
          { id: 1, title: 'Posledných 30 dní: ', content: '' },
          { id: 2, title: 'Aktuálny mesiac', content: '' },
          { id: 3, title: 'Box 3', content: 'Obsah boxu 3' },
          { id: 4, title: 'Box 4', content: 'Obsah boxu 4' },
        ],
      };
    },
    mounted() {
      this.updateBoxContents();
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
        this.boxes[0].content = `Suma za posledný mesiac: ${this.formatCurrency(this.sumaLastMonth)}`;
        this.boxes[1].content = `Suma za aktuálny mesiac: ${this.formatCurrency(this.sumaThisMonth)}`;
      },
      handleCheckboxChanged(checkboxName) {
        if (checkboxName === 'lastMonth') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(1);
          this.boxes[0].content = checkbox && checkbox.checked ? `Suma za posledný mesiac: ${this.formatCurrency(this.sumaLastMonth)}` : '';
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
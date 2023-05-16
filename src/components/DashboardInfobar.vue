<template>
    <div class="infobar">
      <DashboardInfobarItem v-for="box in boxes" :key="box.id" :title="box.title" :content="box.content" />
    </div>
  </template>
  
  <script>
  import DashboardInfobarItem from './DashboardInfobarItem.vue';
  
  export default {
    components: {
      DashboardInfobarItem,
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
          { id: 1, title: 'Box 1', content: '' },
          { id: 2, title: 'Box 2', content: '' },
          { id: 3, title: 'Box 3', content: 'Obsah boxu 3' },
          { id: 4, title: 'Box 4', content: 'Obsah boxu 4' },
        ],
      };
    },
    mounted() {
      // Aktualizácia obsahu boxu 1
      console.log("Poslenny mesac "+ this.sumaLastMonth);
      this.boxes[0].content = `Suma za posledný mesiac: ${this.formatCurrency(this.sumaLastMonth)}`;
  
      // Aktualizácia obsahu boxu 2
      console.log("Tento mesac "+ this.sumaThisMonth);
      this.boxes[1].content = `Suma za aktuálny mesiac: ${this.formatCurrency(this.sumaThisMonth)}`;
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
      },
    },
  };
  </script>
  
  <style>
  .infobar {
    display: flex;
  }
  </style>
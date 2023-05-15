<template>
    <div class="infobar">
      <DashboardInfobarItem
        v-for="box in boxes"
        :key="box.id"
        :title="box.title"
        :content="box.content"
      />
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
    },
    data() {
      return {
        boxes: [
          {
            id: 1,
            title: 'Box 1',
            content: `Suma za posledný mesiac: ${this.sumaLastMonth} €`,
          },
          { id: 2, title: 'Box 2', content: '' },
          { id: 3, title: 'Box 3', content: 'Obsah boxu 3' },
          { id: 4, title: 'Box 4', content: 'Obsah boxu 4' },
        ],
      };
    },
    mounted() {
      // Aktualizácia obsahu boxu 2
      const sumaZaPredposlednyMesiac = 1200; // Nahradiť skutočnými údajmi
      this.boxes[1].content = `Suma za predposledný mesiac: ${sumaZaPredposlednyMesiac} €`;
    },
  };
  </script>
  
  <style>
  .infobar {
    display: flex;
  }
  </style>
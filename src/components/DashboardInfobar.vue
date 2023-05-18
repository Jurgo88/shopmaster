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
        nakupy: {
        type: Array,
        required: true
      },
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
      },

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
        const checkboxValues = {
          1: this.$refs.settingsInfobar.getCheckboxValue(1),
          2: this.$refs.settingsInfobar.getCheckboxValue(2),
          3: this.$refs.settingsInfobar.getCheckboxValue(3),
          4: this.$refs.settingsInfobar.getCheckboxValue(4),
          5: this.$refs.settingsInfobar.getCheckboxValue(5),
          6: this.$refs.settingsInfobar.getCheckboxValue(6),
        };

        const boxConfigurations = [
          {
            checkboxIndex: '1',
            title: 'Posledný mesiac',
            getContent: () => `Suma za posledný mesiac: ${this.formatCurrency(this.sumaLastMonth)}`,
          },
          {
            checkboxIndex: '2',
            title: 'Aktuálny mesiac',
            getContent: () => `Suma za aktuálny mesiac: ${this.formatCurrency(this.sumaThisMonth)}`,
          },
          {
            checkboxIndex: '3',
            title: 'Tvoj favorit',
            getContent: () => this.favoritAll,
          },
          {
            checkboxIndex: '4',
            title: 'Box 4',
            getContent: () => 'Tu bude niečo',
          },
          {
            checkboxIndex: '5',
            title: 'Box 5',
            getContent: () => 'Tu bude niečo',
          },
          {
            checkboxIndex: '6',
            title: 'Box 6',
            getContent: () => 'Tu bude niečo',
          },
        ];

        this.boxes = []; // Reset the boxes array

        // Iterate over checkbox values and add boxes for the selected ones
        Object.entries(checkboxValues).forEach(([index, checkboxValue]) => {
          if (checkboxValue && boxConfigurations[index - 1]) {
            const boxConfiguration = boxConfigurations[index - 1];
            const box = {
              title: boxConfiguration.title,
              content: boxConfiguration.getContent(),
            };

            this.boxes.push(box);
          }
        });
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
        if (checkboxName === '4') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(4);
          console.log(checkbox);
          this.updateBoxContents();
        }
        if (checkboxName === '5') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(5);
          console.log(checkbox);
          this.updateBoxContents();
        }
        if (checkboxName === '6') {
          const checkbox = this.$refs.settingsInfobar.getCheckboxValue(6);
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
    border: 1px solid black;
    padding: 10px 0;
  }
  </style>
  
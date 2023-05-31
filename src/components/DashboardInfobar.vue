<template>
    <div>
      <div class="infobar">
        <DashboardInfobarItem v-for="box in boxes" :key="box.id" :title="box.title" :content="box.content" />
      </div>
      <SettingsInfobar ref="settingsInfobar" @checkbox-changed="handleCheckboxChanged" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
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
    setup(_, { refs }){
      const boxes = ref([]);
      const settingsInfobar= ref(null);

      const formatCurrency = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
      };
      
      // const handleCheckboxChanged = (checkboxName) => {
      //   console.log('Zmena checkboxu:', checkboxName);

      //   const checkboxValue = refs.settingsInfobar.getCheckboxValue(Number(checkboxName));
      //   console.log(checkboxValue);
      //   updateBoxContents();
      // };
      const handleCheckboxChanged = (checkboxName) => {
        console.log('Zmena checkboxu composition:', checkboxName);
        if (checkboxName === 'lastMonth') {
          const checkbox = settingsInfobar.value.getCheckboxValue(1);
          console.log(checkbox);
          updateBoxContents();
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
        //return checkboxName;
      };

      const updateBoxContents = () => {
        console.log('update');
        //TODO dokoncit update 
      }
      
      return{
        boxes,
        formatCurrency,
        handleCheckboxChanged,
        settingsInfobar,
      }
    },
    // data() {
    //   return {
    //     boxes: [],
    //   };
    // },

    // onMounted(() => {
    //   const settingsInfobar = settingsInfobarRef.value;
    // }),
    mounted() {
      // const settingsInfobar = settingsInfobarRef.value;
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
      // formatCurrency(value) {
      //   return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
      // },
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

      // handleCheckboxChanged(checkboxName) {
      //   console.log('Zmena checkboxu:', checkboxName);
  
      //   if (checkboxName === 'lastMonth') {
      //     const checkbox = this.$refs.settingsInfobar.getCheckboxValue(1);
      //     console.log(checkbox);
      //     this.updateBoxContents();
      //   }
  
      //   if (checkboxName === 'thisMonth') {
      //     const checkbox = this.$refs.settingsInfobar.getCheckboxValue(2);
      //     console.log(checkbox);
      //     this.updateBoxContents();
      //   }

      //   if (checkboxName === 'favoritAll') {
      //     const checkbox = this.$refs.settingsInfobar.getCheckboxValue(3);
      //     console.log(checkbox);
      //     this.updateBoxContents();
      //   }
      //   if (checkboxName === '4') {
      //     const checkbox = this.$refs.settingsInfobar.getCheckboxValue(4);
      //     console.log(checkbox);
      //     this.updateBoxContents();
      //   }
      //   if (checkboxName === '5') {
      //     const checkbox = this.$refs.settingsInfobar.getCheckboxValue(5);
      //     console.log(checkbox);
      //     this.updateBoxContents();
      //   }
      //   if (checkboxName === '6') {
      //     const checkbox = this.$refs.settingsInfobar.getCheckboxValue(6);
      //     console.log(checkbox);
      //     this.updateBoxContents();
      //   }
      // },
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
  
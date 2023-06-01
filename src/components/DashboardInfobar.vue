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
      boxes: [],
    };
  },
  mounted() {
    this.updateBoxContents();
  },
  watch: {
    nakupy() {
      this.updateBoxContents();
    },
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
    getCheckboxValue(index) {
      return this.$refs.settingsInfobar.getCheckboxValue(index);
    },
    updateBoxContents() {
      const checkboxConfigurations = [
        {
          index: 1,
          title: 'Posledný mesiac',
          getContent: () => `Suma za posledný mesiac: ${this.formatCurrency(this.sumaLastMonth)}`,
        },
        {
          index: 2,
          title: 'Aktuálny mesiac',
          getContent: () => `Suma za aktuálny mesiac: ${this.formatCurrency(this.sumaThisMonth)}`,
        },
        {
          index: 3,
          title: 'Tvoj favorit',
          getContent: () => this.favoritAll,
        },
        {
          index: 4,
          title: 'Box 4',
          getContent: () => 'Tu bude niečo',
        },
        {
          index: 5,
          title: 'Box 5',
          getContent: () => 'Tu bude niečo',
        },
        {
          index: 6,
          title: 'Box 6',
          getContent: () => 'Tu bude niečo',
        },
      ];

      this.boxes = checkboxConfigurations
        .filter(config => this.getCheckboxValue(config.index))
        .map(config => ({
          id: config.index,
          title: config.title,
          content: config.getContent(),
        }));
    },

    handleCheckboxChanged(checkboxName) {
      console.log('Zmena checkboxu:', checkboxName);

      const checkboxConfigurations = [
        {
          name: 'lastMonth',
          index: 1,
        },
        {
          name: 'thisMonth',
          index: 2,
        },
        {
          name: 'favoritAll',
          index: 3,
        },
        {
          name: '4',
          index: 4,
        },
        {
          name: '5',
          index: 5,
        },
        {
          name: '6',
          index: 6,
        },
      ];

      const checkboxConfig = checkboxConfigurations.find(config => config.name === checkboxName);
      if (checkboxConfig) {
        const checkbox = this.getCheckboxValue(checkboxConfig.index);
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

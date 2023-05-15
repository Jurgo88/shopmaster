<template>
  <div class="selectbox-container">
    <label :for="name">{{ label }}</label>
    <select :id="name" :name="name" v-model="selectedValue" @change="updateValue($event)">
      <option disabled value="">Zadaj kategóriu</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    defaultOption() {
      return this.options.find(option => option.value === this.modelValue);
    },
  },
  data() {
    return {
      selectedValue: this.defaultOption ? this.defaultOption.value : '',
    };
  },
  methods: {
    updateValue(event) {
      if (event.target && event.target.value) {
        this.selectedValue = event.target.value;
      } else {
        this.selectedValue = this.defaultOption ? this.defaultOption.value : '';
      }
      this.$emit("update:modelValue", this.selectedValue);
    },
  },
};
</script>
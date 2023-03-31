<template>
    <div>
      <label :for="name">{{ label }}</label>
      <select :id="name" :name="name" v-model="selected" :required="isRequired">
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SelectBox',
    props: {
      name: { type: String, required: true },
      label: { type: String, required: true },
      placeholder: { type: String, default: 'Vyberte možnosť' },
      options: { type: Array, required: true },
      value: { type: String },
      isRequired: { type: Boolean, default: false },
    },
    data() {
      return {
        selected: this.value,
      };
    },
    computed: {
      mappedValue() {
        return this.selected;
      },
    },
    watch: {
      selected(value) {
        console.log("Selected: " + value);
        this.$emit('input', value);
        this.$emit('selected', value); 
      },
    },
  };
  </script>
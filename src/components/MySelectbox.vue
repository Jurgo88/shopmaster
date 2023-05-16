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
  data() {
    return {
      selectedValue: '',
    };
  },
  mounted() {
    this.selectedValue = this.modelValue ? this.options.find(option => option.value === this.modelValue)?.value : '';
  },
  methods: {
    updateValue(event) {
      this.selectedValue = event.target && event.target.value ? event.target.value : '';
      this.$emit("update:modelValue", this.selectedValue);
    },
  },
};
</script>
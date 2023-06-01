<template>
  <div class="selectbox-container">
    <label :for="name">{{ label }}</label>
    <div class="select-wrapper">
      <select :id="name" :name="name" v-model="selectedValue" @change="updateValue($event)">
        <option disabled value="">Zadajte kategóriu</option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
      </select>
      <div class="arrow"></div>
    </div>
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
    // Select value from DB if item is edited
    this.selectedValue = this.modelValue || '';
  },
  methods: {
    updateValue(event) {
      this.selectedValue = event.target.value || '';
      this.$emit('update:modelValue', this.selectedValue);
    },
  },
};
</script>

<style scoped>
.selectbox-container {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  text-align: left;
}

.select-wrapper {
  position: relative;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.select-wrapper .arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  pointer-events: none;
}

select:hover {
  background-color: rgba(0, 0, 0, 0.12);
}

select:disabled {
  background-color: rgba(0, 0, 0, 0.06);
  cursor: not-allowed;
}
</style>

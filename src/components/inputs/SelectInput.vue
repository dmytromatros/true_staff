<template>
  <div class="select-input">
    <span v-if="label" class="select-input__label">{{ label }}</span>
    <select
      class="select-input__input"
      name="select"
      id="select"
      v-model="internalValue"
    >
      <option v-for="(option, key) in options" :key="key" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => {},
    },
    modelValue: String,
  },
  emits: ["update:modelValue"],
  data() {
    return {
      internalValue: this.modelValue,
    };
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    modelValue(newValue) {
      this.internalValue = newValue;
    },
  },
};
</script>

<style lang="scss" scoped></style>
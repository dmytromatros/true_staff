<template>
  <div class="text-input">
    <span v-if="label" class="text-input__label">{{ label }}</span>
    <input
      class="text-input__input"
      :class="{ 'text-input__input--disabled': disabled }"
      :type="type"
      @input="changed"
      :placeholder="placeholder"
      v-model="internalValue"
    />
  </div>
</template>

<script>
export default {
  name: "TextImput",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
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

<style lang="scss" scoped>
.text-input {
  display: flex;
  flex-direction: column;
  &__input {
    &--disabled {
      pointer-events: none;
      opacity: 0.7;
    }
  }
}
</style>
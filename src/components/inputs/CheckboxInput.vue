<template>
  <div class="checkbox-input">
    <input
      class="checkbox-input__input"
      type="checkbox"
      :id="id"
      v-model="internalValue"
    />
    <label
      class="checkbox-input__label"
      :for="id"
      :class="{ 'checkbox-input__label--active': internalValue }"
    ></label>
    <label class="checkbox-input__text" v-if="label" :for="id">{{
      label
    }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckboxInput",
  props: {
    id: {
      type: String,
      default: "checkbox",
    },
    label: {
      type: String,
      default: "checkbox",
    },
    modelValue: Boolean,
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
.checkbox-input {
  display: flex;
  align-items: center;
  gap: 15px;
  &__input {
    display: none;
  }
  &__label {
    display: block;
    width: 50px;
    height: 25px;
    border-radius: 50px;
    background-color: #404040;
    position: relative;
    transition: 0.3s ease-in-out all;
    &::before {
      content: "";
      width: 23px;
      height: 23px;
      position: absolute;
      transform: translate(1px, 1px);
      border-radius: 50%;
      background-color: #e3e3e3;
      transition: 0.3s ease-in-out all;
    }
    &--active {
      background-color: #e3e3e3;
      &::before {
        transform: translate(26px, 1px);

        background-color: #404040;
      }
    }
  }
}
</style>
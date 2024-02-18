<template>
  <div class="select-input" :class="{ disabled }">
    <span v-if="label" class="select-input__label">{{ label }}</span>
    <label v-if="!internalValue" class="select-input__placeholder">{{ placeholder }}</label>
    <select class="select-input__input" name="select" id="select" v-model="internalValue">
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
      default: () => { },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
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
@import "@/styles/main.scss";

.select-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: $white;
  border-radius: 5px;

  &::after {
    content: '';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    z-index: 1;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="%23000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/></svg>');
    background-size: 100% 100%;
  }

  &__label {
    color: $dark_text;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  &__input {
    width: 100%;
    border: 1px solid $main-color;
    padding: 10px 15px;
    border-radius: 5px;
    @include main-shadow;
    color: $dark_text;
    font-size: 16px;
    font-weight: 600;
    transition: 0.3s ease-in-out all;
    cursor: pointer;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    z-index: 2;
    background: transparent;

    &:hover {
      box-shadow: 0 0 10px 1px rgba($color: $black, $alpha: 0.2);
    }

    &:focus,
    &:focus-visible {
      border: 1px solid $input-focus;
    }
  }

  &__placeholder {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    color: $placeholder-color;
    z-index: 1;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &__input:focus {}
}
</style>

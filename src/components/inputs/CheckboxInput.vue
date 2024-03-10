<template>
  <div class="checkbox-input" :class="{ disabled }">
    <input class="checkbox-input__input" type="checkbox" :id="id" v-model="internalValue" />
    <label class="checkbox-input__text" v-if="label" :for="id">{{
    label
  }}</label>
    <label class="checkbox-input__label" :for="id" :class="{ 'checkbox-input__label--active': internalValue }">
    </label>
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
    disabled: {
      type: Boolean,
      default: false,
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
@import "@/styles/main.scss";

.checkbox-input {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;

  &__input {
    display: none;
  }

  &__label {
    display: block;
    width: 50px;
    height: 25px;
    border-radius: 50px;
    background-color: $main-color;
    border: 2px solid $main-color;
    position: relative;
    transition: 0.3s ease-in-out all;
    cursor: pointer;

    &::before {
      content: "";
      width: 19px;
      height: 19px;
      position: absolute;
      transform: translate(1px, 1px);
      border-radius: 50%;
      background-color: $placeholder-color;
      transition: 0.3s ease-in-out all;
    }

    &--active {
      &::before {
        transform: translate(26px, 1px);

        background-color: $green-color;
      }
    }
  }

  &__text {
    cursor: pointer;
    margin-left: 10px;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>

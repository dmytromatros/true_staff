<template>
  <div class="text-input">
    <span v-if="label" class="text-input__label" :class="{ 'text-input__input--disabled': disabled }">{{ label }}</span>
    <input v-if="!textarea" class="text-input__input" :class="{ 'text-input__input--disabled': disabled }" :type="type"
      @input="changed" :placeholder="placeholder" v-model="internalValue" autocomplete="off" list="autocompleteOff"
      :name="type" />
    <textarea v-else v-model="internalValue" :placeholder="placeholder"
      :class="{ 'text-input__input--disabled': disabled }"></textarea>
  </div>
</template>

<script>
export default {
  name: "TextInput",
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
    textarea: {
      type: Boolean,
      default: false,
    },
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

.text-input {
  display: flex;
  flex-direction: column;

  &__label {
    color: $dark_text;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
    margin-bottom: 10px;
    width: fit-content;
    border-radius: 7px 7px 0 0;
  }

  &__input,
  textarea {
    width: 100%;
    padding: 7.5px 15px;
    border-radius: 5px;
    @include main-shadow;
    color: $dark_text;
    font-size: 16px;
    font-weight: 400;
    transition: 0.3s ease-in-out all;
    border: 1px solid $main-color;

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  textarea {
    resize: none;
    min-height: 80px;
  }
}
</style>

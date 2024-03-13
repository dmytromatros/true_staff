<template>
  <div class="radio-checkbox-input">
    <div v-for="(radio, key) in items" :key="key" class="radio-checkbox-input__item">
      <input class="radio-checkbox-input__input" type="radio" :id="name + key" :value="radio.value" :name="name" v-model="internalValue" />
      <label class="radio-checkbox-input__label" :for="name + key">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
          />
        </svg>
      </label>
      <label class="radio-checkbox-input__text" :for="name + key">{{ radio.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: {
    items: {
      type: Array,
      default: () => {},
    },
    name: {
      type: String,
    },
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      internalValue: this.modelValue,
    };
  },
  watch: {
    internalValue(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    modelValue(newValue) {
      this.internalValue = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
.radio-checkbox-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__input {
    display: none;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  &__label {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: $white;
    border: 2px solid $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
    svg {
      width: 10px;
      height: 10px;
      display: none;
      path {
        fill: $main-color;
      }
    }
  }
  &__input:checked ~ &__label {
    svg {
      display: block;
    }
  }
  &__text {
    cursor: pointer;
  }
}
</style>

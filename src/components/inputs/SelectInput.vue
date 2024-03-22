<template>
  <div class="select-input" :class="{ disabled }">
    <span v-if="label" class="select-input__label">{{ label || placeholder }}</span>
    <div class="select-input__container" :class="{ 'select-input__container--open': open }">
      <input
        v-if="!searchable"
        type="text"
        class="select-input__input"
        :value="getLabel(internalValue)"
        @focus="openDropDown"
        @focusout="closeDropDown"
        :readonly="true"
        ref="inputRef"
        :placeholder="placeholder"
      />

      <input v-else type="text" class="select-input__input" v-model="searchValue" @focus="openDropDown" @focusout="closeDropDown" ref="inputRef" :placeholder="placeholder" />
      <FontIcon class="select-input__container-icon" icon="expand_more" />
    </div>
    <Transition name="options">
      <div v-show="open" class="select-input__options" ref="dropDown">
        <button class="select-input__option" v-for="option in tempOptions" :key="option.value" type="button">
          <div class="select-input__option-content" @click="selectValue(option.value)">
            {{ option.label }}
          </div>
        </button>
        <button class="select-input__option" v-if="!tempOptions.length" style="pointer-events: none">
          <div class="select-input__option-content">Нічого немає...</div>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
import FontIcon from '@/components/other/FontIcon.vue';
export default {
  name: 'SelectInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    modelValue: String,
  },
  emits: ['update:modelValue'],
  components: { FontIcon },
  data() {
    return {
      internalValue: this.modelValue,
      open: false,
      searchValue: this.modelValue ? this.getLabel(this.modelValue) : '',
      tempOptions: this.options,
    };
  },

  methods: {
    getLabel(id) {
      return this.options.find((option) => option.value === id)?.label;
    },

    openDropDown() {
      this.open = true;

      const dropdown = this.$refs.dropDown;

      setTimeout(() => {
        if (dropdown.getBoundingClientRect().height + dropdown.getBoundingClientRect().top > window.innerHeight) {
          dropdown.style.height = `${window.innerHeight - dropdown.getBoundingClientRect().top - 50}px`;
        }
      }, 0);
    },
    selectValue(value) {
      this.internalValue = value;
      this.searchValue = this.getLabel(value);
      this.closeDropDown();
    },

    closeDropDown() {
      setTimeout(() => {
        this.open = false;
        this.tempOptions = this.options;
        if (this.searchable) {
          this.searchValue = this.getLabel(this.internalValue);
        }
      }, 5);
    },
  },

  mounted() {
    const dropdown = this.$refs.dropDown;
    dropdown.style.maxHeight = `${window.innerHeight - (this.$refs.inputRef.getBoundingClientRect().top + this.$refs.inputRef.getBoundingClientRect().height + 5) - 50}px`;
  },

  watch: {
    internalValue(newValue) {
      if (this.searchable) this.searchValue = this.getLabel(newValue);
      this.$emit('update:modelValue', newValue);
    },
    modelValue(newValue) {
      this.internalValue = newValue;
    },
    searchValue() {
      if (this.searchable && this.open) {
        this.tempOptions = this.options.filter((option) => option.label.toLowerCase().includes(this.searchValue.toLowerCase()));
      }
    },
    options() {
      this.tempOptions = this.options;
      this.searchValue = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.select-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: $white;
  border-radius: 5px;

  &__options {
    position: absolute;
    width: 100%;
    top: 120%;
    left: 0;
    background: $white;
    box-shadow: 0 2px 10px 1px rgba($color: $black, $alpha: 0.2);
    border-radius: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 50;
    display: flex;
    flex-direction: column;
    transition: 0.25s ease all;
  }

  &__container {
    position: relative;

    &-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      color: $main-color;
      transition: 0.25s ease-in-out all;
    }

    &--open &-icon {
      transform: translateY(-50%) rotate(180deg);
      color: $second-color;
    }
  }

  &__option {
    cursor: pointer;
    white-space: break-word;
    word-wrap: break-word;
    font-size: 16px;
    transition: 0.25s ease all;
    text-align: left;

    &:hover {
      color: $main-color-hover;
      background-color: rgba($color: $placeholder-color, $alpha: 0.2);
    }
  }

  &__option-content {
    padding: 10px 15px;
  }

  &__label {
    color: $dark_text;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
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
    position: relative;

    &:hover {
      box-shadow: 0 0 10px 1px rgba($color: $black, $alpha: 0.2);
    }

    &:focus,
    &:focus-visible {
      border: 1px solid $input-focus;
    }

    &::placeholder {
      font-weight: 600;
      opacity: 0.5;
    }
  }

  &__placeholder {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    color: $placeholder-color;
    z-index: 1;
    font-weight: 600;
    opacity: 0.5;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}

.options-enter-active {
  transition: opacity 5 ease, transform 5 ease;
}

.options-enter-from {
  opacity: 0.01;
  transform: translateY(-25px);
}

.options-leave-to {
  opacity: 0.01;
  transform: translateY(-25px);
}

.options-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
</style>

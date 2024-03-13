<template>
  <div class="custom-switch">
    <div
      class="custom-switch__switcher"
      v-for="option in Object.keys(options)"
      :key="option"
      :class="{ 'custom-switch__switcher--active': internalValue === options[option] }"
      @click="
        () => {
          internalValue = options[option];
        }
      "
    >
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSwitch',
  components: {},
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    modelValue: [Number, String],
  },
  data() {
    return {
      internalValue: this.modelValue,
    };
  },
  emits: ['update:modelValue'],
  watch: {
    internalValue(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    modelValue(newValue) {
      this.internalValue = newValue;
    },
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.custom-switch {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;

  &__switcher {
    flex: 1;
    text-align: center;
    background: $white;
    border-radius: 5px;
    padding: 10px 15px;
    opacity: 0.7;
    @include main-shadow;
    transition: all 0.3s ease;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      @include main-shadow;
      opacity: 1;
    }

    &--active {
      opacity: 1;
      background: $main-color;
      color: $white;
      @include main-shadow;
    }
  }
}
</style>

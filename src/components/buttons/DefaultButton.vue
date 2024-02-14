<template>
  <div class="default-button">
    <button @click.stop="action" class="default-button__button" :class="{ danger, success, warning, disabled }">
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    danger: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    action() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.default-button {
  &__button {
    width: 100%;
    text-align: center;
    width: 100%;
    padding: 10px 15px;
    border-radius: 10px;
    @include main-shadow;
    color: $dark_text;
    font-size: 16px;
    font-weight: 400;
    transition: 0.3s ease-in-out all;
    background-color: $main-color;
    color: $white;
    font-weight: 600;
    letter-spacing: 1px;

    &.danger {
      background-color: $red-color;
    }

    &.success {
      background-color: $green-color;
    }

    &.warning {
      background-color: $yellow-color;
    }

    &.disabled {
      background-color: grey;
      pointer-events: none;
    }

    &:hover {
      opacity: 0.8;
      box-shadow: 0 0 10px 1px rgba($color: $black, $alpha: 0.3);
    }
  }
}
</style>

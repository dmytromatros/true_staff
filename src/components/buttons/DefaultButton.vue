<template>
  <div class="default-button">
    <button @click.stop="action" class="default-button__button" :class="{ danger, success, warning, disabled }">
      <span v-if="!loading">{{ label }}</span>
      <LoaderComponent v-else color="#fff" width="25px" />
    </button>
  </div>
</template>

<script>
import LoaderComponent from '../other/LoaderComponent.vue';
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

    loading: {
      type: Boolean,
      default: false,
    },
  },

  components: { LoaderComponent },
  methods: {
    action() {
      if (!this.disabled)
        this.$emit("action");
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
    padding: 5px 15px;
    border-radius: 5px;
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

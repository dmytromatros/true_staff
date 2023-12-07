<template>
  <div class="default-button">
    <button @click.stop="action" class="default-button__button">
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
    background-color: red;
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
    &:hover {
      background-color: $white;
      color: $main-color;
      outline: 1px solid $main-color;
    }
  }
}
</style>

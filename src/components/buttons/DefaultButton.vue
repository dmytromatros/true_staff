<template>
  <div class="default-button">
    <button @click="action">{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    action: {
      type: Function,
      default: () => {},
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
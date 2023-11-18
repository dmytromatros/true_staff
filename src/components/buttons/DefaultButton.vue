<template>
  <div class="default-button">
    <button @click.stop="action">{{ label }}</button>
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
</style>
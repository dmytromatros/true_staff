<template>
  <div class="base-card">
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
.base-card {
  width: 100%;
  height: 100%;
  background-color: $white;
  // border: 1px solid $main-color;
  @include main-shadow;
  padding: 15px;
  border-radius: $border-radius;
  overflow: auto;
}
</style>

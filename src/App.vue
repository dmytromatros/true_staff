<template>
  <router-view />
</template>

<script>
const { isAuth } = require("../utils/permission");

export default {
  mounted() {
    isAuth();
  },

  watch: {
    "$route.name"() {
      isAuth();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

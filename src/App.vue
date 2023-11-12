<template>
  <router-view />
</template>

<script>
const { isAuth, checkRoutePermission } = require("../utils/permission");

export default {
  mounted() {
    isAuth();
  },

  watch: {
    "$route.name"() {
      isAuth();
      checkRoutePermission();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
</style>

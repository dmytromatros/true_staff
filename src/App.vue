<template>
  <router-view class="main-router-view" />
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
@import "@/styles/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;

  background-image: url(https://www.heromarket.com.my/assets/heromarket/themes/simple/images/pattern01.jpg);
  // background-image: url(./assets/main-background.png);
  background-size: auto;
  background-repeat: repeat;

  .main-router-view {
    position: relative;
    z-index: 2;
  }
}
</style>

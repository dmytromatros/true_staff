<template>
  <MainBackground v-if="!isAuthorized" />
  <div class="header">
    <Transition name="header" appear>
      <UserHeader v-if="role == 'user'" />
    </Transition>
    <Transition name="header" appear>
      <CompanyHeader v-if="role == 'company'" />
    </Transition>

  </div>
  <div class="main-container">
    <router-view class="main-router-view" />
  </div>
  <NotificationMessage />
</template>

<script>
import UserHeader from "@/components/headers/UserHeader.vue";
import CompanyHeader from "@/components/headers/CompanyHeader.vue";
import MainBackground from "./views/System/MainBackground.vue";
import NotificationMessage from "./components/other/NotificationMessage.vue";
const {
  isAuth,
  checkRoutePermission,
  checkRole,
} = require("../utils/permission");

export default {
  computed: {
    isAuthorized() {
      return isAuth()
    }
  },
  mounted() {
    this.role = checkRole();
    isAuth();
  },

  data() {
    return {
      role: "",
    };
  },

  components: {
    UserHeader,
    CompanyHeader,
    MainBackground,
    NotificationMessage
  },

  watch: {
    "$route.name"() {
      this.role = checkRole();
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
  overflow: auto;

  background-image: url(https://www.heromarket.com.my/assets/heromarket/themes/simple/images/pattern01.jpg);
  background-size: auto;
  background-repeat: repeat;
  padding: 0 25px 0px 25px;

  display: flex;
  flex-direction: column;

  .main-router-view {
    position: relative;
    z-index: 2;
    position: relative;
  }

  .header {
    margin-bottom: 0px;
    z-index: 3;
    padding: 0 15px;
  }

  .main-container {
    overflow: hidden;
    flex: 1;
  }
}

.page-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.page-enter-from {
  transform: translateY(10vh);
  opacity: 0.01;
}

.header-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.header-enter-from {
  transform: translateY(-10vh);
  opacity: 0.01;
}
</style>

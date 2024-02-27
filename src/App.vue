<template>
  <MainBackground v-if="!isAuthorized" />
  <div class="header" v-else>
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
    },
    id() {
      return this.$store.state.id || localStorage.getItem('token');
    }
  },
  mounted() {
    this.role = checkRole();
    isAuth();
    this.setInfo()
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

  methods: {
    setInfo() {
      if (checkRole() === 'user' && this.id) {
        this.$store.dispatch('getCurrentUserAction', { id: this.id }).then(res => {
          if (res.success) {
            if (res.data.isImage) {
              this.$store.dispatch('getImageAction', { id: this.id, profile: true })
            }
          }
        })
      } else if (checkRole() === 'company' && this.id) {
        this.$store.dispatch('getCurrentCompanyAction', { id: this.id }).then(res => {
          if (res.success) {
            this.$store.dispatch('getLocationsAction', { id: this.id })
            if (res.data.isImage) {
              this.$store.dispatch('getImageAction', { id: this.id, profile: true })
            }
          }
        })
      }
    }
  },

  watch: {
    "$route.name"() {
      if (this.$route.name === 'login') {
        this.role = ''
        this.$store.commit('clearData')
      } else {
        this.role = checkRole();
        this.setInfo()
      }
      isAuth();
      checkRoutePermission();
    },

    id() {
      this.setInfo()
    }
  }
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
    // padding: 0 15px;
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

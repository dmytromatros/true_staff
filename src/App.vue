<template>
  <MainBackground v-if="!isAuthorized" />
  <div class="header" v-else>
    <Transition name="header" appear>
      <MainHeader v-if="!loading" />
    </Transition>
  </div>
  <LoaderComponent v-if="loading" />
  <div class="main-container" v-else>
    <router-view class="main-router-view" />
  </div>
  <NotificationMessage />
  <TourStep />
  <button class="open-help-popup-btn" @click="$store.state.showTour = !$store.state.showTour">
    <FontIcon icon="help" class="open-help-popup-btn-icon" />
  </button>
</template>

<script>
import MainHeader from '@/views/System/MainHeader.vue';
import MainBackground from '@/views/System/MainBackground.vue';
import NotificationMessage from '@/components/other/NotificationMessage.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import TourStep from '@/components/cards/system/TourStep.vue';
import FontIcon from '@/components/other/FontIcon.vue';
const { isAuth, checkRoutePermission, checkRole, showTour } = require('../utils/permission');

export default {
  computed: {
    isAuthorized() {
      return isAuth();
    },
    id() {
      return this.$store.state.id || localStorage.getItem('token');
    },
  },
  mounted() {
    this.role = checkRole();
    isAuth();
    this.setInfo();
  },

  data() {
    return {
      role: '',
      loading: true,
    };
  },

  components: {
    MainHeader,
    MainBackground,
    NotificationMessage,
    LoaderComponent,
    TourStep,
    FontIcon,
  },

  methods: {
    setInfo() {
      if (checkRole() === 'user' && this.id) {
        this.$store.dispatch('getCurrentUserAction', { id: this.id }).then((res) => {
          if (res.success) {
            if (res.data.isImage) {
              this.$store.dispatch('getImageAction', { id: this.id, profile: true }).then((res1) => {
                if (res1.success) this.loading = false;
              });
            } else {
              this.loading = false;
            }

            this.$store.dispatch('getUserRequestListAction', { id: this.id }).then((resRequest) => {
              this.$store.commit('setReceiveRequestsCount', resRequest.data.receive.length);
            });
          }
        });
      } else if (checkRole() === 'company' && this.id) {
        this.$store.dispatch('getCurrentCompanyAction', { id: this.id }).then((res) => {
          if (res.success) {
            this.$store.dispatch('getLocationsAction', { id: this.id });
            if (res.data.isImage) {
              this.$store.dispatch('getImageAction', { id: this.id, profile: true }).then((res1) => {
                if (res1.success) this.loading = false;
              });
            } else {
              this.loading = false;
            }

            this.$store.dispatch('getCompanyRequestListAction', { id: this.id }).then((resRequest) => {
              this.$store.commit('setReceiveRequestsCount', resRequest.data.receive.length);
            });
          }
        });
      }

      this.$store.state.showTour = showTour();
    },
  },

  watch: {
    '$route.name'() {
      if (this.$route.name === 'login') {
        this.role = '';
        this.$store.commit('clearData');
        this.loading = false;
      } else {
        this.role = checkRole();
        this.setInfo();
      }
      isAuth();
      checkRoutePermission();
    },

    id() {
      this.setInfo();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/main.scss';

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
  font-weight: 500;

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

.open-help-popup-btn {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 4;
  padding: 0;
  font-size: 35px;
  height: 35px;
  color: $main-color;
  transition: 0.25s ease-in-out all;
  background-color: transparent;

  &:hover,
  &:focus {
    color: $second-color;
  }
}

.page-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from {
  transform: translateY(10vh);
  opacity: 0.01;
}

.header-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.header-enter-from {
  transform: translateY(-10vh);
  opacity: 0.01;
}
</style>

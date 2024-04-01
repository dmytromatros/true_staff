<template>
  <div class="company-dashboard">
    <div class="company-dashboard__body">
      <MainSideBar class="company-dashboard__sidebar" />
      <div class="company-dashboard__content">
        <router-view v-slot="{ Component }">
          <LoaderComponent v-if="loading" />
          <Transition name="content" appear>
            <component v-if="!loading" :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import MainSideBar from '@/views/System/MainSideBar.vue';
export default {
  name: 'DashboardComponent',
  components: { LoaderComponent, MainSideBar },
  data() {
    return {
      loading: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.company-dashboard {
  height: 100%;

  &__body {
    height: 100%;
    gap: 20px;
    display: flex;
    padding: 15px 0;
  }

  &__sidebar {
    position: relative;
    z-index: 2;
  }

  &__content {
    position: relative;
    z-index: 1;
    flex: 1;
  }

  &__send-review {
    height: 100%;
  }


}

.content-enter-active {
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.content-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.content-enter-from {
  transform: translateX(10vh);
  opacity: 0.01;
}

.content-leave-to {
  transform: translateX(-10vh);
  opacity: 0.01;
}
</style>

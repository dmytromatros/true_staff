<template>
  <div class="company-dashboard">
    <div class="company-dashboard__body">
      <Transition name="sidebar" appear>
        <div class="company-dashboard__sidebar">
          <MenuCard class="company-dashboard__sidebar-link" label="Локації" link="company-locations" icon="location_on" />

          <MenuCard class="company-dashboard__sidebar-link" label="Працівники" link="company-dashboard" icon="groups" />

          <MenuCard class="company-dashboard__sidebar-link" label="Знайти користувача" link="company-search-user" icon="person_search" />

          <MenuCard class="company-dashboard__sidebar-link" label="Запити до співпраці" link="company-requests" icon="forum" :message="true" />

          <MenuCard class="company-dashboard__sidebar-link company-dashboard__sidebar-link--profile" label="Профіль" link="company-settings" :key="updateKey" icon="person" />
        </div>
      </Transition>
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
import MenuCard from '@/components/cards/system/MenuCard.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
export default {
  name: 'CompanyDashboard',
  components: { MenuCard, LoaderComponent },
  data() {
    return {
      image: null,
      updateKey: Date.now(),
      loading: false,
    };
  },
  methods: {
    settingsFn() {
      this.$router.push({
        name: 'company-settings',
      });
    },
    requestsFn() {
      this.$router.push({
        name: 'company-requests',
      });
    },
    checkRoute(route) {
      return this.$route.name == route;
    },
  },
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;
    height: 100%;
    overflow: auto;
    padding: 15px;
    width: 93px;
    background: white;
    border-radius: 10px;
    transition: 0.25s ease-in-out all;

    &:hover {
      width: 300px;
    }
  }

  &__content {
    flex: 1;
  }

  &__send-review {
    height: 100%;
  }

  &__sidebar-link {
    height: fit-content;

    &--profile {
      flex: 1;
      align-items: flex-end;
    }
  }
}

.sidebar-enter-active,
.content-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.sidebar-enter-from {
  transform: translateX(-10vh);
  opacity: 0.01;
}

.content-enter-from,
.content-leave-to {
  transform: translateX(10vh);
  opacity: 0.01;
}
</style>

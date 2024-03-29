<template>
  <div class="user-dashboard">
    <div class="user-dashboard__body">
      <Transition name="sidebar" appear>
        <div class="user-dashboard__sidebar">
          <MenuCard class="user-dashboard__sidebar-link" label="Знайти користувача" link="user-dashboard"
            icon="person_search" />

          <MenuCard class="user-dashboard__sidebar-link" label="Запити до співпраці" link="user-requests" icon="forum"
            :message="true" />

          <MenuCard class="user-dashboard__sidebar-link user-dashboard__sidebar-link--profile" label="Профіль"
            link="user-settings" :key="updateKey" icon="person" />
        </div>
      </Transition>
      <div class="user-dashboard__content">
        <router-view v-slot="{ Component }">
          <Transition name="content" appear>
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MenuCard from '@/components/cards/system/MenuCard.vue';
export default {
  name: 'UserDashboard',
  components: { MenuCard },
  data() {
    return {
      image: null,
      updateKey: Date.now(),
    };
  },
  methods: {
    settingsFn() {
      this.$router.push({
        name: 'user-settings',
      });
    },
    requestsFn() {
      this.$router.push({
        name: 'user-requests',
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

.user-dashboard {
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
    padding: 7px;
    width: 60px;
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

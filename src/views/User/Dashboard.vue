<template>
  <div class="user-dashboard">
    <div class="user-dashboard__body">
      <Transition name="sidebar" appear>
        <div class="user-dashboard__sidebar">
          <MenuCard class="user-dashboard__sidebar-link" label="Знайти користувача" link="user-dashboard">
            <template v-slot:image>
              <img src="/img/m-glass.avif" alt="Знайти користувача" style="object-position: left" />
            </template>
          </MenuCard>

          <MenuCard class="user-dashboard__sidebar-link" label="Запити до співпраці" link="user-requests">
            <template v-slot:image>
              <img src="/img/cooperation.avif" alt="Запити до співпраці" />
            </template>
          </MenuCard>

          <MenuCard class="user-dashboard__sidebar-link user-dashboard__sidebar-link--profile" label="Профіль" link="user-settings" :key="updateKey">
            <template v-slot:image>
              <img :src="$store.state.profileImage || '/img/profile-img.webp'" alt="Профіль" />
            </template>
          </MenuCard>
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
    padding: 15px;
    flex: 1;

    background: white;
    border-radius: 10px;
  }

  &__content {
    flex: 4.5;
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

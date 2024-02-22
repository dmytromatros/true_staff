<template>
  <div class="user-dashboard">
    <div class="user-dashboard__body">
      <Transition name="sidebar" appear>
        <div class="user-dashboard__sidebar">
          <!-- <UserCard class="user-dashboard__sidebar-link" label="Профіль" link="user-settings"
            :background_1="checkRoute('user-settings') ? '#00243f' : '#93dff5'"
            :background_2="checkRoute('user-settings') ? '#00243f' : '#2aafd4'" :class="[
              {
                'user-dashboard__sidebar-link--active':
                  checkRoute('user-settings'),
              },
            ]" /> -->


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

          <MenuCard class="user-dashboard__sidebar-link user-dashboard__sidebar-link--profile" label="Профіль"
            link="user-settings">
            <template v-slot:image>
              <img :src="image || '/img/profile-img.webp'" alt="Профіль" style="object-position: left" />
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
import MenuCard from "@/components/cards/system/MenuCard.vue";
import UserCard from "@/components/cards/user/UserCard.vue";
export default {
  name: "UserDashboard",
  components: { MenuCard, UserCard },
  data() {
    return {
      image: null
    }
  },
  methods: {
    settingsFn() {
      this.$router.push({
        name: "user-settings",
      });
    },
    requestsFn() {
      this.$router.push({
        name: "user-requests",
      });
    },
    checkRoute(route) {
      return this.$route.name == route;
    },
  },
  mounted() {
    this.$store
      .dispatch("getUserAction", { id: this.$route.params.id })
      .then((res) => {
        if (res.success) {
          this.name = `${res.data.name} ${res.data.surname}`;
          this.$store
            .dispatch("getImageAction", { id: this.$route.params.id })
            .then((res) => {
              this.image = res.data;
            });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

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
    flex: 4;
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
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
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

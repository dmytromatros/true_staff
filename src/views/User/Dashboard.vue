<template>
  <div class="user-dashboard">
    <div class="user-dashboard__body">
      <div class="user-dashboard__sidebar">
        <UserCard class="user-dashboard__sidebar-link" label="Профіль" link="user-settings"
          :background_1="checkRoute('user-settings') ? '#00243f' : '#93dff5'"
          :background_2="checkRoute('user-settings') ? '#00243f' : '#2aafd4'" :class="[
            {
              'user-dashboard__sidebar-link--active':
                checkRoute('user-settings'),
            },
          ]" />

        <!-- <MenuCard
          class="user-dashboard__sidebar-link"
          label="Залишити відгук"
          link="user-dashboard"
          :background_1="checkRoute('user-dashboard') ? '#00243f' : '#fff'"
          :background_2="checkRoute('user-dashboard') ? '#0a5a99 ' : '#fff'"
          :class="[
            {
              'user-dashboard__sidebar-link--active':
                checkRoute('user-dashboard'),
            },
          ]"
        >
          <template v-slot:image>
            <img
              src="@/assets/img/reviews-img.avif"
              alt="Налаштування профілю"
            />
          </template>
        </MenuCard> -->

        <MenuCard class="user-dashboard__sidebar-link" label="Знайти користувача" link="user-dashboard"
          :background_1="checkRoute('user-dashboard') ? '#00243f' : '#fff'"
          :background_2="checkRoute('user-dashboard') ? '#0a5a99 ' : '#fff'" :class="[
            {
              'user-dashboard__sidebar-link--active':
                checkRoute('user-dashboard'),
            },
          ]">
          <template v-slot:image>
            <img src="/img/m-glass.avif" alt="Знайти користувача" style="object-position: left" />
          </template>
        </MenuCard>

        <MenuCard class="user-dashboard__sidebar-link" label="Запити до співпраці" link="user-requests"
          :background_1="checkRoute('user-requests') ? '#00243f' : '#fff'"
          :background_2="checkRoute('user-requests') ? '#0a5a99 ' : '#fff'" :class="[
            {
              'user-dashboard__sidebar-link--active':
                checkRoute('user-requests'),
            },
          ]">
          <template v-slot:image>
            <img src="/img/cooperation.avif" alt="Запити до співпраці" />
          </template>
        </MenuCard>

      </div>
      <div class="user-dashboard__content">
        <router-view />
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
  }

  &__sidebar {
    display: grid;
    grid-template-rows: 2.5fr repeat(2, 1fr);
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    gap: 15px;
    height: 100%;
    overflow: auto;
    padding: 15px;
    flex: 1;

    &-link--active {
      :deep(.menu-card__label) {
        color: $white !important;
      }

      :deep(.menu-card__name) {
        color: $white !important;
      }

      :deep(.user-card__label) {
        color: $white !important;
      }

      :deep(.user-card__name) {
        color: $white !important;
      }

      :deep(.user-card__bottom) {
        background-color: rgba($color: $main-color, $alpha: 0.4);
      }
    }
  }

  &__content {
    // padding: 15px;
    flex: 4;
    // @media (max-width: 1600px) {
    //   flex: 3;
    // }
  }

  &__send-review {
    height: 100%;
  }
}
</style>

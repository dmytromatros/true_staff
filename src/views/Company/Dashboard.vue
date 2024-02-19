<template>
  <div class="company-dashboard">
    <div class="company-dashboard__body">
      <div class="company-dashboard__sidebar">
        <CompanyCard class="company-dashboard__sidebar-link" label="Профіль" link="company-settings"
          :background_1="checkRoute('company-settings') ? '#00243f' : '#93dff5'"
          :background_2="checkRoute('company-settings') ? '#00243f' : '#2aafd4'" :class="[
            {
              'company-dashboard__sidebar-link--active':
                checkRoute('company-settings'),
            },
          ]" />

        <MenuCard class="company-dashboard__sidebar-link" label="Локації" link="company-locations">
          <template v-slot:image>
            <img src="/img/reviews-img.avif" alt="Налаштування профілю" />
          </template>
        </MenuCard>

        <MenuCard class="company-dashboard__sidebar-link" label="Працівники" link="company-dashboard">
          <template v-slot:image>
            <img src="/img/m-glass.avif" alt="Знайти користувача" style="object-position: left" />
          </template>
        </MenuCard>

        <MenuCard class="company-dashboard__sidebar-link" label="Запити до співпраці" link="company-requests">
          <template v-slot:image>
            <img src="/img/cooperation.avif" alt="Запити до співпраці" />
          </template>
        </MenuCard>
      </div>
      <div class="company-dashboard__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MenuCard from "@/components/cards/system/MenuCard.vue";
import CompanyCard from "@/components/cards/company/CompanyCard.vue";
export default {
  name: "CompanyDashboard",
  components: { MenuCard, CompanyCard },
  methods: {
    settingsFn() {
      this.$router.push({
        name: "company-settings",
      });
    },
    requestsFn() {
      this.$router.push({
        name: "company-requests",
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

.company-dashboard {
  height: 100%;

  &__body {
    height: 100%;
    gap: 20px;
    display: flex;
  }

  &__sidebar {
    display: grid;
    grid-template-rows: 2.5fr repeat(2, 1fr);
    gap: 15px;
    height: 100%;
    overflow: auto;
    padding: 15px;
    flex: 1;

  }

  &__content {
    flex: 4;
  }

  &__send-review {
    height: 100%;
  }
}
</style>

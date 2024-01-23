<template>
  <div class="company-dashboard">
    <div class="company-dashboard__body">
      <div class="company-dashboard__sidebar">
        <CompanyCard
          class="company-dashboard__sidebar-link"
          label="Профіль"
          link="company-settings"
          :background_1="checkRoute('company-settings') ? '#00243f' : '#93dff5'"
          :background_2="checkRoute('company-settings') ? '#00243f' : '#2aafd4'"
          :class="[
            {
              'company-dashboard__sidebar-link--active':
                checkRoute('company-settings'),
            },
          ]"
        />

        <MenuCard
          class="company-dashboard__sidebar-link"
          label="Локації"
          link="company-locations"
          :background_1="checkRoute('company-locations') ? '#00243f' : '#fff'"
          :background_2="checkRoute('company-locations') ? '#0a5a99 ' : '#fff'"
          :class="[
            {
              'company-dashboard__sidebar-link--active':
                checkRoute('company-locations'),
            },
          ]"
        >
          <template v-slot:image>
            <img
              src="@/assets/img/reviews-img.avif"
              alt="Налаштування профілю"
            />
          </template>
        </MenuCard>

        <MenuCard
          class="company-dashboard__sidebar-link"
          label="Працівники"
          link="company-dashboard"
          :background_1="checkRoute('company-dashboard') ? '#00243f' : '#fff'"
          :background_2="checkRoute('company-dashboard') ? '#0a5a99 ' : '#fff'"
          :class="[
            {
              'company-dashboard__sidebar-link--active':
                checkRoute('company-dashboard'),
            },
          ]"
        >
          <template v-slot:image>
            <img
              src="@/assets/img/m-glass.avif"
              alt="Знайти користувача"
              style="object-position: left"
            />
          </template>
        </MenuCard>

        <MenuCard
          class="company-dashboard__sidebar-link"
          label="Запити до співпраці"
          link="company-requests"
          :background_1="checkRoute('company-requests') ? '#00243f' : '#fff'"
          :background_2="checkRoute('company-requests') ? '#0a5a99 ' : '#fff'"
          :class="[
            {
              'company-dashboard__sidebar-link--active':
                checkRoute('company-requests'),
            },
          ]"
        >
          <template v-slot:image>
            <img
              src="@/assets/img/cooperation.avif"
              alt="Запити до співпраці"
            />
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
import MenuCard from "@/components/cards/MenuCard.vue";
import CompanyCard from "@/components/cards/CompanyCard.vue";
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
      :deep(.company-card__label) {
        color: $white !important;
      }
      :deep(.company-card__name) {
        color: $white !important;
      }
      :deep(.company-card__bottom) {
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

<!-- 
<template>
  <div class="copmany-dashboard">
    <button @click="locationsFn">Locations</button>
    <button @click="employeesFn">Employees</button>
    <button @click="requestsFn">Requests</button>
    <h2>Copmany settings</h2>
    <div class="copmany-dashboard__form">
      <img
        class="copmany-dashboard__photo"
        src="https://media.istockphoto.com/id/178447404/photo/modern-business-buildings.jpg?s=612x612&w=0&k=20&c=MOG9lvRz7WjsVyW3IiQ0srEzpaBPDcc7qxYsBCvAUJs="
        alt="comp_photo"
      />
      <TextInput label="Company name" v-model="company.name" />
      <TextInput
        label="Company login (disabled)"
        :disabled="true"
        v-model="company.login"
      />
      <div class="copmany-dashboard__pass">
        <TextInput
          label="Company password"
          type="password "
          :disabled="true"
          v-model="company.password"
        />
        <DefaultButton label="Change password" @click="openPopup" />
      </div>
      <DefaultButton label="Save" @click="saveChangesFn" />
    </div>
    <ChangeCompanyPasswordPopup
      :isShown="changePassPopup"
      @close="closePopup"
    />
  </div>
</template> -->

<!-- <script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import ChangeCompanyPasswordPopup from "@/components/popups/ChangeCompanyPasswordPopup.vue";

export default {
  name: "CopmanyDashboard",
  components: { TextInput, DefaultButton, ChangeCompanyPasswordPopup },
  data() {
    return {
      company: {
        name: "",
        login: "",
        password: "",
      },
      changePassPopup: false,
    };
  },
  methods: {
    logoutFn() {
      this.$store.dispatch("logOutAction");
    },
    async saveChangesFn() {
      this.$store.dispatch("editCompanyAction", {
        name: this.company.name,
        password: this.company.password,
        id: this.$route.params.id,
      });
    },
    locationsFn() {
      this.$router.push({
        name: "company-locations",
        params: {
          id: this.$route.params.id,
        },
      });
    },
    employeesFn() {
      this.$router.push({
        name: "company-employees",
        params: {
          id: this.$route.params.id,
        },
      });
    },
    requestsFn() {
      this.$router.push({
        name: "company-requests",
        params: {
          id: this.$route.params.id,
        },
      });
    },
    openPopup() {
      this.changePassPopup = true;
    },
    closePopup() {
      this.changePassPopup = false;
    },
  },
  mounted() {
    this.$store
      .dispatch("getCompanyAction", { id: this.$route.params.id })
      .then((res) => {
        if (res.success) {
          this.company.name = res.data.name;
          this.company.login = res.data.login;
          this.company.password = res.data.password;
        }
      });
  },
};
</script> -->

<template>
  <div class="employees-list">

    <LoaderComponent v-if="loading" />

    <div v-if="!loading" class="employees-list__switcher">
      <button class="employees-list__switch" @click="switchPage(1)"
        :class="{ 'employees-list__switch--active': page == 1 }">Робітники</button>
      <button class="employees-list__switch" @click="switchPage(2)"
        :class="{ 'employees-list__switch--active': page == 2 }">Знайти користувача</button>
    </div>
    <div class="employees-list__container" v-if="page == 1 && !loading">
      <div class="employees-list__list" v-for="(emp, key) in employees" :key="key">
        <EmployeeCard :employeeId="emp.employeeId" :location="emp.locationAddress" :position="emp.position"
          :employee-name="emp.employeeName" />

      </div>

      <div class="employees-list__new">

        <BaseCard class="employees-list__new-card">
          <template v-slot:body>
            <div class="employees-list__new-card-title">Додати нового співробітника</div>
            <SelectInput placeholder="Локація" :options="locations" v-model="newEmployee.location" />
            <TextInput placeholder="ID користувача" type="text" v-model="userId" />
            <TextInput placeholder="Повідомлення" type="text" v-model="newEmployee.message" :textarea="true" />
            <TextInput placeholder="Посада" type="text" v-model="newEmployee.position" />

            <DefaultButton label="Add employee" @click="addEmployee" />
          </template>
        </BaseCard>
      </div>
    </div>
    <div class="employees-list__find" v-if="page == 2 && !loading">
      <UserSearch />
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import EmployeeCard from "@/components/cards/EmployeeCard.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import BaseCard from "@/components/cards/BaseCard.vue";
import LoaderComponent from "@/components/other/LoaderComponent.vue";
import UserSearch from "@/components/UserSearch/UserSearch.vue";
export default {
  name: "EmployeesList",
  components: { DefaultButton, EmployeeCard, TextInput, SelectInput, BaseCard, LoaderComponent, UserSearch },
  data() {
    return {
      employees: [],
      locations: [],
      newEmployee: {
        location: '',
        position: '',
        message: '',
      },
      page: 2,
      loading: true,
    };
  },
  methods: {
    addEmployee() {
      this.$router.push({
        name: "add_employee",
      });
    },
    async deleteEmployee(id) {
      let data = {
        id: this.$route.params.id,
        employeeId: id,
      };
      await this.$store.dispatch("deleteEmployeeAction", data).then((res) => {
        if (res.success) this.getEmployees();
      });
    },
    getEmployees() {
      this.$store
        .dispatch("getCompanyEmployeesAction", {
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.success) {
            this.employees = res.data;
            this.loading = false;
          }
        });
    },
    getLocations() {
      this.$store
        .dispatch("getLocationsAction", {
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.success) {
            for (const key in res.data) {
              if (Object.hasOwnProperty.call(res.data, key)) {
                this.locations.push({
                  label: res.data[key].address,
                  value: res.data[key]._id,
                });
              }
            }
          }
        });
    },
    switchPage(page) {
      this.page = page
    }
  },
  mounted() {
    this.getEmployees();
    this.getLocations()
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.employees-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 15px;

  &__container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 15px;

  }

  &__find {
    flex: 1;
    max-height: calc(100% - 55px);
  }

  &__list {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 15px;
  }

  &__new {
    padding: 15px;
  }

  &__new-card {
    height: fit-content !important;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__new-card-title {
    padding: 0 10px;
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 25px;
  }

  &__switcher {
    background: $white;
    width: calc(100% - 15px);
    border-radius: 10px;
    padding: 0 15px;
    height: 55px;
    @include main-shadow;
  }

  &__switch {
    padding: 12px 15px;
    font-size: 18px;
    transition: 0.25s ease-in-out all;
    background: transparent;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: calc(100% - 30px);
      border: 3px;
      background: $main-color-hover;
      bottom: 15px;
      left: 15px;
      transition: 0.25s ease-in-out all;
      opacity: 0;
    }

    &:hover {
      color: $main-color-hover;
    }

    &--active {
      color: $main-color-hover;

      &::after {
        opacity: 1;
      }

    }
  }
}
</style>

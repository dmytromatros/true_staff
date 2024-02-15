<template>
  <div class="employees-list">

    <LoaderComponent v-if="loading" />

    <div v-if="!loading" class="employees-list__switcher">
      <button class="employees-list__switch employees-list__switch--active">Робітники</button>
      <button class="employees-list__switch" @click="() => { this.$router.push({ name: 'company-search-user' }) }">Знайти
        користувача</button>
    </div>
    <div class="employees-list__container" v-if="!loading">
      <div class="employees-list__list">
        <EmployeeCard v-for="(emp, key) in employees" :key="key" :employeeId="emp.employeeId"
          :location="emp.locationAddress" :position="emp.position" :employee-name="emp.employeeName"
          @deleted="getEmployees" />
      </div>

      <div class="employees-list__new">
        <AddEmployeeCard :locations="locations" />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeCard from "@/components/cards/company/EmployeeCard.vue";
import LoaderComponent from "@/components/other/LoaderComponent.vue";
import AddEmployeeCard from "@/components/cards/company/AddEmployeeCard.vue";
export default {
  name: "EmployeesList",
  components: { EmployeeCard, LoaderComponent, AddEmployeeCard },
  data() {
    return {
      employees: [],
      locations: [],
      loading: true,
    };
  },
  methods: {
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
    flex: 1;
    max-height: 91%;

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
    overflow-x: hidden;
  }

  &__new {
    padding: 15px;
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

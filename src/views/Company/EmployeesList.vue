<template>
  <div class="employees-list">

    <LoaderComponent v-if="loading" />
    <div class="employees-list__label" v-if="!loading && !Object.keys(employees).length">У вас немає працівників.</div>
    <div class="employees-list__container" v-if="!loading">
      <div class="employees-list__list">
        <EmployeeCard v-for="(emp, key) in employees" :key="key + reloadData" :employeeId="emp.employeeId"
          :location="emp.locationAddress" :position="emp.position" :employee-name="emp.employeeName"
          @deleted="getEmployees" :unique-id="emp.uniqueId" :locationId="emp.locationId" />
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
      reloadData: Date.now(),
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
            this.reloadData = Date.now()
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

  &__container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 15px;
    flex: 1;
    max-height: 100%;

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
    overflow-x: hidden;
  }

  &__new {
    padding: 15px;
  }

  &__label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 600;
  }
}
</style>

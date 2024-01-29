<template>
  <div class="employees-list">

    <div class="employees-list__switcher">
      <button @click="switchPage(1)">All</button>
      <button @click="switchPage(2)">find</button>
    </div>
    <div class="employees-list__container" v-if="page == 1">
      <div class="employees-list__list" v-for="(emp, key) in employees" :key="key">
        <EmployeeCard :employeeId="emp.employeeId" :location="emp.locationAddress" :position="emp.position"
          :employee-name="emp.employeeName" />

      </div>

      <div class="employees-list__new">

        <BaseCard class="employees-list__new-card">
          <template v-slot:body>
            <div>Додати нового співробітника</div>
            <SelectInput label="Select location" :options="locations" v-model="newEmployee.location" />
            <TextInput label="User id code" type="text" v-model="userId" />
            <TextInput label="Message" type="text" v-model="newEmployee.message" :textarea="true" />
            <TextInput label="Position" type="text" v-model="newEmployee.position" />

            <DefaultButton label="Add employee" @click="addEmployee" />
          </template>
        </BaseCard>
      </div>
    </div>
    <div class="employees-list__find" v-if="page == 2">
      <SearchCard />
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import EmployeeCard from "@/components/cards/EmployeeCard.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import BaseCard from "@/components/cards/BaseCard.vue";
import SearchCard from "@/components/cards/SearchCard.vue";
export default {
  name: "EmployeesList",
  components: { DefaultButton, EmployeeCard, TextInput, SelectInput, BaseCard, SearchCard },
  data() {
    return {
      employees: [],
      locations: [],
      newEmployee: {
        location: '',
        position: '',
        message: ''
      },
      page: 1
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
          if (res.success) this.employees = res.data;
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
.employees-list {
  height: 100%;

  &__container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 15px;
    height: 100%;
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
  }
}
</style>

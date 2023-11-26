<template>
  <div class="add-location">
    <h2>Employees:</h2>
    <div v-for="(emp, key) in employees" :key="key">
      <DefaultButton
        label="Delete employee"
        @click="deleteEmployee(emp.employeeId)"
      />
      <div>Location : {{ emp.locationAddress }}</div>
      <div>Employee : {{ emp.employeeName }}</div>
      <div>position : {{ emp.position }}</div>
    </div>
    <DefaultButton label="Add employee" @click="addEmployee" />

    <router-view name="add_employee"></router-view>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "EmployeesList",
  components: { DefaultButton },
  data() {
    return {
      employees: [],
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
  },
  mounted() {
    this.getEmployees();
  },
};
</script>

<style lang="scss" scoped></style>

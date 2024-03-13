<template>
  <div class="employees-list">
    <LoaderComponent v-if="loading" />
    <div class="employees-list__label" v-if="!loading && !Object.keys(employees).length">У вас немає працівників.</div>
    <div class="employees-list__container" v-if="!loading">
      <div class="employees-list__list">
        <EmployeeCard
          v-for="(emp, key) in employees"
          :key="key + reloadData"
          :employeeId="emp.employeeId"
          :location="emp.locationAddress"
          :position="emp.position"
          :employee-name="emp.employeeName"
          @deleted="getEmployees"
          :unique-id="emp.uniqueId"
          :locationId="emp.locationId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeCard from '@/components/cards/company/EmployeeCard.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
export default {
  name: 'EmployeesList',
  components: { EmployeeCard, LoaderComponent },
  data() {
    return {
      employees: [],
      loading: true,
      reloadData: Date.now(),
    };
  },
  methods: {
    async deleteEmployee(id) {
      let data = {
        id: this.$store.state.id,
        employeeId: id,
      };
      await this.$store.dispatch('deleteEmployeeAction', data).then((res) => {
        if (res.success) this.getEmployees();
      });
    },
    getEmployees() {
      this.$store
        .dispatch('getCompanyEmployeesAction', {
          id: this.$store.state.id,
        })
        .then((res) => {
          if (res.success) {
            this.employees = res.data;
            this.loading = false;
            this.reloadData = Date.now();
          }
        });
    },
  },
  mounted() {
    this.getEmployees();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.employees-list {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__container {
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
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
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

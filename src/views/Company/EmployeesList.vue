<template>
  <div class="employees-list">
    <LoaderComponent v-if="loading" />
    <div class="employees-list__nav" v-if="!loading">
      <SelectInput class="employees-list__nav-select" :options="options" placeholder="Оберіть локацію"
        v-model="selectedLocation" />
      <DefaultButton v-if="selectedLocation" class="employees-list__nav-button" @action="selectedLocation = ''"
        label="Показати всіх" />
    </div>

    <div class="employees-list__label" v-if="!loading && !Object.keys(tempEmployees).length">У вас немає працівників.
    </div>
    <div class="employees-list__container" v-if="!loading">
      <div class="employees-list__list">
        <EmployeeCard v-for="(emp, key) in tempEmployees" :key="key + reloadData" :employeeId="emp.employeeId"
          :location="emp.locationAddress" :position="emp.position" :employee-name="emp.employeeName"
          @deleted="getEmployees" :unique-id="emp.uniqueId" :locationId="emp.locationId" />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeCard from '@/components/cards/company/EmployeeCard.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';
import DefaultButton from '@/components/buttons/DefaultButton.vue';
export default {
  name: 'EmployeesList',
  components: { EmployeeCard, LoaderComponent, SelectInput, DefaultButton },
  data() {
    return {
      employees: [],
      tempEmployees: [],
      loading: true,
      reloadData: Date.now(),
      options: [],
      selectedLocation: '',
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
            this.tempEmployees = res.data;
            this.loading = false;
            this.reloadData = Date.now();

            this.getLocationsFn();
          }
        });
    },

    getLocationsFn() {
      this.$store
        .dispatch('getLocationsAction', {
          id: this.$store.state.id,
        })
        .then((res) => {
          if (res.success) {
            this.options = res.data.map((location) => ({
              value: location._id,
              label: location.address,
            }));
          }
        });
    },
  },

  watch: {
    employees() {
      this.tempEmployees = this.employees;
    },
    selectedLocation() {
      if (Array.isArray(this.employees)) {
        if (this.selectedLocation.length) {
          this.tempEmployees = this.employees.filter((emp) => emp.locationId.toLowerCase().includes(this.selectedLocation.toLowerCase()));
        } else {
          this.tempEmployees = this.employees;
        }
        this.tempEmployees.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
      } else if (typeof this.employees === 'object') {
        if (this.selectedLocation.length) {
          const filteredEmployees = {};
          Object.keys(this.employees).forEach((key) => {
            if (this.employees[key].locationId.toLowerCase().includes(this.selectedLocation.toLowerCase())) {
              filteredEmployees[key] = this.employees[key];
            }
          });
          this.tempEmployees = filteredEmployees;
        } else {
          this.tempEmployees = this.employees;
        }
        const sortedEmployees = {};
        Object.keys(this.tempEmployees)
          .sort()
          .forEach((key) => {
            sortedEmployees[key] = this.tempEmployees[key];
          });
        this.tempEmployees = sortedEmployees;
      }
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

  &__nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    gap: 15px;
  }

  &__nav-select {
    width: fit-content;
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

<template>
  <div class="employees-list">

    <LoaderComponent v-if="loading" />

    <div v-if="!loading" class="employees-list__switcher">
      <button class="employees-list__switch employees-list__switch--active">Робітники</button>
      <button class="employees-list__switch" @click="() => { this.$router.push({ name: 'company-search-user' }) }">Знайти
        користувача</button>
    </div>
    <div class="employees-list__container" v-if="!loading">
      <div class="employees-list__list" v-for="(emp, key) in employees" :key="key">
        <EmployeeCard :employeeId="emp.employeeId" :location="emp.locationAddress" :position="emp.position"
          :employee-name="emp.employeeName" />

      </div>

      <div class="employees-list__new">

        <BaseCard class="employees-list__new-card">
          <template v-slot:body>
            <div class="employees-list__new-card-title">Додати нового співробітника</div>
            <SelectInput placeholder="Локація" :options="locations" v-model="newEmployee.location" />
            <TextInput placeholder="ID користувача" type="text" v-model="newEmployee.userId" />
            <TextInput placeholder="Повідомлення" type="text" v-model="newEmployee.message" :textarea="true" />
            <TextInput placeholder="Посада" type="text" v-model="newEmployee.position" />

            <DefaultButton label="Add employee" @click="addEmployee" />
          </template>
        </BaseCard>
      </div>
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
export default {
  name: "EmployeesList",
  components: { DefaultButton, EmployeeCard, TextInput, SelectInput, BaseCard, LoaderComponent },
  data() {
    return {
      employees: [],
      locations: [],
      newEmployee: {
        location: '',
        position: '',
        message: '',
        userId: '',
      },
      loading: true,
    };
  },
  methods: {
    async addEmployee() {
      const employeeName = await this.getUserName(this.newEmployee.userId);
      let data = {
        companyId: this.companyId,
        companyName: this.companyName,
        locationId: this.selectedLocation,
        locationAddress: this.getLocationAddress(this.selectedLocation),
        employeeId: this.userId,
        employeeName: employeeName,
        message: this.message,
        position: this.position,
        type: 1,
      };

      this.$store.dispatch("addCompanyRequestAction", data);
    },

    async getUserName(id) {
      try {
        const res = await this.$store.dispatch("getUserAction", { id });
        if (res.success) {
          return `${res.data.name} ${res.data.surname}`;
        }
      } catch (error) {
        console.error(error);
        // Handle error as needed, e.g., return a default value or throw an error
        return "";
      }
    },

    getLocationAddress(id) {
      let address = "";
      this.locations.forEach((loc) => {
        if (loc.value == id) {
          address = loc.label;
        }
      });
      return address;
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

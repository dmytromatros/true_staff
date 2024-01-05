<template>
  <DefaultPopup
    :isShown="true"
    @close="close"
    title="Додати робітника"
    @confirm="addEmployee"
    :confirmLabel="'Додати'"
  >
    <template v-slot:body>
      <div class="change-password">
        <SelectInput
          label="Select location"
          :options="locations"
          v-model="selectedLocation"
        />
        <TextInput label="User id code" type="text" v-model="userId" />
        <TextInput
          label="Message"
          type="text"
          v-model="message"
          :textarea="true"
        />
        <TextInput label="Position" type="text" v-model="position" />
      </div>
    </template>
  </DefaultPopup>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultPopup from "@/components/popups/DefaultPopup.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";

export default {
  name: "AddEmployeePopup",
  components: { TextInput, DefaultPopup, SelectInput },
  props: {
    isShown: Boolean,
  },
  data() {
    return {
      locations: [],
      selectedLocation: "",
      userId: "",
      message: "",
      companyId: "",
      companyName: "",
      position: "",
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    async addEmployee() {
      const employeeName = await this.getUserName(this.userId);
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
    getCompany() {
      this.$store
        .dispatch("getCompanyAction", {
          id: this.$route.params.id,
        })
        .then((res) => {
          this.companyId = res.data._id;
          this.companyName = res.data.name;
        });
    },
  },
  mounted() {
    this.getLocations();
    this.getCompany();
  },
};
</script>

<style lang="scss" scoped></style>

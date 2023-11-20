<template>
  <DefaultPopup
    :isShown="true"
    @close="close"
    title="Add new employee"
    @confirm="addEmployee"
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
          label="Messege"
          type="text"
          v-model="messege"
          :textarea="true"
        />
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
      messege: "",
      company: {
        id: "",
        name: "",
      },
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    addEmployee() {
      let data = {
        company: { ...this.company },
        location: {
          id: this.selectedLocation,
          adress: this.getLocationAdress(this.selectedLocation),
        },
        recivier: this.userId,
        messege: this.messege,
        type: 1,
      };

      this.$store.dispatch("addCompanyRequestAction", data);
    },
    getLocationAdress(id) {
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
                  label: res.data[key].adress,
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
          this.company.id = res.data._id;
          this.company.name = res.data.name;
        });
    },
  },
  mounted() {
    this.getLocations();
    this.getCompany();
  },
};
</script>

<style lang="scss" scoped>
</style>
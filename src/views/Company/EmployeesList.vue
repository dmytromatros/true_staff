<template>
  <div class="add-location">
    Employees:
    <DefaultButton label="Add employee" @click="addEmployee" />

    <router-view name="add_employee"></router-view>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "AddEmployee",
  components: { DefaultButton },
  methods: {
    addEmployee() {
      this.$router.push({
        name: "add_employee",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
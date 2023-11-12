<template>
  <div class="copmany-dashboard">
    <div>copmany dashboard</div>
    <button @click="logoutFn">Log out</button>
  </div>
</template>

<script>
export default {
  name: "CopmanyDashboard",
  methods: {
    async logoutFn() {
      this.$store.dispatch("logOutAction");
    },
  },
};
</script>

<style lang="scss" scoped>
.copmany-dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>
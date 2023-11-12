<template>
  <div class="user-dashboard">
    <div>user dashboard</div>
    <button @click="logoutFn">Log out</button>
  </div>
</template>

<script>
export default {
  name: "UserDashboard",
  methods: {
    async logoutFn() {
      this.$store.dispatch("logOutAction");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>
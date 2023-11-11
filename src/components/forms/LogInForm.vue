<template>
  <div class="log-in-form">
    <select name="role" id="role" v-model="role">
      <option value="company">Company</option>
      <option value="user" selected>user</option>
    </select>

    <form class="log-in-form__form" @submit.prevent="loginFn">
      <input type="email" v-model="login" />
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>

    <button @click="logoutFn">Log out</button>
  </div>
</template>
  
  <script>
export default {
  name: "LogInForm",
  data() {
    return {
      login: "",
      password: "",
      role: "user",
    };
  },
  methods: {
    async loginFn() {
      switch (this.role) {
        case "user":
          this.$store.dispatch("logInUserAction", {
            email: this.login,
            password: this.password,
          });
          break;

        case "company":
          this.$store.dispatch("logInCompanyAction", {
            login: this.login,
            password: this.password,
          });
          break;
      }
    },
    async logoutFn() {
      this.$store.dispatch("logOutAction");
    },
  },
};
</script>
  
  <style lang="scss" scoped></style>
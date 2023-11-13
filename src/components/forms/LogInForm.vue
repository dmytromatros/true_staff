<template>
  <div class="log-in-form">
    <SelectInput class="log-in-form__select" :options="roles" v-model="role" />

    <form class="log-in-form__form" @submit.prevent="loginFn">
      <TextInput
        class="log-in-form__text-input"
        label="Login"
        type="text"
        v-model="login"
      />
      <TextInput
        class="log-in-form__text-input"
        label="Password"
        type="password"
        v-model="password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<script>
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
export default {
  name: "LogInForm",
  data() {
    return {
      login: "",
      password: "",
      role: "user",
      roles: [
        {
          value: "company",
          label: "Company",
        },
        {
          value: "user",
          label: "User",
        },
      ],
    };
  },
  components: {
    TextInput,
    SelectInput,
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
  },
};
</script>
  
<style lang="scss" scoped>
.log-in-form {
  &__select,
  &__text-input {
    margin-bottom: 15px;
  }
}
</style>
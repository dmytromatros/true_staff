<template>
  <div class="log-in-form">
    <div class="log-in-form__form">
      <SelectInput
        class="log-in-form__select"
        :options="roles"
        v-model="role"
      />
      <TextInput
        class="log-in-form__text-input"
        label="Логін"
        type="text"
        v-model="login"
      />
      <TextInput
        class="log-in-form__text-input"
        label="Пароль"
        type="password"
        v-model="password"
      />
      <DefaultButton
        class="log-in-form__button"
        @click="loginFn"
        label="Увійти"
      />
    </div>
  </div>
</template>

<script>
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
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
          label: "Компанія",
        },
        {
          value: "user",
          label: "Користувач",
        },
      ],
    };
  },
  components: {
    TextInput,
    SelectInput,
    DefaultButton,
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
@import "@/styles/main.scss";
.log-in-form {
  &__select,
  &__text-input {
    margin-bottom: 15px;
  }
  &__select {
    max-width: 50%;
    margin-bottom: 40px;
  }
  &__form {
    @include main-shadow;
    border-radius: 10px;
    padding: 30px 15px;
    background-color: $white;
  }
  &__button {
    margin-top: 50px;
  }
}
</style>

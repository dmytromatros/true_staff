<template>
  <div class="registration-form">
    <div class="registration-form__select">
      <span
        class="registration-form__selector"
        @click="selectRole('user')"
        :class="{ 'registration-form__selector--active': role == 'user' }"
        >User</span
      >
      <span
        class="registration-form__selector"
        @click="selectRole('company')"
        :class="{ 'registration-form__selector--active': role == 'company' }"
        >Company</span
      >
    </div>

    <form
      v-if="role == 'user'"
      class="registration-form__user"
      @submit.prevent="registerUser"
    >
      <TextInput label="Name" type="text" v-model="userInfo.name" />
      <TextInput label="Suranme" type="text" v-model="userInfo.surname" />
      <TextInput label="Email" type="email" v-model="userInfo.email" />
      <TextInput label="Pasword" type="password" v-model="userInfo.password" />
      <CheckboxInput
        label="I am an employee"
        v-model="userInfo.isEmployee"
        id="is-employee-registration"
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import TextInput from "../inputs/TextInput.vue";
import CheckboxInput from "../inputs/CheckboxInput.vue";
export default {
  name: "RegistrationForm",
  data() {
    return {
      role: "user",
      userInfo: {
        name: "",
        surname: "",
        email: "",
        password: "",
        isEmployee: false,
      },
    };
  },
  components: { TextInput, CheckboxInput },
  methods: {
    selectRole(role) {
      this.role = role;
    },
    registerUser() {
      this.$store.dispatch("addUserAction", this.userInfo).then((res) => {
        if (res.success) {
          this.$emit("registered");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.registration-form {
  &__select {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__selector {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    background-color: #e3e3e3;
    &--active {
      background-color: #404040;
      color: #ffffff;
    }
  }
}
</style>
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

    <form
      v-if="role == 'company'"
      class="registration-form__company"
      @submit.prevent="registerCompany"
    >
      <div class="registration-form__type">
        <button
          type="button"
          class="registration-form__type-button"
          @click="changeType(1)"
        >
          Юридична особа РНОКПП
        </button>
        <button
          type="button"
          class="registration-form__type-button"
          @click="changeType(2)"
        >
          Фізична особа ЄДРПОУ
        </button>
      </div>
      <TextInput label="Name" type="text" v-model="copmanyInfo.name" />
      <TextInput label="Login" type="text" v-model="copmanyInfo.login" />
      <TextInput
        label="Password"
        type="password"
        v-model="copmanyInfo.password"
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
      copmanyInfo: {
        name: "",
        login: "",
        password: "",
        organizationType: 1,
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
    changeType(num) {
      this.copmanyInfo.organizationType = num;
    },
    registerCompany() {
      this.$store.dispatch("addCompanyAction", this.copmanyInfo).then((res) => {
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
  &__type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin: 15px 0;
  }
  &__type-button {
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #797979;
    }
  }
}
</style>
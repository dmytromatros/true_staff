<template>
  <div class="registration-form">
    <div class="registration-form__select">
      <span
        class="registration-form__selector"
        @click="selectRole('user')"
        :class="{ 'registration-form__selector--active': role == 'user' }"
        >Користувач</span
      >
      <span
        class="registration-form__selector"
        @click="selectRole('company')"
        :class="{ 'registration-form__selector--active': role == 'company' }"
        >Компанія</span
      >
    </div>

    <div v-if="role == 'user'" class="registration-form__user">
      <TextInput label="Ім'я" type="text" v-model="userInfo.name" />
      <TextInput label="Прізвище" type="text" v-model="userInfo.surname" />
      <TextInput label="E-mail" type="email" v-model="userInfo.email" />
      <TextInput label="Пароль" type="password" v-model="userInfo.password" />
      <CheckboxInput
        label="Я є робітником у компанії"
        v-model="userInfo.isEmployee"
        id="is-employee-registration"
      />
      <DefaultButton @click="registerUser" label="Зареєструватись" />
    </div>

    <div v-if="role == 'company'" class="registration-form__company">
      <div class="registration-form__type">
        <RadioCheckboxInput
          name="company-type"
          :items="[
            { value: 1, label: 'Юридична особа РНОКПП' },
            { value: 2, label: 'Фізична особа ЄДРПОУ' },
          ]"
          v-model="companyInfo.organizationType"
        />
      </div>
      <TextInput
        label="Назва компанії"
        type="text"
        v-model="companyInfo.name"
      />
      <TextInput
        label="Логін (це має бути код компанії)"
        type="text"
        v-model="companyInfo.login"
      />
      <TextInput
        label="Пароль"
        type="password"
        v-model="companyInfo.password"
      />
      <DefaultButton
        class="registration-form__company-button"
        @click="registerCompany"
        label="Зареєструватись"
      />
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import CheckboxInput from "@/components/inputs/CheckboxInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import RadioCheckboxInput from "@/components/inputs/RadioCheckboxInput.vue";
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
      companyInfo: {
        name: "",
        login: "",
        password: "",
        organizationType: 1,
      },
    };
  },
  components: { TextInput, CheckboxInput, DefaultButton, RadioCheckboxInput },
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
      this.companyInfo.organizationType = num;
    },
    registerCompany() {
      this.$store.dispatch("addCompanyAction", this.companyInfo).then((res) => {
        if (res.success) {
          this.$emit("registered");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.registration-form {
  background-color: $white;
  @include main-shadow;
  overflow: hidden;
  border-radius: 10px;

  &__user {
    border-radius: 10px;
    padding: 30px 15px;
    background-color: $white;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__company {
    border-radius: 0px 0px 10px 10px;
    padding: 30px 15px;
    background-color: $white;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__select {
    border-radius: 10px 10px 0px 0px;
    background-color: $white;
    display: flex;
    width: 100%;
    gap: 0;
    overflow: hidden;
    border: 1px solid $main-color;
  }
  &__selector {
    text-align: center;
    flex: 1;
    font-weight: 600;
    cursor: pointer;
    padding: 15px;
    background-color: $white;
    color: $dark_text;
    &--active {
      background-color: rgba($color: $main-color, $alpha: 1);
      color: $white;
    }
  }
  &__company-button {
    margin-top: 15px;
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

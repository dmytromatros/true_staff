<template>
  <form class="registration-form" @submit.prevent>
    <div class="registration-form__wrapper">
      <div class="registration-form__top">
        <div class="registration-form__image">
          <FontIcon class="registration-form__image-icon" font-size="50px" v-if="role == 'user'" icon="person" />
          <FontIcon class="registration-form__image-icon" font-size="50px" v-if="role == 'company'"
            icon="source_environment" />
        </div>
        <SelectInput class="registration-form__choose" :options="roles" v-model="role" />
      </div>

      <div v-if="role == 'user'" class="registration-form__user">
        <TextInput class="registration-form__input" placeholder="Ім'я" type="text" v-model="userInfo.name" />
        <TextInput class="registration-form__input" placeholder="Прізвище" type="text" v-model="userInfo.surname" />
        <TextInput class="registration-form__input" placeholder="E-mail" type="email" v-model="userInfo.email" />
        <TextInput class="registration-form__input" placeholder="Пароль" type="password" v-model="userInfo.password" />
        <CheckboxInput label="Я - працівник" v-model="userInfo.isEmployee" id="is-employee-registration" />
      </div>

      <div v-if="role == 'company'" class="registration-form__company">
        <div class="registration-form__type">
          <RadioCheckboxInput name="company-type" :items="[
            { value: 1, label: 'Юридична особа РНОКПП' },
            { value: 2, label: 'Фізична особа ЄДРПОУ' },
          ]" v-model="companyInfo.organizationType" />
        </div>
        <TextInput class="registration-form__input" placeholder="Назва компанії" type="text"
          v-model="companyInfo.name" />
        <SelectInput class="registration-form__choose" :options="categories" placeholder="Категорія"
          v-model="companyInfo.type" />
        <TextInput class="registration-form__input" placeholder="Логін (це має бути код компанії)" type="text"
          v-model="companyInfo.login" />
        <TextInput class="registration-form__input" placeholder="Пароль" type="password"
          v-model="companyInfo.password" />
      </div>
    </div>

    <button v-if="role == 'company' && !loading" class="registration-form__button" @click="registerCompany"
      type="submit">Зареєструватись</button>
    <button v-if="role == 'user' && !loading" class="registration-form__button" @click="registerUser"
      type="submit">Зареєструватись</button>
    <button v-if="loading" class="registration-form__button" @click="registerUser">
      <LoaderComponent class="loader-component" />
    </button>
  </form>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import CheckboxInput from '@/components/inputs/CheckboxInput.vue';
import RadioCheckboxInput from '@/components/inputs/RadioCheckboxInput.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import FontIcon from '@/components/other/FontIcon.vue';
import { categories } from '../../../utils/categoryList'
export default {
  name: 'RegistrationForm',
  data() {
    return {
      role: 'user',
      userInfo: {
        name: '',
        surname: '',
        email: '',
        password: '',
        isEmployee: false,
      },
      companyInfo: {
        name: '',
        login: '',
        password: '',
        type: null,
        organizationType: 1,
      },
      roles: [
        {
          value: 'company',
          label: 'Компанія',
        },
        {
          value: 'user',
          label: 'Користувач',
        },
      ],
      loading: false,
      categories: categories
    };
  },
  components: {
    TextInput,
    CheckboxInput,
    RadioCheckboxInput,
    SelectInput,
    LoaderComponent,
    FontIcon,
  },
  methods: {
    selectRole(role) {
      this.role = role;
    },
    registerUser() {
      this.loading = true;
      this.$store.dispatch('addUserAction', this.userInfo).then((res) => {
        this.loading = false;
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    changeType(num) {
      this.companyInfo.organizationType = num;
    },
    registerCompany() {
      this.loading = true;
      this.$store.dispatch('addCompanyAction', this.companyInfo).then((res) => {
        this.loading = false;
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.registration-form {
  // overflow: hidden;

  &__wrapper {
    border-radius: 30px;
    padding: 50px;
    box-shadow: 0px 8px 25px 0px rgba($color: $main-color, $alpha: 0.5);
    background-color: lighten(#50aac8, 20);
    position: relative;
    z-index: 2;
  }

  &__user {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__company {
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

  &__button {
    margin-top: -25px;
    position: relative;
    z-index: 1;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    @include main-back;
    padding: 15px;
    padding-top: 40px;
    border-radius: 0 0 30px 30px;
    color: $main-color;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    // box-shadow: 0px 8px 25px 0px rgba($color: #8593d3, $alpha: 0.5) inset;
    transition: 0.5s ease all;

    &:hover {
      transform: translate(-50%, 10px);
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

  &__top {
    display: flex;
    width: 100%;
    gap: 20px;
    align-items: center;
    margin-bottom: 40px;
  }

  &__image {
    min-width: 80px;
    width: 80px;
    min-height: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $main-gradient;
    border-radius: 50%;
    flex: 1;
    @include main-shadow;
  }

  &__image-icon {
    color: $white;
  }

  &__choose {
    background: #e8f0fe !important;
  }

  &__input {
    :deep(input) {
      background: #e8f0fe;
    }
  }

  .loader-component {
    :deep(.loader__loader) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>

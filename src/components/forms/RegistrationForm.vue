<template>
  <div class="registration-form">
    <div class="registration-form__wrapper">
      <div class="registration-form__top">
        <div class="registration-form__image">
          <svg
            v-if="role == 'user'"
            enable-background="new 0 0 32 32"
            height="32px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 32 32"
            width="32px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <polyline
                fill="none"
                points="   649,137.999 675,137.999 675,155.999 661,155.999  "
                stroke="#FFFFFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <polyline
                fill="none"
                points="   653,155.999 649,155.999 649,141.999  "
                stroke="#FFFFFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <polyline fill="none" points="   661,156 653,162 653,156  " stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
            </g>
            <path
              d="M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z  "
            />
          </svg>
          <svg
            v-if="role == 'company'"
            height="8.4666mm"
            style="shape-rendering: geometricPrecision; text-rendering: geometricPrecision; image-rendering: optimizeQuality; fill-rule: evenodd; clip-rule: evenodd"
            version="1.1"
            viewBox="0 0 846.66 846.66"
            width="8.4666mm"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Layer_x0020_1">
              <path
                class="fil0"
                d="M246.64 243.41l155.89 0 0 -16.64c0,-80.13 65.47,-145.61 145.6,-145.61l187.2 0c11.49,0 20.8,9.32 20.8,20.81l0 621.92 62.72 0c27.37,0 27.37,41.61 0,41.61 -263.68,0 -527.36,0 -791.04,0 -27.36,0 -27.36,-41.61 0,-41.61l62.72 0 0 -324.38c0,-85.9 70.21,-156.1 156.11,-156.1zm344.13 480.48l0 -84.1 -22.89 0 0 84.1 22.89 0zm-64.5 0l0 -104.91c0,-11.49 9.32,-20.8 20.81,-20.8l64.5 0c11.49,0 20.8,9.31 20.8,20.8l0 104.91 82.14 0 0 -601.12 -166.39 0c-57.15,0 -104,46.85 -104,104l0 497.12 82.14 0zm-345.8 -240.14l58.26 0c11.48,0 20.8,9.31 20.8,20.8l0 62.42c0,11.49 -9.32,20.8 -20.8,20.8l-58.26 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -62.42c0,-11.49 9.31,-20.8 20.8,-20.8zm37.45 41.61l-16.64 0 0 20.8 16.64 0 0 -20.8zm78.02 -41.61l58.26 0c11.48,0 20.8,9.31 20.8,20.8l0 62.42c0,11.49 -9.32,20.8 -20.8,20.8l-58.26 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -62.42c0,-11.49 9.31,-20.8 20.8,-20.8zm37.45 41.61l-16.64 0 0 20.8 16.64 0 0 -20.8zm-152.92 -169.57l58.26 0c11.48,0 20.8,9.32 20.8,20.81l0 62.42c0,11.48 -9.32,20.8 -20.8,20.8l-58.26 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -62.42c0,-11.49 9.31,-20.81 20.8,-20.81zm37.45 41.61l-16.64 0 0 20.81 16.64 0 0 -20.81zm78.02 -41.61l58.26 0c11.48,0 20.8,9.32 20.8,20.81l0 62.42c0,11.48 -9.32,20.8 -20.8,20.8l-58.26 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -62.42c0,-11.49 9.31,-20.81 20.8,-20.81zm37.45 41.61l-16.64 0 0 20.81 16.64 0 0 -20.81zm157.51 -124.83c-27.36,0 -27.36,-41.61 0,-41.61l176.85 0c27.37,0 27.37,41.61 0,41.61l-176.85 0zm0 228.86c-27.36,0 -27.36,-41.61 0,-41.61l176.85 0c27.37,0 27.37,41.61 0,41.61l-176.85 0zm0 -114.43c-27.36,0 -27.36,-41.61 0,-41.61l176.85 0c27.37,0 27.37,41.61 0,41.61l-176.85 0zm-88.37 -101.98l-155.89 0c-62.93,0 -114.5,51.57 -114.5,114.49l0 324.38 270.39 0 0 -438.87z"
              />
            </g>
          </svg>
        </div>
        <SelectInput class="registration-form__choose" :options="roles" v-model="role" />
      </div>

      <div v-if="role == 'user'" class="registration-form__user">
        <TextInput class="registration-form__input" placeholder="Ім'я" type="text" v-model="userInfo.name" />
        <TextInput class="registration-form__input" placeholder="Прізвище" type="text" v-model="userInfo.surname" />
        <TextInput class="registration-form__input" placeholder="E-mail" type="email" v-model="userInfo.email" />
        <TextInput class="registration-form__input" placeholder="Пароль" type="password" v-model="userInfo.password" />
        <CheckboxInput label="Я є робітником у компанії" v-model="userInfo.isEmployee" id="is-employee-registration" />
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
        <TextInput class="registration-form__input" placeholder="Назва компанії" type="text" v-model="companyInfo.name" />
        <TextInput class="registration-form__input" placeholder="Логін (це має бути код компанії)" type="text" v-model="companyInfo.login" />
        <TextInput class="registration-form__input" placeholder="Пароль" type="password" v-model="companyInfo.password" />
      </div>
    </div>

    <button v-if="role == 'company' && !loading" class="registration-form__button" @click="registerCompany">Зареєструватись</button>
    <button v-if="role == 'user' && !loading" class="registration-form__button" @click="registerUser">Зареєструватись</button>
    <button v-if="loading" class="registration-form__button" @click="registerUser">
      <LoaderComponent class="loader-component" />
    </button>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import CheckboxInput from '@/components/inputs/CheckboxInput.vue';
import RadioCheckboxInput from '@/components/inputs/RadioCheckboxInput.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
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
    };
  },
  components: { TextInput, CheckboxInput, RadioCheckboxInput, SelectInput, LoaderComponent },
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
    background-color: $dark_text;
    border-radius: 50%;
    flex: 1;
    @include main-shadow;

    svg {
      width: 60%;
      height: 100%;
      object-fit: contain;

      path {
        fill: $white;
      }
    }
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

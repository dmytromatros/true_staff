<template>
  <form class="log-in-form" @submit.prevent="loginFn">
    <div class="log-in-form__form">
      <div class="log-in-form__top">
        <div class="log-in-form__image">
          <FontIcon class="log-in-form__image-icon" font-size="50px" v-if="role == 'user'" icon="person" />
          <FontIcon class="log-in-form__image-icon" font-size="50px" v-if="role == 'company'" icon="source_environment" />
        </div>
        <SelectInput class="log-in-form__select" :options="roles" v-model="role" />
      </div>

      <TextInput class="log-in-form__text-input" placeholder="Логін" type="text" v-model="login" />
      <TextInput class="log-in-form__text-input" type="password" placeholder="Пароль" v-model="password" />
    </div>
    <button class="log-in-form__button" v-if="!loading" type="submit">Увійти</button>
    <button class="log-in-form__button" v-if="loading">
      <LoaderComponent class="loader-component" />
    </button>
  </form>
</template>

<script>
import SelectInput from '@/components/inputs/SelectInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import FontIcon from '@/components/other/FontIcon.vue';
export default {
  name: 'LogInForm',
  data() {
    return {
      login: '',
      password: '',
      role: 'user',
      loading: false,
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
    };
  },
  components: {
    TextInput,
    SelectInput,
    LoaderComponent,
    FontIcon,
  },
  methods: {
    async loginFn() {
      if (!this.login) {
        this.$store.dispatch('showNotification', { message: 'Login is required...', type: 'error' });
      }
      if (!this.password) {
        this.$store.dispatch('showNotification', { message: 'Password is required...', type: 'error' });
      }
      this.loading = true;
      switch (this.role) {
        case 'user':
          this.$store
            .dispatch('logInUserAction', {
              email: this.login,
              password: this.password,
            })
            .then((res) => {
              this.loading = false;
              if (!res.success) {
                this.$store.dispatch('showNotification', { message: 'Login error...', type: 'error' });
              }
            });
          break;

        case 'company':
          this.$store
            .dispatch('logInCompanyAction', {
              login: this.login,
              password: this.password,
            })
            .then((res) => {
              this.loading = false;
              if (!res.success) {
                this.$store.dispatch('showNotification', { message: 'Login error...', type: 'error' });
              }
            });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.log-in-form {
  &__select,
  &__text-input {
    margin-bottom: 15px;
  }

  &__select {
    max-width: 100%;
    margin-bottom: 0px;
    flex: 3;
  }

  &__form {
    border-radius: 30px;
    padding: 50px;
    background-color: lighten(#50aac8, 20);
    position: relative;
    z-index: 2;
    box-shadow: 0px 8px 25px 0px rgba($color: $main-color, $alpha: 0.5);
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

  &__top {
    display: flex;
    width: 100%;
    gap: 20px;
    align-items: center;
    margin-bottom: 40px;
  }

  &__image {
    max-width: 80px;
    width: 80px;
    max-height: 80px;
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

  &__select {
    background: #e8f0fe !important;
  }

  .loader-component {
    :deep(.loader__loader) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>

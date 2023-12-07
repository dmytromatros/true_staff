<template>
  <section class="log-in-page">
    <div class="log-in-page__container">
      <div class="log-in-page__left">
        <div class="log-in-page__left-container">
          <div
            class="log-in-page__select"
            :class="{
              'log-in-page__select--registration': action == 'registration',
            }"
          >
            <span
              class="log-in-page__selector"
              @click="select('login')"
              :class="{ 'log-in-page__selector--active': action == 'login' }"
              >Увійти</span
            >
            <span
              class="log-in-page__selector"
              @click="select('registration')"
              :class="{
                'log-in-page__selector--active': action == 'registration',
              }"
              >Реєстрація</span
            >
          </div>
          <LogInFormVue class="log-in-page__form" v-if="action == 'login'" />
          <RegistrationFormVue
            class="log-in-page__form"
            v-if="action == 'registration'"
            @registered="registered"
          />
        </div>
      </div>
      <div class="log-in-page__right">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script>
import LogInFormVue from "@/components/forms/LogInForm.vue";
import RegistrationFormVue from "@/components/forms/RegistrationForm.vue";

export default {
  name: "LogIn",
  components: { LogInFormVue, RegistrationFormVue },
  data() {
    return {
      action: "login",
    };
  },
  methods: {
    select(action) {
      this.action = action;
    },
    registered() {
      this.action = "login";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.log-in-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  &__form {
    min-height: 400px;
  }
  &__container {
    display: flex;
    max-width: 1140px;
    width: 100%;
    margin: auto;
  }
  &__left,
  &__right {
    flex: 1;
    // align-items: center;
    justify-content: center;
    display: flex;
  }
  &__select {
    width: 100%;
    display: flex;
    border-radius: 10px;
    background-color: $white;
    @include main-shadow;
  }
  &__left-container {
    width: 80%;
  }
  &__selector {
    flex: 1;
    padding: 15px 10px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    z-index: 2;
    transition: 0.3s ease-in-out all;
    color: $dark_text;
    &--active {
      color: $white;
    }
  }
  &__select {
    cursor: pointer;
    display: flex;
    gap: 10px;
    margin-bottom: 50px;
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 50%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: $main-color;
      z-index: 1;
      border-radius: 10px;
      transition: 0.3s ease-in-out all;
      @include main-shadow;
    }
    &--registration {
      &::before {
        left: 50%;
      }
    }
  }
}
</style>

<template>
  <section class="log-in-page">
    <Transition name="appear" appear>
      <div class="log-in-page__container" :style="`max-width: ${action == 'login' ? '600px' : '750px'}`">
        <div class="log-in-page__left">
          <div class="log-in-page__left-container">
            <div
              class="log-in-page__select"
              :class="{
                'log-in-page__select--registration': action == 'registration',
              }"
            >
              <span class="log-in-page__selector" @click="select('login')" :class="{ 'log-in-page__selector--active': action == 'login' }">Увійти</span>
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
            <RegistrationFormVue class="log-in-page__form" v-if="action == 'registration'" />
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import LogInFormVue from '@/components/forms/LogInForm.vue';
import RegistrationFormVue from '@/components/forms/RegistrationForm.vue';

export default {
  name: 'LogIn',
  components: { LogInFormVue, RegistrationFormVue },
  data() {
    return {
      action: 'login',
    };
  },
  methods: {
    select(action) {
      this.action = action;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

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
    max-width: 600px;
    width: 100%;
    margin: auto;
  }

  &__left {
    flex: 1;
    // align-items: center;
    justify-content: center;
    display: flex;
  }

  &__select {
    width: 80%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    border-radius: 30px 30px 0 0;
    @include main-back;
  }

  &__left-container {
    width: 80%;
    max-width: 480px;
  }

  &__selector {
    flex: 1;
    padding: 20px 10px;
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
    position: relative;
    overflow: hidden;
    // box-shadow: 0px -8px 25px 0px rgba($color: #8593d3, $alpha: 0.7) inset;

    &::before {
      content: '';
      position: absolute;
      width: 50%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: $main-color;
      z-index: 1;
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

.appear-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.appear-enter-from {
  transform: scale(0.5);
  opacity: 0.01;
}
</style>

<template>
  <section class="log-in-page">
    <div class="log-in-page__select">
      <span
        class="log-in-page__selector"
        @click="select('login')"
        :class="{ 'log-in-page__selector--active': action == 'login' }"
        >Log in</span
      >
      <span
        class="log-in-page__selector"
        @click="select('registration')"
        :class="{ 'log-in-page__selector--active': action == 'registration' }"
        >Registration</span
      >
    </div>
    <LogInFormVue v-if="action == 'login'" />
    <RegistrationFormVue
      v-if="action == 'registration'"
      @registered="registered"
    />
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
.log-in-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  &__select {
    display: flex;
    gap: 10px;
    margin-bottom: 50px;
  }
  &__selector {
    background-color: #efefef;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      background-color: #cccaca;
    }
    &--active {
      background-color: rgb(37, 37, 37);
      color: #fff;
    }
  }
}
</style>
<template>
  <section class="log-in-page">
    <LogInFormVue />
    <RegistrationFormVue />
  </section>
</template>

<script>
import LogInFormVue from "@/components/forms/LogInForm.vue";
import RegistrationFormVue from "@/components/forms/RegistrationForm.vue";

export default {
  name: "LogIn",
  components: { LogInFormVue, RegistrationFormVue },
};
</script>

<style lang="scss" scoped></style>
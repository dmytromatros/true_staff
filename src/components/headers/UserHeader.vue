<template>
  <div class="user-header">
    <div class="user-header__logo">True Staff</div>
    <div class="user-header__right">
      <div class="user-header__info">
        <div class="user-header__image">img</div>
        <div class="user-header__name">User name</div>
      </div>
      <DefaultButton class="user-header-button" @click="logoutFn" label="Вийти" />
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "userHeader",
  components: {
    DefaultButton,
  },
  methods: {
    async logoutFn() {
      this.$store.dispatch("logOutAction");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.user-header {
  padding: 15px 20px;
  background-color: $white;
  @include main-shadow;
  border-radius: 0 0 25px 25px;
  display: flex;
  width: 100%;
  // max-width: 600px;
  // position: relative;
  // left: 50%;
  // transform: translateX(-50%);
  justify-content: space-between;
  align-items: center;
  // border: 1px solid $main-color;
  border-top: none;
  height: 70px;
  overflow: hidden;

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &__right {
    display: flex;
    gap: 70px;
  }
}
</style>

<template>
  <div class="user-header">
    <div class="user-header__logo">
      <img src="/img/logo_small_with_text.svg" alt="">
    </div>
    <div class="user-header__right">
      <div class="user-header__info">
        <div class="user-header__image">
          <FontIcon icon="person" />
        </div>
        <div class="user-header__name">{{ $store?.state?.user?.name }} {{ $store?.state?.user?.surname }}</div>
      </div>
      <DefaultButton class="user-header-button" @action="logoutFn" label="Вийти" />
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import FontIcon from "@/components/other/FontIcon.vue";
export default {
  name: "userHeader",
  components: {
    DefaultButton,
    FontIcon
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
  border-radius: 0 0 15px 15px;
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

  &__logo {
    height: 45px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

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

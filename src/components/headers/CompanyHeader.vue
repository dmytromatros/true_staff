<template>
  <div class="user-header">
    <div class="user-header__logo">
      <img src="/img/logo_small_with_text.svg" alt="">
    </div>
    <div class="user-header__right">
      <router-link :to="{ name: 'company-settings' }" class="user-header__info">
        <div class="user-header__image">
          <FontIcon icon="person" />
        </div>
        <div class="user-header__name">{{ $store.state.company.name }}</div>
      </router-link>
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
  justify-content: space-between;
  align-items: center;
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
    color: $black;
    transition: 0.25s ease-in-out all;

    &:hover {
      color: $main-color-hover;
    }
  }

  &__name {
    display: block;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__right {
    display: flex;
    gap: 70px;
  }
}
</style>

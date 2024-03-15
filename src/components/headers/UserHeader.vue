<template>
  <div class="user-header">
    <router-link :to="{ name: 'user-dashboard' }" class="user-header__logo">
      <img src="/img/logo_small_with_text.svg" alt="" />
    </router-link>
    <div class="user-header__right">
      <router-link :to="{ name: 'user-settings' }" class="user-header__info">
        <div class="user-header__image">
          <img :src="$store.state.profileImage || '/img/profile-img.webp'" alt="profile_img" />
        </div>
        <div class="user-header__name">{{ $store?.state?.user?.name }} {{ $store?.state?.user?.surname }}</div>
      </router-link>
      <DefaultButton class="user-header-button" @action="logoutFn" label="Вийти" />
    </div>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue';
export default {
  name: 'userHeader',
  components: {
    DefaultButton,
  },
  methods: {
    async logoutFn() {
      this.$store.dispatch('logOutAction');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

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

  &__image {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>

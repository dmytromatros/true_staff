<template>
  <div class="menu-card">
    <router-link class="menu-card__button" :to="{ name: link }" active-class="menu-card__button--active">
      <slot name="image"> </slot>
      <span class="menu-card__label">{{ label }}</span>
      <div class="menu-card__back"></div>
    </router-link>

  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: {
    label: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    goToLink() {
      this.$router.push({
        name: this.link,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.menu-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  &__back {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: $main-gradient;
    left: 0;
    top: 0;
    opacity: 0;
    transition: 0.25s ease-in-out all;
  }

  &__button {
    border-radius: $border-radius;
    @include main-shadow;
    padding: 15px 15px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    backdrop-filter: blur(25px);
    gap: 15px;
    max-height: 120px;
    background: white;
    outline: 1px solid $main-color;
    overflow: hidden;

    &:hover {
      outline-color: $second-color;
    }

    &--active .menu-card__back {
      opacity: 1;
    }

    &--active {
      outline: 1px solid transparent;

      &:hover {
        outline-color: transparent;
      }
    }

    &--active .menu-card__label {
      color: $white;
    }
  }

  &__label {
    font-weight: 600;
    font-size: 16px;
    color: $dark_text;
    transition: 0.25s ease-in-out all;
    position: relative;
    z-index: 1;
  }
}

:deep(img) {
  width: 70px;
  height: 70px;
  object-fit: cover;
  object-position: center;
  border-radius: $border-radius;
  position: relative;
  z-index: 1;
}
</style>

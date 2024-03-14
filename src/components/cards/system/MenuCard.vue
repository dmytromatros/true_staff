<template>
  <div class="menu-card">
    <router-link class="menu-card__button" :to="{ name: link }" active-class="menu-card__button--active" :title="label">
      <FontIcon class="menu-card__icon" :icon="icon" font-size="40px" />
      <span class="menu-card__label">{{ label }}</span>
      <div class="menu-card__back"></div>
    </router-link>
  </div>
</template>

<script>
import FontIcon from '@/components/other/FontIcon.vue';
export default {
  name: 'MenuCard',
  components: { FontIcon },
  props: {
    label: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    }
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
@import '@/styles/main.scss';

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
    padding: 10px 10px;
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
    border: 1px solid $main-color;
    overflow: hidden;

    &:hover {
      border-color: $second-color;

      .menu-card__icon {
        color: $second-color;
      }
    }

    &--active .menu-card__back {
      opacity: 1;
    }

    &--active {
      border: 1px solid transparent;

      &:hover {
        border-color: transparent;

        .menu-card__icon {
          color: $white;
        }
      }
    }

    &--active .menu-card__label {
      color: $white;
    }

    &--active .menu-card__icon {
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
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icon {
    position: relative;
    z-index: 1;
    color: $dark_text;
    transition: 0.25s ease-in-out all;
  }
}
</style>

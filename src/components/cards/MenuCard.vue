<template>
  <div class="menu-card">
    <button
      class="menu-card__button"
      @click="goToLink"
      :style="`background: linear-gradient(-45deg, ${background_1} 0%, ${background_2} 70%)`"
    >
      <slot name="image"> </slot>
      <span class="menu-card__label">{{ label }}</span>
    </button>
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
    background_1: {
      type: String,
      default: "#ffffff",
    },
    background_2: {
      type: String,
      default: "#ffffff",
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
  &__button {
    border-radius: $border-radius;
    @include main-shadow;
    padding: 25px 15px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    backdrop-filter: blur(25px);
    gap: 15px;
  }
  &__label {
    font-weight: 600;
    font-size: 16px;
    color: $dark_text;
  }
}

::v-deep {
  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    object-position: center;
    border-radius: $border-radius;
  }
}
</style>

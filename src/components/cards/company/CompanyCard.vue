<template>
  <div class="company-card">
    <button class="company-card__button" @click="goToLink">
      <img v-if="image" :src="image" :alt="image" />
      <img v-else src="@/assets/img/profile-img.webp" :alt="image" />
      <div class="company-card__bottom">
        <!-- <span class="company-card__label">{{ label }}</span> -->
        <span class="company-card__name">{{ name }}</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "CompanyCard",
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
  data() {
    return {
      name: "",
      image: "",
    };
  },
  methods: {
    goToLink() {
      this.$router.push({
        name: this.link,
      });
    },
  },
  mounted() {
    this.$store
      .dispatch("getCompanyAction", { id: this.$route.params.id })
      .then((res) => {
        if (res.success) {
          this.name = `${res.data.name}`;
          console.log(res);
          this.$store
            .dispatch("getImageAction", { id: this.$route.params.id })
            .then((res) => {
              this.image = res.data;
            });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.company-card {
  width: 100%;
  height: 100%;
  min-height: 310px;
  // min-width: 310px;

  &__button {
    border-radius: $border-radius;
    @include main-shadow;
    // border: 1px solid $main-color;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    backdrop-filter: blur(25px);
    overflow: hidden;
  }
  &__bottom {
    background-color: rgba($color: $white, $alpha: 0.4);
    backdrop-filter: blur(25px);
    width: 100%;
    min-height: 25%;
    max-height: 100px;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include main-shadow;
  }
  &__name {
    font-weight: 600;
    font-size: 20px;
    color: $dark_text;
    margin-bottom: 0px;
  }
}

::v-deep {
  img {
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
    object-fit: cover;
    object-position: center;
    position: absolute;
    opacity: 1;
    z-index: -1;
    top: 0;
    left: 0;
  }
}
</style>

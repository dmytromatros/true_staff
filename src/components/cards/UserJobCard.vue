<template>
  <div class="user-job-card">
    <div
      class="user-job-card__container"
      :class="{ 'user-job-card__container--active': !job.deleted }"
    >
      <div class="user-job-card__img">
        <img src="../../assets/img/profile-img.webp" alt="" />
      </div>

      <div class="user-job-card__info">
        <div class="user-job-card__company">{{ job.companyName }}</div>
        <div class="user-job-card__location">{{ job.locationAddress }}</div>
        <div class="user-job-card__position">{{ job.position }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserJobCard",
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.user-job-card {
  &__container {
    flex: 1;
    background-color: $light-grey;
    @include main-shadow;
    padding: 15px;
    border-radius: $border-radius;
    overflow: auto;
    display: flex;
    gap: 15px;

    &--active {
    }
  }
  &__img {
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include main-shadow;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__company {
    font-weight: 600;
    font-size: 20px;
  }
  &__location {
    font-size: 12px;
    font-weight: 600;
  }
  &__position {
    font-weight: 600;
  }
}
</style>

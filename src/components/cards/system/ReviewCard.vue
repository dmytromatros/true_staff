<template>
  <div class="review-card">
    <div class="review-card__container">
      <div class="review-card__sender">
        <div class="review-card__img">
          <img v-if="sender.image" :src="sender.image" alt="" />
          <img v-else src="/img/profile-img.webp" alt="" />
        </div>
        <div class="review-card__name">
          {{ sender.name }}
        </div>
      </div>
      <div class="review-card__review">
        {{ review.review }}
      </div>
      <div class="review-card__date">
        {{ getDateFn(review.date) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    review: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sender: {},
    };
  },
  methods: {
    getSenderFn(id) {
      this.$store.dispatch('getUserInfoAction', { id: id }).then((res) => {
        if (res.success) {
          this.sender.name = `${res.data.name} ${res.data.surname}`;
        }
      });
    },
    getSenderImageFn(id) {
      this.$store.dispatch('getImageAction', { id: id }).then((res) => {
        if (res.success) {
          this.sender.image = res.data;
        }
      });
    },
    getDateFn(timestamp) {
      const date = new Date(timestamp);

      // Extract date components
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Ensure two-digit formatting
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      // Construct the formatted date string
      const formattedDate = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;

      return formattedDate;
    },
  },
  mounted() {
    this.getSenderFn(this.review.from);
    this.getSenderImageFn(this.review.from);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.review-card {
  background-color: $white;
  @include main-shadow;
  border: 1px solid $main-color;
  padding: 15px;
  border-radius: $border-radius;
  overflow: auto;
  display: flex;
  gap: 15px;

  &__container {
    width: 100%;
  }

  &__sender {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid $main-color;
    width: fit-content;
  }

  &__img {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__review {
    width: 100%;
    // max-height: 75px;
    padding: 10px;
    border-radius: 5px;
    //  border: 1px solid $main-color;
    margin-bottom: 25px;
  }

  &__date {
    color: grey;
    font-size: 14px;
    width: 100%;
    text-align: right;
  }
}
</style>

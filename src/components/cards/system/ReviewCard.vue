<template>
  <div class="review-card">
    <div class="review-card__container">
      <div class="review-card__header">
        <div class="review-card__sender">
          <div class="review-card__img">
            <img v-if="sender.image" :src="sender.image" alt="" />
            <img v-else src="/img/profile-img.webp" alt="" />
          </div>
          <div class="review-card__name">
            {{ sender.name }}
          </div>
        </div>
        <StarsCount :count="review.reviewStars" />
      </div>
      <div class="review-card__review" :style="{ 'margin-bottom': isEditing ? '0px' : '' }">
        <div v-if="!isEditing">{{ tempReview }}</div>
        <TextInput v-else :textarea="true" v-model="tempReview" />
      </div>

      <div class="review-card__bottom">
        <div class="review-card__date">{{ getDateFn(review.date) }} / Company</div>
        <div class="review-card__buttons" v-if="canEdit">
          <CircleButton
            v-if="!isEditing"
            icon="edit"
            @action="
              () => {
                isEditing = true;
              }
            "
          />
          <CircleButton
            v-if="!isEditing"
            icon="delete"
            :danger="true"
            @action="
              () => {
                showConfirmPopup = true;
              }
            "
          />
          <CircleButton v-if="isEditing" icon="done" @action="editReviewFn" />
          <CircleButton v-if="isEditing" icon="close" @action="closeEditing" :danger="true" />
        </div>
      </div>
    </div>
    <div class="review-card__back"></div>
    <ConfirmPopup
      :is-shown="showConfirmPopup"
      text="Ти дійсно бажаєш видалити відгук?"
      @close="
        () => {
          showConfirmPopup = false;
        }
      "
      @confirm="deleteReview"
      title="Видалення відгуку"
    />
  </div>
</template>

<script>
import StarsCount from '@/components/other/StarsCount.vue';
import CircleButton from '@/components/buttons/CircleButton.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import ConfirmPopup from '@/components/popups/ConfirmPopup.vue';
export default {
  name: 'ReviewCard',
  components: { StarsCount, CircleButton, TextInput, ConfirmPopup },
  props: {
    review: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sender: {},
      isEditing: false,
      tempReview: this.review.review,
      showConfirmPopup: false,
    };
  },
  computed: {
    canEdit() {
      return this.review.from === this.$store.state.id;
    },
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
        } else {
          this.sender.image = '';
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
      const formattedDate = `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;

      return formattedDate;
    },

    closeEditing() {
      this.isEditing = false;
      this.tempReview = this.review.review;
    },

    editReviewFn() {
      this.$store.dispatch('editReviewAction', { id: this.review._id, review: this.tempReview }).then((res) => {
        if (res.success) {
          this.isEditing = false;
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },

    deleteReview() {
      this.$store.dispatch('deleteReviewAction', { id: this.review._id }).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
          this.$emit('edited');
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
  },
  watch: {
    'review.review'() {
      this.tempReview = this.review.review;
      this.getSenderFn(this.review.from);
      this.getSenderImageFn(this.review.from);
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
  border-radius: $border-radius;
  overflow: auto;
  display: flex;
  gap: 15px;
  position: relative;

  &__container {
    width: 100%;
    position: relative;
    z-index: 1;
    background-color: $white;
    border-radius: $border-radius;
    padding: 15px;
    border: 1.35px solid transparent;
    background-clip: padding-box;
  }

  &__back {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $main-gradient;
    border-radius: $border-radius;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__sender {
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 25px;
    width: fit-content;
  }

  &__img {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__review {
    width: 100%;
    line-height: 1.3;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 25px;
  }

  &__date {
    color: grey;
    font-size: 14px;
    text-align: right;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__buttons {
    display: flex;
    gap: 7.5px;
  }
}
</style>

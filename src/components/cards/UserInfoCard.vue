<template>
  <div class="user-info-card">
    <div v-if="Object.keys(info).length" class="user-info-card__container">
      <!-- <div class="user-info-card__container"> -->

      <div class="user-info-card__user">
        <BaseCard class="user-info-card__small">
          <template v-slot:body>
            <div class="user-info-card__flex">
              <div class="user-info-card__img">
                <img v-if="imageUrl" :src="imageUrl" alt="" />
                <img v-else src="../../assets/img/profile-img.webp" alt="" />
              </div>

              <div class="user-info-card__flex-inner">
                <div class="user-info-card__name">
                  {{ info.name }} {{ info.surname }}
                  <!-- Nikita Bibka -->
                </div>

                <div class="user-info-card__id" @click="copyId(info._id)">
                  <span>{{ info._id }}</span>
                  <!-- 6597f1e4a63d42f1d933d9e0 -->
                </div>

                <div class="user-info-card__employee">
                  <span v-if="info.isEmployee">На даний час працює</span>
                  <span v-if="!info.isEmployee">На даний час не працює.</span>
                </div>
              </div>
            </div>
          </template>
        </BaseCard>

        <BaseCard>
          <template v-slot:body>
            <div class="user-info-card__info">
              <CustomSwitch :options="{ 'Відгуки': 1, 'Робота': 2 }" v-model="selected" />


              <div v-if="selected == 1" class="user-info-card__reviews">
                <div class="user-info-card__card-container">
                  <ReviewCard v-for="(card, key) in reviews" :key="key" :review="card" />
                </div>
              </div>
              <div v-if="selected == 2" class="user-info-card__jobs">
                <div class="user-info-card__card-container">
                  <UserJobCard v-for="(card, key) in info.jobs" :key="key" :job="card" />
                </div>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>

      <BaseCard class="user-info-card__review-container"><template v-slot:body>
          <div class="user-info-card__send-review">
            <TextInput class="user-info-card__review-input" :textarea="true" v-model="review" />
            <DefaultButton class="user-info-card__button" label="Залишити відгук" @click="sendReview"
              :disabled="!review" />
          </div>
        </template></BaseCard>
    </div>

    <div v-else class="user-info-card__text">
      <img src="../../assets/img/search-image.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import BaseCard from "@/components/cards/BaseCard.vue";
import UserJobCard from "@/components/cards/UserJobCard.vue";
import ReviewCard from "@/components/cards/ReviewCard.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import CustomSwitch from "@/components/inputs/CustomSwitch.vue";
export default {
  name: "UserInfoCard",
  props: {
    user: {
      type: String,
    },
  },
  data() {
    return {
      info: {},
      imageUrl: "",
      selected: 1,
      reviews: {},
      review: "",
    };
  },
  components: {
    BaseCard,
    UserJobCard,
    ReviewCard,
    TextInput,
    DefaultButton,
    CustomSwitch
  },
  methods: {
    getUserFn(user) {
      this.$store.dispatch("getUserInfoAction", { id: user }).then((res) => {
        if (res.success) {
          this.info = res.data;
          this.getReviewsListFn(this.info._id);
          if (this.info.isImage) {
            this.getImageFn(this.info._id);
          } else {
            this.imageUrl = "";
          }
        }
      });
    },
    getImageFn(id) {
      this.$store.dispatch("getImageAction", { id: id }).then((res) => {
        console.log(id, res.data);
        this.imageUrl = res.data;
      });
    },
    getReviewsListFn(id) {
      this.$store.dispatch("getReviewsListAction", { id: id }).then((res) => {
        if (res.success) {
          this.reviews = res.data;
        }
      });
    },
    async copyId(id) {
      try {
        await navigator.clipboard.writeText(id);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    sendReview() {
      let data = {
        from: this.$route.params.id,
        to: this.info._id,
        review: this.review,
      };
      data.date = Date.now();
      this.$store.dispatch("sendReviewAction", data);
    },
  },
  watch: {
    user() {
      this.getUserFn(this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.user-info-card {
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &__text {
    img {
      width: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__user {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 20px;
    height: 70%;
  }

  &__small {
    height: fit-content;
    padding: 30px 20px;
  }

  &__container {
    min-height: 750px;
  }

  &__container,
  &__text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  &__text {
    justify-content: center;
    height: 100%;

    img {
      width: 100%;
      height: 70%;
      object-fit: contain;
      object-position: center;
    }
  }

  &__send-review {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 15px;
    align-items: flex-end;
  }

  &__button {
    max-width: 250px;
  }

  &__review-input {
    width: 100%;

    :deep(textarea) {
      max-height: 100%;
      height: 100%;
      width: 100%;
    }

    flex: 1;
  }

  &__container {
    // flex-direction: column;
    // justify-content: flex-start;
    gap: 20px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include main-shadow;
    }
  }

  &__flex {
    display: flex;
    gap: 20px;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    &-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      height: 100%;
      // justify-content: center;
      width: fit-content;
    }
  }

  &__id {
    opacity: 0.7;
    border: 1px solid $main-color;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 12px;
  }

  &__name {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 40px;
  }

  &__select {
    display: flex;
    border-radius: 10px;
    border: 1px solid $main-color;
    overflow: hidden;
    width: fit-content;
    margin: auto;
    margin-bottom: 20px;
  }

  &__selectable {
    padding: 10px 45px;
    letter-spacing: 1px;
    cursor: pointer;

    &--active {
      background-color: $main-color;
      color: $white;
    }
  }

  &__reviews,
  &__jobs {
    flex: 1;
    overflow: scroll;
    height: 100%;
  }

  &__card-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  &__review-container {
    height: 30%;
  }
}</style>

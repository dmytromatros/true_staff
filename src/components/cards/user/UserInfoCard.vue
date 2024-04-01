<template>
  <div class="user-info-card">
    <LoaderComponent v-if="loading" />
    <div v-else-if="!loading && Object.keys(info).length" class="user-info-card__container">
      <!-- <div class="user-info-card__container"> -->

      <div class="user-info-card__user"
        :style="{ height: !isUser ? '100%' : info._id == $store.state.id || !info.isWorking ? '100%' : '70%' }">
        <BaseCard>
          <template v-slot:body>
            <div class="user-info-card__info">
              <CustomSwitch :options="{ Відгуки: 1, Робота: 2 }" v-model="selected" />

              <div v-if="selected == 1" class="user-info-card__reviews">
                <div v-if="Object.keys(reviews).length" class="user-info-card__card-container">
                  <ReviewCard v-for="(card, key) in reviews" :key="key" :review="card"
                    @edited="getReviewsListFn(info._id)" />
                </div>
                <div v-else class="user-info-card__label">Ой-ой-ой... Немає відгуків... Залиш свій &#128513;</div>
              </div>
              <div v-if="selected == 2" class="user-info-card__jobs">
                <div v-if="info.jobs?.length"
                  class="user-info-card__card-container user-info-card__card-container--jobs">
                  <UserJobCard v-for="(card, key) in info.jobs" :key="key" :job="card" />
                </div>
                <div v-else class="user-info-card__label">У-у-упс... Немає записів...</div>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>

      <BaseCard class="user-info-card__review-container" v-if="isUser && !canSendReview && info.isWorking"><template
          v-slot:body>
          <div class="user-info-card__send-review">
            <TextInput class="user-info-card__review-input" :textarea="true" v-model="review"
              placeholder="Скажи все що думаєш!" />
            <div class="user-info-card__review-bottom">
              <StarsCount :count="reviewStars" :selectable="true" @rate="(index) => {
      reviewStars = index;
    }
      " />
              <DefaultButton class="user-info-card__button" label="Залишити відгук" @action="sendReview"
                :disabled="!review || reviewStars == 0" :loading="loadingReview" />
            </div>
          </div>
        </template>
      </BaseCard>
    </div>

    <div v-else class="user-info-card__text">
      <img src="/img/search-img-1.png" class="user-info-card__image" alt="" />
      <!-- <FontIcon class="user-info-card__search-icon" icon="search" font-size="2500%" /> -->
      <div class="user-info-card__text-text">Почніть пошук ...</div>
    </div>

    <div class="user-info-card__search">
      <SearchCard class="user-info-card__search-card" @selected="showUserInfo" />
      <BaseCard class="user-info-card__small" v-if="Object.keys(info).length">
        <template v-slot:body>
          <LoaderComponent v-if="loading" />
          <div v-else>
            <div class="user-info-card__flex">
              <div class="user-info-card__img">
                <img v-if="imageUrl" :src="imageUrl" alt="" />
                <img v-else src="/img/profile-img.webp" alt="" />
              </div>

              <div class="user-info-card__flex-inner">
                <div class="user-info-card__name" :title="`${info.name} ${info.surname}`">{{ info.name }} {{
      info.surname
    }}</div>

                <StarsCount class="user-info-card__stars" :count="info.rate" :selectable="false" />
                <IdComponent :id="info.uniqueId" />
              </div>

            </div>
            <div class="user-info-card__about">{{ info.about }}</div>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/cards/system/BaseCard.vue';
import UserJobCard from '@/components/cards/user/UserJobCard.vue';
import ReviewCard from '@/components/cards/system/ReviewCard.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import DefaultButton from '@/components/buttons/DefaultButton.vue';
import CustomSwitch from '@/components/inputs/CustomSwitch.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import IdComponent from '@/components/other/IdComponent.vue';
import { checkRole } from '../../../../utils/permission';
import SearchCard from '@/components/cards/system/SearchCard.vue';
// import FontIcon from "@/components/other/FontIcon.vue";
import StarsCount from '@/components/other/StarsCount.vue';
export default {
  name: 'UserInfoCard',
  data() {
    return {
      user: null,
      info: {},
      imageUrl: '',
      selected: 1,
      reviews: {},
      reviewStars: 0,
      review: '',
      loading: true,
      loadingReview: false,
    };
  },
  components: {
    BaseCard,
    UserJobCard,
    ReviewCard,
    TextInput,
    DefaultButton,
    CustomSwitch,
    LoaderComponent,
    IdComponent,
    SearchCard,
    StarsCount,
    // FontIcon
  },
  computed: {
    isUser() {
      return checkRole() === 'user';
    },
    canSendReview() {
      return this.$store.state.id === this.info._id;
    },
  },
  methods: {
    getUserFn(user) {
      this.reviews = {};
      this.$store.dispatch('getUserInfoAction', { id: user }).then((res) => {
        if (res.success) {
          this.info = res.data;
          this.getReviewsListFn(this.info._id);
          if (this.info.isImage) {
            this.getImageFn(this.info._id);
          } else {
            this.imageUrl = '';
          }
          this.loading = false;
        }
      });
    },
    getImageFn(id) {
      this.$store.dispatch('getImageAction', { id: id }).then((res) => {
        this.imageUrl = res.data;
      });
    },
    getReviewsListFn(id) {
      this.$store.dispatch('getReviewsListAction', { id: id }).then((res) => {
        if (res.success) {
          this.reviews = res.data;
          this.info.rate = res.rate;
        }
      });
    },
    async copyId(id) {
      try {
        await navigator.clipboard.writeText(id);
        alert('Copied');
      } catch ($e) {
        alert('Cannot copy');
      }
    },
    sendReview() {
      this.loadingReview = true;
      let data = {
        from: this.$store.state.id,
        to: this.info._id,
        review: this.review,
        reviewStars: this.reviewStars,
      };
      data.date = Date.now();
      this.$store.dispatch('sendReviewAction', data).then((res) => {
        this.loadingReview = false;
        this.review = '';
        this.reviewStars = 0;
        if (!res.success) {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        } else {
          this.getReviewsListFn(this.info._id);
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
        }
      });
    },
    showUserInfo(info) {
      this.user = info.user;
      if (this.user) {
        const currentUrl = window.location.href;
        const newUrl = currentUrl.split('?')[0];
        history.replaceState(history.state, null, newUrl);
      }
    },
  },
  watch: {
    user() {
      this.loading = true;
      this.getUserFn(this.user);
    },
  },
  mounted() {
    if (!this.user) this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.user-info-card {
  overflow: auto;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 15px;
  @include no-scroll;

  &__stars {
    :deep(.starts-count__star) {
      font-size: 20px;
    }
  }

  &__text {
    img {
      width: 100%;
    }

    &-text {
      font-size: 200%;
      font-weight: 700;
      color: $main-color;
    }
  }

  &__review-bottom {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: $placeholder-color;
  }

  &__info {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__small {
    height: max-content;
    padding: 30px 20px;
    background: $main-gradient;
  }

  &__search-icon {
    width: fit-content;
    color: $main-color;
  }

  &__text {
    justify-content: center;
    align-items: center;
  }

  &__container,
  &__text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__search {
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: 100%;
    overflow: auto;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include main-shadow;
    }
  }

  &__search-card {
    height: fit-content;
    max-height: 100%;
  }

  &__text {
    justify-content: center;
    height: 100%;
    gap: 15px;

    img {
      width: 70%;
      height: 70%;
      object-fit: contain;
      object-position: center;
      filter: drop-shadow(0px 0px 5px rgba($color: $main-color, $alpha: 0.2));
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
    gap: 20px;
    max-height: 100%;
    overflow: hidden;
  }

  &__flex {
    display: flex;
    gap: 20px;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;

    &-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: fit-content;
    }
  }

  &__name {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 40px;
    color: $white;
    width: 100%;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
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

    &--jobs {
      // flex-direction: row;
      flex-wrap: wrap;
    }
  }

  &__review-container {
    height: 30%;
  }

  &__about {
    font-size: 20px;
    color: $white;
    line-height: 30px;
    margin-top: 20px;
  }
}
</style>

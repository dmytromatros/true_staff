<template>
  <div class="send-review-card">
    <div class="send-review-card__content">
      <UserInfoCard
        class="send-review-card__card send-review-card__card-user-info"
        :user="userId"
      />
      <SearchCard class="send-review-card__card" @selected="showUserInfo" />
    </div>
  </div>
</template>

<script>
// import BaseCard from "@/components/cards/BaseCard.vue";
import SearchCard from "@/components/cards/SearchCard.vue";
import UserInfoCard from "@/components/cards/UserInfoCard.vue";

export default {
  name: "SendReviewCard",
  components: {
    // BaseCard,
    SearchCard,
    UserInfoCard,
  },
  data() {
    return {
      userId: "",
    };
  },
  methods: {
    showUserInfo(info) {
      this.userId = info.user;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.send-review-card {
  height: 100%;
  &__content {
    width: 100%;
    // max-width: 1050px;
    height: 100%;
    display: flex;
    gap: 15px;
  }
  &__card {
    &:first-child {
      flex: 2.3;
    }
    &:last-child {
      flex: 1;
    }
    height: fit-content;
    &-user-info {
      height: 100%;
    }
  }
}
</style>

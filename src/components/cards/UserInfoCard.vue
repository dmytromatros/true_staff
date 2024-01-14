<template>
  <div class="user-info-card">
    <BaseCard>
      <template v-slot:body>
        <div v-if="Object.keys(info).length" class="user-info-card__container">
          <!-- <div class="user-info-card__container"> -->

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

          <div class="user-info-card__select">
            <div
              class="user-info-card__selectable"
              :class="{ 'user-info-card__selectable--active': selected == 1 }"
              @click="
                () => {
                  this.selected = 1;
                }
              "
            >
              Відгуки
            </div>
            <div
              class="user-info-card__selectable"
              :class="{ 'user-info-card__selectable--active': selected == 2 }"
              @click="
                () => {
                  this.selected = 2;
                }
              "
            >
              Роботи
            </div>
          </div>

          <div v-if="selected == 1" class="user-info-card__reviews"></div>
          <div v-if="selected == 2" class="user-info-card__jobs">
            <UserJobCard
              v-for="(card, key) in info.jobs"
              :key="key"
              :job="card"
            />
          </div>
        </div>

        <div v-else class="user-info-card__text">
          <img src="../../assets/img/search-image.jpg" alt="" />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from "@/components/cards/BaseCard.vue";
import UserJobCard from "@/components/cards/UserJobCard.vue";
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
      selected: 2,
    };
  },
  components: {
    BaseCard,
    UserJobCard,
  },
  methods: {
    getUserFn(user) {
      this.$store.dispatch("getUserInfoAction", { id: user }).then((res) => {
        if (res.success) {
          this.info = res.data;
          if (this.info.isImage) {
            this.getImageFn(this.info._id);
          }
          console.log(this.info);
        }
      });
    },
    getImageFn(id) {
      this.$store.dispatch("getImageAction", { id: id }).then((res) => {
        console.log(id, res.data);
        this.imageUrl = res.data;
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
  &__text {
    img {
      width: 100%;
    }
  }
  &__container,
  &__text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
  &__container {
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include main-shadow;
    }
  }
  &__flex {
    display: flex;
    margin: 30px;
    gap: 50px;
    &-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      height: 100%;
      justify-content: center;
    }
  }
  &__id {
    opacity: 0.7;
    border: 1px solid $main-color;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: copy;
    font-size: 12px;
  }

  &__name {
    font-size: 30px;
    font-weight: 600;
  }
  &__select {
    display: flex;
    border-radius: 10px;
    border: 1px solid $main-color;
    overflow: hidden;
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
    width: 100%;
    flex: 1;
    background-color: $white;
    @include main-shadow;
    padding: 15px;
    border-radius: $border-radius;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

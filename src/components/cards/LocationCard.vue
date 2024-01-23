<template>
  <div class="location-card">
    <BaseCard>
      <template v-slot:body>
        <div class="location-card__container">
          <div class="location-card__img">
            <img v-if="imageUrl" :src="imageUrl" alt="" />
            <img v-else src="../../assets/img/profile-img.webp" alt="" />
          </div>
          <div class="location-card__info">
            <div class="location-card__name">{{ location.address }}</div>
            <div class="location-card__amount">Кількість працівників: 0</div>
          </div>
        </div>
        <div class="location-card__buttons">
          <DefaultButton
            class="location-card__button"
            label="Видалити"
            :danger="true"
            @click="deleteLocationFn(location._id)"
          />
          <DefaultButton
            class="location-card__button"
            label="Редагувати"
            @click="openEditPopupFN(location._id)"
          />
        </div>
      </template>
    </BaseCard>

    <router-view name="edit_location" @edited="getLocations" />
  </div>
</template>

<script>
import DefaultButton from "../buttons/DefaultButton.vue";
import BaseCard from "@/components/cards/BaseCard.vue";
export default {
  name: "LocationCard",
  components: { DefaultButton, BaseCard },
  props: {
    location: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    getLocations() {
      this.$emit("edited");
    },
    openEditPopupFN(id) {
      this.$router.push({
        name: "edit_location",
        params: {
          locationId: id,
        },
      });
    },
    deleteLocationFn(id) {
      this.$store
        .dispatch("getDeleteLocationAction", {
          id,
        })
        .then((res) => {
          if (res.success) this.$emit("edited");
        });
    },
    getImage() {
      this.$store
        .dispatch("getImageAction", { id: this.location._id })
        .then((res) => {
          if (res.success) {
            this.imageUrl = res.data;
          }
        });
    },
  },
  mounted() {
    if (this.location.isImage) {
      this.getImage();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.location-card {
  width: 100%;
  height: 100%;

  &__container {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  &__img {
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }
  &__name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  &__buttons {
    display: flex;
    gap: 15px;
    margin: 10px;
  }
  &__button {
    flex: 1;
  }
}
</style>




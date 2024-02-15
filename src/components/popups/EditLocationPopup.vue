<template>
  <DefaultPopup :isShown="isShown" @close="close" title="Редагуання локації" @confirm="editLocation">
    <template v-slot:body>
      <div class="edit-location__container">
        <ImageInput class="edit-location__image" :imageLink="imageUrl" @changed="handleImage" :id="id" />
        <TextInput class="edit-location__input" label="Адреса локації" type="test" v-model="address" />
      </div>

      <div class="edit-location__button" @click="addEmployee">
        <span>Додати працівника</span>
      </div>
    </template>
  </DefaultPopup>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultPopup from "@/components/popups/DefaultPopup.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
export default {
  name: "EditLocationPopup",
  components: { TextInput, DefaultPopup, ImageInput },
  data() {
    return {
      image: '',
      address: "",
      imageUrl: null,
    };
  },
  props: {
    id: { type: String, default: "" },
    isShown: { type: Boolean, default: false }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleImage(data) {
      this.image = data
    },
    editLocation() {
      this.$store
        .dispatch("editLocationAction", {
          image: this.image ? true : false,
          address: this.address,
          companyId: this.$route.params.id,
          id: this.id,
        })
        .then(() => {
          if (this.image)
            this.$store.dispatch("uploadImageAction", this.image).then((res) => {
              if (res.success) {
                this.$emit("edited");
                this.close();
              }
            });
        });
    },
    getImageFn(id) {
      this.$store.dispatch('getImageAction', { id: id }).then(res => {
        if (res.success) {
          this.imageUrl = res.data
        }
      });
    },
    addEmployee() {
      this.$router.push({ name: 'company-dashboard', query: { locationId: this.id } })
    }
  },
  mounted() {
    this.$store
      .dispatch("getLocationAction", {
        locationId: this.id,
      })
      .then((res) => {
        this.address = res.data.address;
        if (res.data.image) {
          this.getImageFn(this.id)
        }
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.edit-location {
  &__image {
    width: 100px;
    height: 100px;

    :deep(.image-input__label-1) {
      font-size: 15px;
      height: 15px;
      border-radius: 5px 5px 0 0;
    }
  }

  &__container {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  &__input {
    flex: 1;
  }

  &__button {
    display: flex;
    justify-content: flex-end;
    font-weight: 600;
    margin-top: 20px;

    span {
      border-bottom: 1px solid $main-color;
      padding-bottom: 5px;
      transition: 0.25s ease-in-out all;
      cursor: pointer;

      &:hover {
        color: $main-color-hover;
        border-color: $main-color-hover;
      }
    }
  }


}
</style>
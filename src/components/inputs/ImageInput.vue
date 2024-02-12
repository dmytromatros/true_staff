<template>
  <div class="image-input">
    <input class="image-input__input" type="file" accept="image/*" @change="handleFileChange" id="image-input__input" />

    <div class="image-input__wrapper">
      <img v-if="imagePreview || imageLink" class="image-input__image" :src="imagePreview ? imagePreview : imageLink"
        alt="img" />
      <img v-else class="image-input__image" src="@/assets/img/profile-img.webp" alt="img" />
      <label class="image-input__label" for="image-input__input"></label>
      <label class="image-input__label-1" for="image-input__input">+</label>
    </div>

  </div>
</template>

<script>

export default {
  name: "ImageInput",
  props: {
    imageLink: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      image: null,
      savable: false,
      imagePreview: null,
    };
  },
  methods: {
    handleFileChange(event) {
      let self = this;
      this.image = event.target.files[0];
      this.savable = true;

      const fileInput = event.target;
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("userId", self.id);
        formData.append("file", self.image);

        self.$emit("changed", formData);
      } else {
        this.imagePreview = undefined;
      }
    },
    saveImage() {
      const formData = new FormData();
      formData.append("userId", this.id);
      formData.append("file", this.image);

      this.$emit("changed", formData);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.image-input {
  position: relative;
  width: 100%;
  height: 100%;

  &__input {
    display: none;
  }

  &__label {
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  &__label-1 {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $white;
    font-weight: 600;
    font-size: 20px;
    color: $green-color;
    border-radius: 10px 10px 0 0;
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    max-height: 400px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__button {
    margin-top: 15px;
  }
}
</style>

<template>
  <Transition name="slide-fade">
    <div v-if="isShown" class="default-popup">
      <div class="default-popup__back"></div>
      <div class="default-popup__window">
        <div class="default-popup__header">
          <span>{{ title }}</span>
          <svg class="default-popup__close" @click="closePopup" width="29" height="29" viewBox="0 0 29 29" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M22.4749 6.72803L7.15283 22.0501" stroke="#000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M7.15283 6.72803L22.4749 22.0501" stroke="#000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div class="default-popup__body">
          <slot name="body"></slot>
        </div>
        <div class="default-popup__footer">
          <DefaultButton label="Закрити" @action="closePopup" :danger="true" />
          <DefaultButton :label="confirmLabel" @action="confirmFn" :success="true" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "DefaultPopup",
  components: { DefaultButton },
  props: {
    isShown: Boolean,
    title: { type: String, default: "Title" },
    confirmLabel: { type: String, default: "Зберегти" },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    confirmFn() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss">
.default-popup {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;

  &__back {
    position: absolute;
    left: 0;
    top: -50%;
    width: 100%;
    height: 150%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 0;
  }

  &__window {
    background-color: #ffffff;
    border-radius: 15px;
    width: 100%;
    max-width: 500px;
    position: relative;
    z-index: 1;
  }

  &__header {
    border-bottom: 1px solid #999;
    padding: 20px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: 800;
    font-size: 22px;
  }

  &__body {
    padding: 50px;
  }

  &__footer {
    border-top: 1px solid #999;
    padding: 20px 10px;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }

  &__close {
    cursor: pointer;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
</style>

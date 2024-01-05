<template>
  <div class="receive-request-card">
    <div class="receive-request-card__from">
      Від: <span class="receive-request-card__bold">{{ from }}</span>
    </div>
    <div class="receive-request-card__location">
      Локація: <span class="receive-request-card__bold">{{ location }}</span>
    </div>
    <div class="receive-request-card__position">
      позиція: <span class="receive-request-card__bold">{{ position }}</span>
    </div>
    <div class="receive-request-card__position">
      Повідомлення:
      <span class="receive-request-card__bold">{{ message }}</span>
    </div>

    <div class="receive-request-card__buttons" v-if="editable">
      <DefaultButton
        class="receive-request-card__button"
        label="Прийняти"
        :success="true"
        @click="handleAcceptRequest"
      />
      <DefaultButton
        class="receive-request-card__button"
        label="Відхилити"
        :danger="true"
        @click="handleRejectRequest"
      />
    </div>

    <div v-else>You hav respond on this request perviously</div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "ReceiveRequest",
  components: { DefaultButton },
  props: {
    from: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleAcceptRequest() {
      this.$emit("accept-request");
    },
    handleRejectRequest() {
      this.$emit("reject-request");
    },
    handleDeleteRequest() {
      this.$emit("delete-request");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.receive-request-card {
  border-radius: 15px;
  padding: 15px;
  @include main-shadow;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__bold {
    font-weight: 600;
  }
  &__buttons {
    display: flex;
    gap: 15px;
  }
  &__button {
    flex: 1;
  }
}
</style>

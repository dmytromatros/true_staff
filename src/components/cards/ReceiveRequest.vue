<template>
  <div class="receive-request-card">
    <DefaultButton
      v-if="!editable"
      label="Delete"
      @click="handleDeleteRequest"
    />

    <div class="receive-request-card__from">From: {{ from }}</div>
    <div class="receive-request-card__location">Location: {{ location }}</div>
    <div class="receive-request-card__position">Position: {{ position }}</div>

    <div v-if="editable">
      <DefaultButton label="Accept" @click="handleAcceptRequest" />
      <DefaultButton label="Reject" @click="handleRejectRequest" />
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

<style lang="scss" scoped></style>

<template>
  <div class="receive-request-card">
    <DefaultButton label="Delete" @click="handleDeleteRequest" />

    <div class="receive-request-card__to">To: {{ to }}</div>
    <div class="receive-request-card__location">Location: {{ location }}</div>
    <div class="receive-request-card__location">Location: {{ location }}</div>
    <div class="receive-request-card__status">Status: {{ status }}</div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "SentRequest",
  components: { DefaultButton },
  props: {
    to: {
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
    status: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleDeleteRequest() {
      this.$emit("delete-request");
    },
  },
};
</script>

<style lang="scss" scoped></style>

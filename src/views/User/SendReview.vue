<template>
  <div class="send-review-card">
    <BaseCard>
      <template v-slot:body> send review </template>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from "@/components/cards/BaseCard.vue";

export default {
  name: "SendReviewCard",
  components: {
    BaseCard,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.send-review-card {
  height: 100%;
}
</style>

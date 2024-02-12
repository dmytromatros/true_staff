<template>
  <div class="send-review-card">
    <UserSearchVue />
  </div>
</template>

<script>
import UserSearchVue from "@/components/UserSearch/UserSearch.vue";

export default {
  name: "SendReviewCard",
  components: {

    UserSearchVue
  },
  data() {
    return {
    };
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.send-review-card {
  height: 100%;
}
</style>

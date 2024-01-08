<template>
  <div class="user-info-card">
    <BaseCard>
      <template v-slot:body> user info card: {{ user }} </template>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from "@/components/cards/BaseCard.vue";
export default {
  name: "UserInfoCard",
  props: {
    user: {
      type: String,
    },
  },
  components: {
    BaseCard,
  },
  methods: {
    getUserFn(user) {
      this.$store.dispatch("getUserInfoAction", { id: user }).then((res) => {
        if (res.success) console.log(res.data);
      });
    },
  },
  watch: {
    user() {
      this.getUserFn(this.user);
    },
  },
};
</script>

<style lang="scss" scoped></style>

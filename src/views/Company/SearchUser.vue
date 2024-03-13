<template>
  <div class="search-user">
    <UserSearchVue class="search-user__container" />
  </div>
</template>

<script>
import UserSearchVue from '@/components/UserSearch/UserSearch.vue';

export default {
  name: 'SearchUser',
  components: {
    UserSearchVue,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.search-user {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__container {
    flex: 1;
    height: 100%;
  }
}
</style>

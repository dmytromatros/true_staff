<template>
    <div class="user-search">
        <UserInfoCard class="user-search__card user-search__card-user-info" :user="userId" />
        <SearchCard class="user-search__search" @selected="showUserInfo" />
    </div>
</template>

<script>
import UserInfoCard from '@/components/cards/UserInfoCard.vue';
import SearchCard from '@/components/cards/SearchCard.vue';
export default {
    name: "UserSearch",
    components: { UserInfoCard, SearchCard },
    props: {},
    data() {
        return {
            userId: null
        }
    },
    computed: {},
    methods: {
        showUserInfo(info) {
            this.userId = info.user;
        },
    }
}
</script>

<style lang="scss" scoped>
.user-search {
    display: flex;
    height: 100%;

    &__card {
        flex: 2.5;
    }

    &__search {
        flex: 1;
    }
}
</style>
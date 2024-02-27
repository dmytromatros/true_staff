<template>
    <div class="user-search">
        <UserInfoCard class="user-search__card user-search__card-user-info" :user="userId" />
    </div>
</template>

<script>
import UserInfoCard from '@/components/cards/user/UserInfoCard.vue';
export default {
    name: "UserSearch",
    components: { UserInfoCard },
    props: {},
    data() {
        return {
            userId: null
        }
    },
    computed: {

    },
    methods: {
        showUserInfo(info) {
            this.userId = info.user;
        },
    },

}
</script>

<style lang="scss" scoped>
.user-search {
    display: flex;
    gap: 15px;
    height: 100%;

    &__card {
        flex: 2.5;
    }

    &__search {
        flex: 1;
    }
}
</style>
<template>
    <div class="search-user">
        <div class="search-user__switcher">
            <button class="search-user__switch"
                @click="() => { this.$router.push({ name: 'company-dashboard' }) }">Робітники</button>
            <button class="search-user__switch search-user__switch--active">Знайти користувача</button>
        </div>
        <UserSearchVue />
    </div>
</template>
  
<script>
import UserSearchVue from "@/components/UserSearch/UserSearch.vue";

export default {
    name: "SearchUser",
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

.search-user {
    height: 100%;
    padding-top: 15px;

    &__switcher {
        background: $white;
        width: calc(100% - 15px);
        border-radius: 10px;
        padding: 0 15px;
        height: 55px;
        @include main-shadow;
    }

    &__switch {
        padding: 12px 15px;
        font-size: 18px;
        transition: 0.25s ease-in-out all;
        background: transparent;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            height: 2px;
            width: calc(100% - 30px);
            border: 3px;
            background: $main-color-hover;
            bottom: 15px;
            left: 15px;
            transition: 0.25s ease-in-out all;
            opacity: 0;
        }

        &:hover {
            color: $main-color-hover;
        }

        &--active {
            color: $main-color-hover;

            &::after {
                opacity: 1;
            }

        }
    }
}
</style>
  
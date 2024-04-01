<template>
    <div class="main-sidebar">
        <Transition name="sidebar" appear>
            <div class="main-sidebar__sidebar" ref="mainSidebar" @click="openSidebar"
                @pointerleave="openedSideBar = false" :class="{ 'main-sidebar__sidebar--opened': openedSideBar }">
                <div class="main-sidebar__top">
                    <MenuCard v-if="isCompany" class="main-sidebar__sidebar-link" label="Локації"
                        link="company-locations" icon="location_on" id="tour-step-locations" />

                    <MenuCard v-if="isCompany" class="main-sidebar__sidebar-link" label="Працівники"
                        link="company-dashboard" icon="groups" />

                    <MenuCard class="main-sidebar__sidebar-link" label="Знайти користувача" :link="searchRoute"
                        icon="person_search" />

                    <MenuCard class="main-sidebar__sidebar-link" label="Запити до співпраці" :link="requestRoute"
                        icon="forum" :message="true" />
                </div>
                <MenuCard class="main-sidebar__sidebar-link main-sidebar__sidebar-link--profile" label="Профіль"
                    :link="settingsRoute" icon="person" />
            </div>
        </Transition>
    </div>
</template>

<script>
import MenuCard from '@/components/cards/system/MenuCard.vue';
export default {
    name: "MainSidebar",
    components: { MenuCard },
    props: {},
    data() {
        return {
            openedSideBar: false,

        }
    },
    computed: {
        isCompany() {
            return this.$route.name.includes('company')
        },

        settingsRoute() {
            return this.isCompany ? 'company-settings' : 'user-settings'
        },

        requestRoute() {
            return this.isCompany ? 'company-requests' : 'user-requests'
        },

        searchRoute() {
            return this.isCompany ? 'company-search-user' : 'user-dashboard'
        }
    },
    methods: {
        openSidebar(e) {
            if (e.target && e.target === this.$refs.mainSidebar) {
                this.openedSideBar = true;
            } else {
                this.openedSideBar = false;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.main-sidebar {
    &__sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        overflow: auto;
        padding: 8.7px;
        width: 60px;
        background: white;
        border-radius: 10px;
        transition: 0.25s ease-in-out all;

        &--opened {
            width: 270px;
        }
    }

    &__sidebar-link {
        height: fit-content;
    }

    &__top {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
}

.sidebar-enter-active,
.content-enter-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.sidebar-enter-from {
    transform: translateX(-10vh);
    opacity: 0.01;
}
</style>
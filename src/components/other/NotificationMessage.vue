<template>
    <TransitionGroup name="list" tag="div" class="notification-message">
        <div class="notification-message__item" :class="{
            'notification-message__item--success': notification.type === 'success',
            'notification-message__item--error': notification.type === 'error',
            'notification-message__item--warning': notification.type === 'warning'
        }" v-for="notification in notifications" :key="notification.message">
            <span class="notification-message__text">
                {{ notification.message }}
            </span>
            <FontIcon class="notification-message__close" icon="close" @click="deleteNotification(notification.id)" />
        </div>
    </TransitionGroup>
</template>

<script>
import FontIcon from '@/components/other/FontIcon.vue';

export default {
    name: "NotificationMessage",
    components: { FontIcon },
    props: {},
    data() {
        return {
            notifications: this.$store.state.notifications
        }
    },
    computed: {},
    methods: {
        deleteNotification(id) {
            this.$store.dispatch('deleteNotification', id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.notification-message {
    position: fixed;
    right: 50px;
    top: 20px;
    z-index: 9999;
    width: fit-content;

    display: flex;
    flex-direction: column;
    gap: 5px;

    &__item {
        padding: 10px 20px;
        padding-right: 5px;
        border-radius: 5px;
        background-color: green;
        display: flex;
        align-items: center;
        gap: 20px;
        user-select: none;

        &:hover {
            outline: 1px solid transparent;
        }

        &--error {
            background-color: #ffe1e2;
            color: #fc5c65;

            &:hover {
                outline-color: #fc5c65;
            }
        }

        &--success {
            background-color: #deffc4;
            color: #91c483;

            &:hover {
                outline-color: #91c483;
            }
        }

        &--warning {
            background-color: #fff8c4;
            color: #c3c483;

            &:hover {
                outline-color: #c3c483;
            }
        }
    }

    &__close {
        font-size: 18px !important;
        cursor: pointer;
        transition: 0.25s ease-in-out all;

        &:hover {
            transform: scale(1.2);
        }
    }

    &__text {
        flex: 1;
        white-space: nowrap;
    }

}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}
</style>
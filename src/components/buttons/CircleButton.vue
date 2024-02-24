<template>
    <div class="circle-button">
        <button @click.stop="action" class="circle-button__button" :class="{ danger, success, warning, disabled }"
            :title="title">
            <FontIcon :icon="icon" :font-size="fontSize || '20'" />
        </button>
    </div>
</template>
  
<script>
import FontIcon from '@/components/other/FontIcon.vue';
export default {
    name: "CircleButton",
    components: { FontIcon },
    props: {
        icon: {
            type: String,
            default: "",
        },
        danger: {
            type: Boolean,
            default: false,
        },
        success: {
            type: Boolean,
            default: false,
        },
        warning: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fontSize: {
            type: String,
        },
        title: {
            type: String,
        },
    },
    methods: {
        action() {
            this.$emit("action");
        },
    },
};
</script>
  
<style lang="scss" scoped>
@import "@/styles/main.scss";

.circle-button {
    &__button {
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 50%;
        @include main-shadow;
        color: $dark_text;
        font-weight: 400;
        transition: 0.3s ease-in-out all;
        background-color: $main-color;
        color: $white;
        font-weight: 600;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.danger {
            background-color: $red-color;
        }

        &.success {
            background-color: $green-color;
        }

        &.warning {
            background-color: $yellow-color;
        }

        &.disabled {
            background-color: grey;
            pointer-events: none;
        }

        &:hover {
            opacity: 0.8;
            box-shadow: 0 0 10px 1px rgba($color: $black, $alpha: 0.3);
        }
    }
}
</style>
  
<template>
    <Transition name="slide-fade">
        <div class="v-tour" v-if="$store.state.showTour">
            <div class="v-tour__back"></div>
            <div class="v-tour__container">
                <div class="v-tour__body">
                    <div class="v-tour__steps">
                        <div class="v-tour__step" v-for="(step, index) in computedSteps" :key="index"
                            @click="selected = step[0]" :class="{ 'v-tour__step--active': step[0] == selected }">
                            <FontIcon :icon="step[0]" class="v-tour__step-icon" />
                        </div>
                        <div class="v-tour__steps-shadow"></div>
                    </div>
                    <div class="v-tour__content">
                        <div class="v-tour__title">
                            <span>{{ steps.get(selected).title }}</span>
                            <FontIcon icon="close" class="v-tour__title-close" @click="closeTour" />
                        </div>
                        <div class="v-tour__main" v-html="steps.get(selected).content"></div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { tourSteps } from '../../../../utils/vtour.js';
import FontIcon from '@/components/other/FontIcon.vue';
export default {
    name: "TourStep",
    components: { FontIcon },
    props: {},
    data() {
        return {
            steps: tourSteps,
            selected: 'settings',
        }
    },
    computed: {
        computedSteps() {
            const role = this.$store.state.role;
            return Array.from(tourSteps.entries())
                .filter(([/* key */, value]) => role === '' ? value.user : true);
        }
    },
    methods: {
        closeTour() {
            localStorage.setItem('showTour', false);
            this.$store.commit('setTour', false);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.v-tour {
    position: fixed;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;

    &__back {
        position: absolute;
        left: 0;
        top: -50%;
        width: 100%;
        height: 150%;
        background-color: rgba($color: #000000, $alpha: 0.5);
        z-index: 0;
    }

    &__container {
        width: 100%;
        height: 80%;
        position: relative;
        top: 10%;
        display: flex;
        justify-content: center;
    }

    &__body {
        max-width: 600px;
        width: 100%;
        display: flex;
        height: 100%;
    }

    &__steps {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-top: 25px;
        position: relative;
        z-index: 2;
    }

    &__step {
        background-color: $white;
        border-radius: 8px 0 0 8px;
        border: 1px solid $main-color;
        border-right: none;
        transition: 0.25s ease-in-out all;
        padding: 5px;
        cursor: pointer;
        position: relative;
        z-index: 1;
        right: -1px;

        &:hover {
            border-color: $second-color;
        }

        &:hover &-icon {
            color: $second-color;
        }

        &--active {
            z-index: 4;
            border-color: $second-color;
        }

        &--active &-icon {
            color: $second-color;
        }
    }

    &__steps-shadow {
        position: absolute;
        top: 0;
        right: -1px;
        width: 1px;
        height: 100%;
        box-shadow: 0px 0 10px 1px rgba(1, 20, 57, 0.3);
        z-index: 2;


        &::before {
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            width: 20px;
            height: 100%;
            z-index: 3;
            background: $white;
            border-radius: $border-radius 0 0 $border-radius;
            border-top: 1px solid $second-color;
            border-left: 1px solid $second-color;
            border-bottom: 1px solid $second-color;
        }
    }

    &__step-icon {
        font-size: 40px;
        transition: 0.25s ease-in-out all
    }

    &__content {
        flex: 1;
        height: 100%;
        background-color: $white;
        box-shadow: 0 0 10px 1px rgba(1, 20, 57, 0.3);
        z-index: 1;
        position: relative;
        border-radius: $border-radius;
        padding: 25px;
        border: 1px solid $second-color;
        display: flex;
        flex-direction: column;
    }

    &__title {
        font-size: 24px;
        line-height: 36px;
        font-weight: 800;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 25px;
    }

    &__title-close {
        font-weight: 800;
        cursor: pointer;
        transition: 0.25s ease-in-out all;

        &:hover {
            color: $red-color;
        }
    }

    &__main {
        overflow: auto;
        text-wrap: wrap;
        word-wrap: break-word;
        flex: 1;
    }
}

.slide-fade-enter-active {
    transition: all 0.25s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(50%);
    opacity: 0;
}
</style>
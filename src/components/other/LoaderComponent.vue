<template>
    <div class="loader">
        <span class="loader__loader"
            :style="{ 'border-top-color': color, 'border-left-color': color, 'border-right-color': color, 'width': width, 'height': width }"></span>
    </div>
</template>

<script>
export default {
    name: "LoaderComponent",
    components: {},
    props: {
        color: String,
        width: String
    },
    data() {
        return {}
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.loader {

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &__loader {
        width: 48px;
        height: 48px;
        border: 5px solid $main-color;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
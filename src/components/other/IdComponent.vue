<template>
    <div class="id-component" @click="copyId(id)" title="Скопіювати">
        # {{ id }}
    </div>
</template>

<script>
export default {
    name: "IdComponent",
    components: {},
    props: {
        id: String
    },
    data() {
        return {}
    },
    computed: {},
    methods: {
        async copyId(id) {
            try {
                await navigator.clipboard.writeText(id);
                this.$store.dispatch('showNotification', { message: 'ID скопійовано!', type: 'success' })
            } catch ($e) {
                this.$store.dispatch('showNotification', { message: 'Не вдалось скопіювати ID', type: 'error' })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.id-component {
    width: fit-content;
    margin: auto;
    opacity: 0.9;
    border: 1px solid $main-color;
    border-radius: 5px;
    padding: 7px 10px;
    cursor: pointer;
    font-size: 12px;
    margin-top: 15px;
    background: $white;
    color: $main-color;
    font-weight: 600;
    letter-spacing: 1px;
    transition: 0.25s ease-in-out all;
    text-align: center;

    &:hover {
        opacity: 1;
    }
}
</style>
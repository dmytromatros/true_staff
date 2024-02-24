<template>
    <button class="small-user-preview-card" @click="goTo">
        <div class="small-user-preview-card__info">
            <img :src="image || '/img/profile-img.webp'" alt="Фото" class="small-user-preview-card__img">
            <div class="small-user-preview-card__name">{{ name }}</div>
        </div>
        <CircleButton icon="visibility" class="small-user-preview-card__button" />
    </button>
</template>

<script>
import CircleButton from '@/components/buttons/CircleButton.vue'
export default {
    name: "SmallUserPreviewCard",
    components: { CircleButton },
    props: {
        id: {
            type: String,
            default: ''
        },
        uniqueId: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            image: null
        }
    },
    computed: {},
    methods: {
        goTo() {
            this.$router.push({ name: 'company-search-user', query: { userId: this.uniqueId } })
        }
    },
    mounted() {
        this.$store.dispatch('getImageAction', { id: this.id }).then(res => {
            if (res.success) {
                this.image = res.data
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.small-user-preview-card {
    padding: 10px;
    border-bottom: 1px solid $light-grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: transparent;
    transition: 0.25s ease-in-out all;

    &:hover {
        background: $light-grey;

    }

    &__info {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    &__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }

    &__name {
        font-weight: 600;
    }

    &__button {
        pointer-events: none;
    }
}
</style>    
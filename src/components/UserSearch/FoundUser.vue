<template>
    <div class="found-user">
        <LoaderComponent v-if="loading" />
        <BaseCard v-else class="found-user__card" @click="$emit('find', user._id)">
            <template v-slot:body>
                <img class="found-user__image" :src="image || '/img/profile-img.webp'" alt="">
                <div class="found-user__name">{{ user.name }} {{ user.surname }}</div>
            </template>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '../cards/system/BaseCard.vue';
import LoaderComponent from '../other/LoaderComponent.vue';
export default {
    name: "FoundUser",
    components: { BaseCard, LoaderComponent },
    props: {
        user: { type: Object, default: () => { } },
    },
    data() {
        return {
            image: '',
            loading: true
        }
    },
    computed: {},
    methods: {
        getImageFn(id) {
            this.$store.dispatch('getImageAction', { id: id }).then(res => {
                if (res.success) {
                    this.image = res.data
                }
            })
        }
    },
    mounted() {
        if (this.user.isImage) {
            this.getImageFn(this.user._id)
            this.loading = false
        } else
            this.loading = false
    }
}
</script>

<style lang="scss" scoped>
.found-user {
    &__card {
        display: flex;
        align-items: center;
        gap: 15px;
        cursor: pointer;
    }

    &__image {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
    }

    &__name {
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
    }
}
</style>
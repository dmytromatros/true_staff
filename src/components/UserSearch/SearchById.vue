<template>
    <div class="search-by-id">
        <TextInput placeholder="Введіть ID користувача" v-model="id" />
        <DefaultButton label="Шукати" @click="$emit('find', id)" />
    </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import DefaultButton from '../buttons/DefaultButton.vue';
export default {
    name: "SearchById",
    components: { TextInput, DefaultButton },
    props: {},
    data() {
        return {
            id: ''
        }
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.search-by-id {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
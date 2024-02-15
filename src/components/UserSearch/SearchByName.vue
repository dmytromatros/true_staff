<template>
    <div class="search-by-name">
        <BaseCard class="search-by-name__card">
            <template v-slot:body>
                <TextInput placeholder="Ім'я" v-model="user.name" />
                <TextInput placeholder="Прізвище" v-model="user.lname" />
                <DefaultButton label="Шукати" @click="startSearch" />
            </template>
        </BaseCard>
        <BaseCard v-if="foundUsers.length" class="search-by-name__result">
            <template v-slot:body>
                <FoundUser v-for="user in foundUsers" :key="user.name + user.surname" :user="user" @find="findUser" />
            </template>
        </BaseCard>
    </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import BaseCard from '@/components/cards/system/BaseCard.vue';
import DefaultButton from '../buttons/DefaultButton.vue';
import FoundUser from '@/components/UserSearch/FoundUser.vue';
export default {
    name: "SearchByName",
    components: { TextInput, BaseCard, DefaultButton, FoundUser },
    props: {},
    data() {
        return {
            user: {
                name: '',
                lname: ''
            },

            foundUsers: []
        }
    },
    computed: {},
    methods: {
        findUsersList() {
            this.$store.dispatch('findByNameAction', this.user).then(res => {
                if (res.success) {
                    this.foundUsers = res.data
                }
            })
        },
        startSearch() {
            this.findUsersList()
        },
        clear() {
            this.user.name = ''
            this.user.lname = ''

            this.foundUsers = []
        },
        findUser(id) {
            this.$emit('find', id)
            this.clear()
        }
    },

}
</script>

<style lang="scss" scoped>
.search-by-name {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &__card {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

}
</style>
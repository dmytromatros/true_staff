<template>
    <section class="company-settings">
        <div class="company-settings__form">

            <div class="company-settings__content">
                <BaseCard style="padding: 0">
                    <template v-slot:body>
                        <div class="company-settings__data">
                            <div class="company-settings__data-title">Загальна інформація</div>
                            <div class="company-settings__data-content">
                                <TextInput label="Назва" v-model="$store.state.company.name" />
                                <TextInput label="Логін" v-model="$store.state.company.login" :disabled="true" />
                                <div class="company-settings__data-pass">
                                    <TextInput class="company-settings__data-pass-input" label="Пароль" type="password"
                                        v-model="$store.state.company.password" :disabled="true" />
                                    <DefaultButton label="Змінити пароль" @action="openPopup" />
                                </div>

                                <div class="company-settings__buttons">
                                    <DefaultButton label="Зберегти зміни" @action="editUser" :loading="loading" />
                                </div>
                            </div>
                        </div>
                    </template>
                </BaseCard>
            </div>
            <div class="company-settings__content">
                <BaseCard>
                    <template v-slot:body>
                        <div class="company-settings__image">
                            <ImageInput :imageLink="$store.state.profileImage" @changed="handleImage"
                                :id="$store.state.id" />
                        </div>
                    </template>
                </BaseCard>
            </div>
        </div>
        <ChangeCompanyPasswordPopup :isShown="changePassPopup" @close="closePopup" />
    </section>
</template>
  
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BaseCard from "@/components/cards/system/BaseCard.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import ChangeCompanyPasswordPopup from "@/components/popups/ChangeCompanyPasswordPopup.vue";

export default {
    name: "CompanySettings",
    components: {
        TextInput,
        DefaultButton,
        BaseCard,
        ImageInput,
        ChangeCompanyPasswordPopup
    },
    data() {
        return {
            user: {},
            image: null,
            imageUrl: null,
            changePassPopup: false,
            loading: true,
        };
    },
    methods: {
        handleImage(data) {
            this.user.image = data;
        },

        editUser() {
            this.loading = true
            const data = {
                id: this.$store.state.id,
                name: this.$store.state.company.name,
            };

            this.$store.dispatch("editCompanyAction", data).then((res) => {
                if (res.success) {
                    if (this.user.image) {
                        this.$store.dispatch("uploadImageAction", this.user.image).then((res) => {
                            if (res.success) this.$store.dispatch('getImageAction', { id: this.$store.state.id, profile: true })
                            if (!res.success) this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
                        });
                    }

                    this.$store.dispatch('showNotification', { message: res.message, type: 'success' })
                    this.$emit('user-edited')
                } else {
                    this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
                }
            }).finally(() => {
                this.loading = false
            });
        },



        openPopup() {
            this.changePassPopup = true;
        },
        closePopup() {
            this.changePassPopup = false;
        },

    },

    mounted() {
        this.loading = false
    },
};
</script>
  
<style lang="scss" scoped>
@import "@/styles/main.scss";

.company-settings {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &__form {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 25px;
        justify-content: center;
    }

    &__content {
        &:first-child {
            min-width: 500px;
        }

        height: fit-content;
    }

    &__image {
        max-width: 250px;
        max-height: 500px;
    }

    &__data-content {
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding: 25px;
    }

    &__data-title {
        @include main-title;
    }

    &__data-pass {
        display: flex;
        align-items: flex-end;
        gap: 15px;

        &-input {
            flex: 1;
        }
    }
}
</style>
  
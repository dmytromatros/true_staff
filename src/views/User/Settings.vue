<template>
  <section class="user-settings">
    <LoaderComponent v-if="loading" />
    <div v-else class="user-settings__form">

      <div class="user-settings__content">
        <BaseCard style="padding: 0">
          <template v-slot:body>
            <div class="user-settings__data">
              <div class="user-settings__data-title">Загальна інформація</div>
              <div class="user-settings__data-content">
                <TextInput label="Ім'я" v-model="user.name" />
                <TextInput label="Прізвище" v-model="user.surname" />
                <div class="user-settings__data-pass">
                  <TextInput class="user-settings__data-pass-input" label="Пароль" type="password" v-model="user.password"
                    :disabled="true" />
                  <DefaultButton label="Змінити пароль" @action="openPopup" />
                </div>
                <CheckboxInput label="Is an employee" v-model="user.isEmployee" />

                <div class="user-settings__buttons">
                  <DefaultButton label="Зберегти зміни" @action="editUser" />
                </div>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="user-settings__content">
        <BaseCard>
          <template v-slot:body>
            <div class="user-settings__image">
              <LoaderComponent v-if="imageLoading" />
              <ImageInput v-else :imageLink="imageUrl" @changed="handleImage" :id="$route.params.id" />
            </div>
          </template>
        </BaseCard>
        <div class="user-settings__id">
          <IdComponent :id="this.user.uniqueId" />
        </div>
      </div>
    </div>
    <ChangeUserPasswordPopup :isShown="changePassPopup" @close="closePopup" />
  </section>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import CheckboxInput from "@/components/inputs/CheckboxInput.vue";
import ChangeUserPasswordPopup from "@/components/popups/ChangeUserPasswordPopup.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BaseCard from "@/components/cards/system/BaseCard.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import LoaderComponent from "@/components/other/LoaderComponent.vue"
import IdComponent from "@/components/other/IdComponent.vue";

export default {
  name: "UserSettings",
  components: {
    TextInput,
    CheckboxInput,
    ChangeUserPasswordPopup,
    DefaultButton,
    BaseCard,
    ImageInput,
    LoaderComponent,
    IdComponent
  },
  data() {
    return {
      user: {},
      image: null,
      imageUrl: null,
      changePassPopup: false,
      loading: true,
      imageLoading: true
    };
  },
  methods: {
    handleImage(data) {
      this.user.image = data;
    },

    editUser() {
      const data = {
        id: this.$route.params.id,
        name: this.user.name,
        surname: this.user.surname,
        isEmployee: this.user.isEmployee,
      };

      this.$store.dispatch("editUserAction", data).then((res) => {
        if (res.success) {
          if (this.user.image) {
            this.$store.dispatch("uploadImageAction", this.user.image).then((res) => {
              if (!res.success) this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
            });

          }

          this.$store.dispatch('showNotification', { message: res.message, type: 'success' })
          this.$emit('user-edited')
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
        }
      });
    },

    getImageFn() {
      this.$store
        .dispatch("getImageAction", { id: this.$route.params.id })
        .then((res) => {
          this.imageUrl = res.data;
        }).finally(() => {
          this.imageLoading = false
        });
    },
    getWorkplacesFn() {
      this.$store
        .dispatch("getWorkplacesAction", {
          employeeId: this.$route.params.id,
        })
        .then((res) => {
          this.enteredCompanies = res.data;
        });
    },

    openPopup() {
      this.changePassPopup = true;
    },
    closePopup() {
      this.changePassPopup = false;
      this.getUserFn()
    },
    getUserFn() {
      this.$store
        .dispatch("getUserAction", { id: this.$route.params.id })
        .then((res) => {
          if (res.success) {
            this.user = { ...res.data };

            if (this.user.isImage) {
              this.getImageFn();
            } else {
              this.imageLoading = false
            }
            this.getWorkplacesFn();
          }
        }).finally(() => {
          this.loading = false
        });
    }
  },

  mounted() {
    this.getUserFn()
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.user-settings {
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

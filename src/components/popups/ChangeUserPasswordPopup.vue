<template>
  <DefaultPopup :isShown="isShown" @close="close" title="Змінити пароль" @confirm="changePass"
    :loadingButton="loadingButton" :loading="loading">
    <template v-slot:body>
      <div class="change-password">
        <TextInput placeholder="Старий пароль" type="password" v-model="oldPass" />
        <TextInput placeholder="Новий пароль" type="password" v-model="newPass" />
        <TextInput placeholder="Повторіть новий пароль" type="password" v-model="newPassNew" />
      </div>
    </template>
  </DefaultPopup>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultPopup from "@/components/popups/DefaultPopup.vue";

export default {
  name: "ChangePasswordPopup",
  components: { TextInput, DefaultPopup },
  props: {
    isShown: Boolean,
  },
  data() {
    return {
      newPass: "",
      oldPass: "",
      newPassNew: "",
      loadingButton: false,
      loading: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    changePass() {
      this.loadingButton = true

      if (this.newPass !== this.newPassNew) {
        this.$store.dispatch('showNotification', { message: 'Не правильно повторно ведений новий пароль', type: 'error' })
        return
      }
      this.$store.dispatch("editUserPasswordAction", {
        oldPass: this.oldPass,
        newPass: this.newPass,
        id: this.$route.params.id,
      }).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' })
          this.newPass = ''
          this.oldPass = ''
          this.newPassNew = ''
          this.close();
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
        }
      }).finally(() => {
        this.loadingButton = false
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.change-password {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>

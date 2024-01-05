<template>
  <DefaultPopup
    :isShown="isShown"
    @close="close"
    title="Змінити пароль"
    @confirm="changePass"
  >
    <template v-slot:body>
      <div class="change-password">
        <TextInput label="Старий пароль" type="password" v-model="oldPass" />
        <TextInput label="Новий пароль" type="password" v-model="newPass" />
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
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    changePass() {
      this.$store.dispatch("editUserPasswordAction", {
        oldPass: this.oldPass,
        newPass: this.newPass,
        id: this.$route.params.id,
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

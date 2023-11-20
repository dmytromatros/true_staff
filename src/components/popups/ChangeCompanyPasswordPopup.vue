<template>
  <DefaultPopup
    :isShown="isShown"
    @close="close"
    title="Change password"
    @confirm="changePass"
  >
    <template v-slot:body>
      <div class="change-password">
        <TextInput label="old password" type="password" v-model="oldPass" />
        <TextInput label="new password" type="password" v-model="newPass" />
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
      this.$store.dispatch("editCompanyPasswordAction", {
        oldPass: this.oldPass,
        newPass: this.newPass,
        id: this.$route.params.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="copmany-dashboard">
    <h2>Copmany settings</h2>
    <div class="copmany-dashboard__form">
      <img
        class="copmany-dashboard__photo"
        src="https://media.istockphoto.com/id/178447404/photo/modern-business-buildings.jpg?s=612x612&w=0&k=20&c=MOG9lvRz7WjsVyW3IiQ0srEzpaBPDcc7qxYsBCvAUJs="
        alt="comp_photo"
      />
      <TextInput label="Company name" v-model="company.name" />
      <TextInput
        label="Company login (disabled)"
        :disabled="true"
        v-model="company.login"
      />
      <div class="copmany-dashboard__pass">
        <TextInput
          label="Company password"
          type="password "
          :disabled="true"
          v-model="company.password"
        />
        <DefaultButton label="Change password" @click="openPopup" />
      </div>
      <DefaultButton label="Save" @click="saveChangesFn" />
    </div>
    <button @click="logoutFn">Log out</button>

    <ChangeCompanyPasswordPopup
      :isShown="changePassPopup"
      @close="closePopup"
    />
  </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import ChangeCompanyPasswordPopup from "@/components/popups/ChangeCompanyPasswordPopup.vue";

export default {
  name: "CopmanyDashboard",
  components: { TextInput, DefaultButton, ChangeCompanyPasswordPopup },
  data() {
    return {
      company: {
        name: "",
        login: "",
        password: "",
      },
      changePassPopup: false,
    };
  },
  methods: {
    logoutFn() {
      this.$store.dispatch("logOutAction");
    },
    async saveChangesFn() {
      this.$store.dispatch("editCompanyAction", {
        name: this.company.name,
        password: this.company.password,
        id: this.$route.params.id,
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
    this.$store
      .dispatch("getCompanyAction", { id: this.$route.params.id })
      .then((res) => {
        if (res.success) {
          this.company.name = res.data.name;
          this.company.login = res.data.login;
          this.company.password = res.data.password;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.copmany-dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__pass {
    display: flex;
    gap: 15px;
    align-items: flex-end;
  }
  &__photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin: auto;
  }
}
</style>
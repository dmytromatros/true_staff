<template>
  <DefaultPopup
    :isShown="true"
    @close="close"
    title="Add new location"
    @confirm="addLocation"
  >
    <template v-slot:body>
      <div class="change-password">
        <TextInput label="Image" type="test" v-model="image" :disabled="true" />
        <TextInput label="Location adress" type="test" v-model="adress" />
      </div>
    </template>
  </DefaultPopup>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultPopup from "@/components/popups/DefaultPopup.vue";

export default {
  name: "AddLocationPopup",
  components: { TextInput, DefaultPopup },
  props: {
    isShown: Boolean,
  },
  data() {
    return {
      image: "",
      adress: "",
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    addLocation() {
      this.$store
        .dispatch("addLocationAction", {
          image: this.image,
          adress: this.adress,
          company: this.$route.params.id,
        })
        .then(() => {
          this.$emit("added");
          this.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <DefaultPopup
    :isShown="true"
    @close="close"
    title="Edit location"
    @confirm="editLocation"
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
  name: "EditLocationPopup",
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
    editLocation() {
      this.$store
        .dispatch("editLocationAction", {
          image: this.image,
          adress: this.adress,
          companyId: this.$route.params.id,
          id: this.$route.params.locationId,
        })
        .then(() => {
          this.$emit("edited");
          this.close();
        });
    },
  },
  mounted() {
    this.$store
      .dispatch("getLocationAction", {
        locationId: this.$route.params.locationId,
      })
      .then((res) => {
        this.adress = res.data.adress;
        this.image = res.data.image;
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
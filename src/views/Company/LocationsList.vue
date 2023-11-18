<template>
  <div class="locations-list">
    <div
      class="locations-list__location"
      v-for="(location, key) in locations"
      :key="key"
    >
      <span>{{ location.adress }}</span>
      <DefaultButton label="Edit" @click="openEditPopupFN(location._id)" />
    </div>
    <DefaultButton label="Add location" @click="openAddPopupFN" />

    <router-view name="edit_location" />
    <router-view name="add_location" @added="getLocations" />
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";

export default {
  name: "LocationsList",
  components: { DefaultButton },
  data() {
    return {
      locations: {},
    };
  },
  methods: {
    openAddPopupFN() {
      this.$router.push({
        name: "add_location",
      });
    },
    getLocations() {
      this.$store
        .dispatch("getLocationsAction", {
          id: this.$route.params.id,
        })
        .then((res) => {
          this.locations = res.data;
        });
    },
    openEditPopupFN(id) {
      this.$router.push({
        name: "edit_location",
        params: {
          locationId: id,
        },
      });
    },
  },
  mounted() {
    this.getLocations();
  },
};
</script>

<style lang="scss" scoped>
.locations-list {
  &__location {
    display: flex;
    gap: 15px;
  }
}
</style>
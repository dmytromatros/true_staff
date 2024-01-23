<template>
  <div class="locations-list">
    <div class="locations-list__container">
      <BaseCard class="locations-list__locations-card">
        <template v-slot:body
          ><div class="locations-list__locations">
            <div
              class="locations-list__location"
              v-for="(location, key) in locations"
              :key="key"
            >
              <LocationCard :location="location" @edited="getLocations" />
            </div></div
        ></template>
      </BaseCard>

      <BaseCard class="locations-list__new-location-card">
        <template v-slot:body
          ><div class="locations-list__new-location">
            <ImageInput v-model="newLocation.image" @changed="handleImage" />

            <span class="locations-list__new-location-text"> 
              Адреса локації
            </span>

            <TextInput class="locations-list__new-location-input"
            type="text"
            placeholder="Введіть адресу локації"
              v-model="newLocation.address"
            />

            <DefaultButton
              label="Add location"
              @click="addLocation"
            /></div></template
      ></BaseCard>
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import LocationCard from "@/components/cards/LocationCard.vue";
import BaseCard from "@/components/cards/BaseCard.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
export default {
  name: "LocationsList",
  components: { TextInput, DefaultButton, LocationCard, BaseCard, ImageInput },
  data() {
    return {
      locations: {},
      newLocation: {
        image: "",
        address: "",
      },
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
    handleImage(data) {
      this.newLocation.image = data;
    },
    addLocation() {
      this.$store
        .dispatch("addLocationAction", {
          image: this.newLocation.image,
          address: this.newLocation.address,
          company: this.$route.params.id,
          employees: 0,
        })
        .then((res) => {
          this.newLocation.image.set("userId", res.data.new._id);
          this.$store.dispatch("uploadImageAction", this.newLocation.image);
          // this.$store
          //   .dispatch("getLocationsAction", {
          //     id: this.$route.params.id,
          //   })
          //   .then((res) => {

          //   });

          this.getLocations();
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
  width: 100%;
  height: 100%;
  &__container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    gap: 15px;
    padding: 15px;
  }
  &__new-location-card {
    height: fit-content;
  }
  &__locations-card {
    overflow: auto;
    max-height: 100%;
  }
  &__locations {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__new-location-text{
    font-size: 36px;
    display: block;
    margin: 25px 0 25px 7px;
    font-weight: 600;
  }
  &__new-location-input{
    margin-bottom: 10px;
  }
  :deep(.image-input__image){
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
  :deep(.image-input__wrapper){
    width: 250px;
    height: 250px;
    border-radius: 50%;
    margin: auto;
  }
  }
</style>

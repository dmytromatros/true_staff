<template>
  <div class="locations-list">
    <LoaderComponent v-if="loading" />
    <div v-else class="locations-list__container">
      <div class="locations-list__label" v-if="!loading && !Object.keys($store.state.locations).length">Немає локацій.</div>

      <div class="locations-list__locations-card" v-else>
        <div class="locations-list__locations">
          <div class="locations-list__location" v-for="(location, key) in $store.state.locations" :key="key + location._id">
            <LocationCard :location="location" />
          </div>
        </div>
      </div>

      <div class="locations-list__new-location-wrapper">
        <BaseCard class="locations-list__new-location-card" :key="reloadData">
          <template v-slot:body>
            <form class="locations-list__new-location" @submit.prevent="addLocation">
              <ImageInput v-model="newLocation.image" @changed="handleImage" id="new" />

              <span class="locations-list__new-location-text"> Адреса локації </span>

              <TextInput class="locations-list__new-location-input" type="text" placeholder="Введіть адресу локації" v-model="newLocation.address" />

              <DefaultButton label="Додати локацію" type="submit" :loading="loadingButton" />
            </form>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue';
import LocationCard from '@/components/cards/company/LocationCard.vue';
import BaseCard from '@/components/cards/system/BaseCard.vue';
import ImageInput from '@/components/inputs/ImageInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
export default {
  name: 'LocationsList',
  components: { TextInput, DefaultButton, LocationCard, BaseCard, ImageInput, LoaderComponent },
  data() {
    return {
      newLocation: {
        image: '',
        address: '',
      },
      loading: false,
      loadingButton: false,
      reloadData: Date.now(),
    };
  },
  methods: {
    openAddPopupFN() {
      this.$router.push({
        name: 'add_location',
      });
    },
    clearData() {
      this.newLocation.address = '';
      this.newLocation.image = '';
      this.reloadData = Date.now();
    },

    handleImage(data) {
      this.newLocation.image = data;
    },
    addLocation() {
      this.loadingButton = true;
      this.$store
        .dispatch('addLocationAction', {
          isImage: !!this.newLocation.image,
          address: this.newLocation.address,
          company: this.$store.state.id,
          employees: 0,
        })
        .then((resLocations) => {
          if (resLocations.success) {
            if (this.newLocation.image) {
              this.newLocation.image.set('userId', resLocations.data.new._id);
              this.$store.dispatch('uploadImageAction', this.newLocation.image).then((res) => {
                if (res.success) {
                  let newLocation = resLocations.data.new;
                  newLocation.employeesCount = 0;
                  this.$store.commit('addLocation', newLocation);
                  this.loadingButton = false;
                  this.clearData();
                  this.$store.dispatch('showNotification', { message: resLocations.message, type: 'success' });
                }
              });
            } else {
              this.$store.commit('addLocation', resLocations.data.new);
              this.loadingButton = false;
              this.clearData();
              this.$store.dispatch('showNotification', { message: resLocations.message, type: 'success' });
            }
          } else {
            this.$store.dispatch('showNotification', { message: resLocations.response.data.message[0], type: 'error' });
            this.loadingButton = false;
          }
        });
    },
    openEditPopupFN(id) {
      this.$router.push({
        name: 'edit_location',
        params: {
          locationId: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.locations-list {
  width: 100%;
  height: 100%;

  &__container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 15px;
  }

  &__new-location-card {
    height: fit-content !important;
  }

  &__locations-card {
    overflow: auto;
    max-height: 100%;
    @include no-scroll;
  }

  &__locations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  &__new-location-wrapper {
  }

  &__new-location-text {
    font-size: 26px;
    display: block;
    margin: 25px 0 15px 7px;
    font-weight: 600;
  }

  &__new-location-input {
    margin-bottom: 10px;
  }

  &__new-location {
    :deep(.image-input__image) {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }

    :deep(.image-input__wrapper) {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: auto;
    }
  }

  &__label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 600;
  }
}
</style>

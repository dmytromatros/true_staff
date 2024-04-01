<template>
  <div class="location-card">
    <div class="base-card">
      <LoaderComponent v-if="loading" />
      <div v-if="!loading" class="location-card__container">
        <div class="location-card__img">
          <img v-if="imageUrl" :src="imageUrl" alt="" />
          <img v-else src="/img/profile-img.webp" alt="" />
        </div>
        <div class="location-card__info">
          <div class="location-card__name">{{ location.address }}</div>
          <div class="location-card__amount">Кількість працівників: {{ location.employeesCount }}</div>
        </div>
      </div>
      <div v-if="!loading" class="location-card__buttons">
        <div class="location-card__buttons-left">
          <CircleButtonVue class="location-card__button" icon="group" @action="viewLocationEmployees" title="Працівники" />
        </div>
        <div class="location-card__buttons-right">
          <CircleButtonVue class="location-card__button" icon="edit" @action="openEditPopupFN" />
          <CircleButtonVue class="location-card__button" icon="delete" :danger="true" @action="openConfirmPopup" />
        </div>
      </div>
    </div>

    <EditLocationPopup
      :isShown="editPopupOpen"
      @edited="getLocations"
      :id="location._id"
      @close="
        () => {
          this.editPopupOpen = false;
        }
      "
    />

    <ConfirmPopupVue
      :is-shown="isConfirming"
      :text="`Ти дійсно хочеш видали \'${location.address}\' із списку працівників?`"
      @close="isConfirming = false"
      @confirm="deleteLocationFn(location._id)"
    />

    <LocationEmployees :id="location._id" :is-shown="showLocationEmployees" @close="showLocationEmployees = false" />
  </div>
</template>

<script>
// import BaseCard from "@/components/cards/system/BaseCard.vue";
import EditLocationPopup from '@/components/popups/EditLocationPopup.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import CircleButtonVue from '@/components/buttons/CircleButton.vue';
import ConfirmPopupVue from '@/components/popups/ConfirmPopup.vue';
import LocationEmployees from '@/components/popups/LocationEmployees.vue';
export default {
  name: 'LocationCard',
  components: { EditLocationPopup, LoaderComponent, CircleButtonVue, LocationEmployees, ConfirmPopupVue },
  props: {
    location: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imageUrl: '',
      editPopupOpen: false,
      loading: true,
      showLocationEmployees: false,
      isConfirming: false,
    };
  },
  methods: {
    getLocations() {
      this.$emit('edited');
      this.getImage();
      this.editPopupOpen = false;
    },
    openEditPopupFN() {
      this.editPopupOpen = true;
    },
    openConfirmPopup() {
      this.isConfirming = true;
    },
    deleteLocationFn(id) {
      this.$store
        .dispatch('getDeleteLocationAction', {
          id,
        })
        .then((res) => {
          if (res.success) {
            this.$store.commit('deleteLocation', id);
            this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
          } else {
            this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
          }
        });
    },
    getImage() {
      this.$store
        .dispatch('getImageAction', { id: this.location._id })
        .then((res) => {
          if (res.success) {
            this.imageUrl = res.data;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    viewLocationEmployees() {
      this.showLocationEmployees = true;
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    if (this.location.isImage) {
      this.getImage();
    } else {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.location-card {
  width: 100%;
  height: 100%;

  &__container {
    display: flex;
    gap: 15px;
    align-items: center;
    background: $main-gradient;
    padding: 15px;
  }

  .base-card {
    border-radius: 8px;
    background: $white;
    overflow: hidden;
  }

  &__img {
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__amount {
    color: $white;
  }

  &__name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    white-space: nowrap;
    display: block;
    max-width: 215px;
    text-overflow: ellipsis;
    overflow: hidden;
    color: $white;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 15px;

    &-right {
      gap: 10px;
      display: flex;
    }
  }
}
</style>

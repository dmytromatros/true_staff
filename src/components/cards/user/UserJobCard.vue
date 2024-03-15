<template>
  <div class="user-job-card">
    <div class="user-job-card__container" :class="{ 'user-job-card__container--active': !job.deleted }">
      <LoaderComponent v-if="loading1 && loading2" />
      <div class="user-job-card__info" v-else>
        <div class="user-job-card__company"><span class="bold-text">Компанія: </span>"{{ companyName }}"</div>
        <div class="user-job-card__location"><span class="bold-text">Локація: </span>{{ locationName }}</div>
        <div class="user-job-card__position"><span class="bold-text">Посада: </span>{{ job.position }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/other/LoaderComponent.vue';

export default {
  name: 'UserJobCard',
  components: { LoaderComponent },
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      companyName: '',
      locationName: '',
      loading1: true,
      loading2: true,
    };
  },

  methods: {
    async getCompany(id) {
      // Зробіть метод асинхронним
      const response = await this.$store.dispatch('getCompanyAction', { id: id });
      if (response) {
        this.companyName = response.data.name; // Збережіть назву компанії в нове поле
        this.loading1 = false;
      } else {
        this.companyName = '-'; // Встановіть значення за замовчуванням, якщо немає відповіді
      }
    },

    async getLocation(id) {
      const response = await this.$store.dispatch('getLocationAction', { locationId: id });
      if (response) {
        this.locationName = response.data.address;
        this.loading2 = false;
      } else {
        this.locationName = '-';
      }
    },
  },
  mounted() {
    this.getCompany(this.job.companyId);
    this.getLocation(this.job.locationId);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.user-job-card {
  &__container {
    background-color: rgba($color: $light-grey, $alpha: 0.3);
    @include main-shadow;
    padding: 25px 35px;
    border-radius: $border-radius;
    overflow: auto;
    display: flex;
    gap: 15px;
    min-height: 100px;
    width: fit-content;

    &--active {
      background-color: rgba($color: $green-color, $alpha: 0.2);
    }
  }

  &__img {
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include main-shadow;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__company {
    font-size: 20px;
  }

  &__location {
    font-size: 20px;
  }

  .bold-text {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }
}
</style>

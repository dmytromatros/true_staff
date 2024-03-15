<template>
  <div class="receive-request-card">
    <div class="receive-request-card__to" v-if="!isUser">
      Кому: <span class="receive-request-card__bold">{{ employeeName }}</span>
    </div>
    <div class="receive-request-card__to" v-else>
      Компанія: <span class="receive-request-card__bold">{{ companyName }}</span>
    </div>
    <div class="receive-request-card__location">
      Локація: <span class="receive-request-card__bold">{{ locationName }}</span>
    </div>
    <div class="receive-request-card__location">
      Посада: <span class="receive-request-card__bold">{{ position }}</span>
    </div>
    <div class="receive-request-card__message">
      Повідомлення:
      <span class="receive-request-card__bold">{{ message }}</span>
    </div>
    <div class="receive-request-card__status">
      Статус: <span class="receive-request-card__bold">{{ status }}</span>
    </div>

    <DefaultButton v-if="status !== 'Очікується на відповідь'" label="Видалити" @action="handleDeleteRequest" :danger="true" :loading="loadingButton" />
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue';

export default {
  name: 'SentRequest',
  components: { DefaultButton },
  props: {
    to: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingButton: false,
      companyName: '',
      locationName: '',
      employeeName: '',
    };
  },
  methods: {
    handleDeleteRequest() {
      this.loadingButton = true;
      this.$emit('delete-request');
    },
    async getCompany(id) {
      // Зробіть метод асинхронним
      const response = await this.$store.dispatch('getCompanyAction', { id: id });
      if (response) {
        this.companyName = response.data.name; // Збережіть назву компанії в нове поле
      } else {
        this.companyName = '-'; // Встановіть значення за замовчуванням, якщо немає відповіді
      }
    },

    async getLocation(id) {
      const response = await this.$store.dispatch('getLocationAction', { locationId: id });
      if (response) {
        this.locationName = response.data.address;
      } else {
        this.locationName = '-';
      }
    },

    async getEmployee(id) {
      const response = await this.$store.dispatch('getUserAction', { id: id });
      if (response) {
        this.employeeName = `${response.data.name} ${response.data.surname}`;
      } else {
        this.employeeName = '-';
      }
    },
  },
  mounted() {
    if (this.isUser) {
      this.getCompany(this.to);
    } else {
      this.getEmployee(this.to);
    }

    this.getLocation(this.location);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.receive-request-card {
  border-radius: 15px;
  padding: 15px;
  @include main-shadow;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__bold {
    font-weight: 600;
  }
}
</style>

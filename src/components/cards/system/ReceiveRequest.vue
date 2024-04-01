<template>
  <div class="receive-request-card">
    <div class="receive-request-card__from">
      Від: <span class="receive-request-card__bold">{{ isUser ? companyName : employeeName }}</span>
    </div>
    <div class="receive-request-card__location">
      Локація: <span class="receive-request-card__bold">{{ locationName }}</span>
    </div>
    <div class="receive-request-card__position">
      Посада: <span class="receive-request-card__bold">{{ position }}</span>
    </div>
    <div class="receive-request-card__position">
      Повідомлення:
      <span class="receive-request-card__bold">{{ message }}</span>
    </div>

    <div class="receive-request-card__buttons" v-if="editable">
      <DefaultButton class="receive-request-card__button" label="Прийняти" :success="true" @action="handleAcceptRequest"
        :loading="loadingAcceptButton" />
      <DefaultButton class="receive-request-card__button" label="Відхилити" :danger="true" @action="handleRejectRequest"
        :loading="loadingRejectButton" />
    </div>

    <div v-else>
      <div class="receive-request-card__delete">Ти відповів на цей запит.</div>
      <DefaultButton class="receive-request-card__button" label="Видалити" :danger="true" @action="handleDeleteRequest"
        :loading="loadingDeleteButton" />
    </div>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue';

export default {
  name: 'ReceiveRequest',
  components: { DefaultButton },
  props: {
    from: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: true,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingDeleteButton: false,
      loadingAcceptButton: false,
      loadingRejectButton: false,
      companyName: '',
      locationName: '',
      employeeName: '',
    };
  },
  methods: {
    handleAcceptRequest() {
      this.loadingAcceptButton = true;
      this.$emit('accept-request');
    },
    handleRejectRequest() {
      this.loadingRejectButton = true;
      this.$emit('reject-request');
    },
    handleDeleteRequest() {
      this.loadingDeleteButton = true;
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
      this.getCompany(this.from);
    } else {
      this.getEmployee(this.from);
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

  &__buttons {
    display: flex;
    gap: 15px;
  }

  &__button {
    flex: 1;
  }

  &__delete {
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>

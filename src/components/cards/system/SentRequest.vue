<template>
  <div class="receive-request-card">
    <div class="receive-request-card__to">
      Кому: <span class="receive-request-card__bold">{{ to }}</span>
    </div>
    <div class="receive-request-card__location">
      Локація: <span class="receive-request-card__bold">{{ location }}</span>
    </div>
    <div class="receive-request-card__location">
      Позиція: <span class="receive-request-card__bold">{{ position }}</span>
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
  },
  data() {
    return {
      loadingButton: false,
    };
  },
  methods: {
    handleDeleteRequest() {
      this.loadingButton = true;
      this.$emit('delete-request');
    },
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

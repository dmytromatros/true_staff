<template>
  <div class="receive-request-card">
    <div class="receive-request-card__from">
      Від: <span class="receive-request-card__bold">{{ from }}</span>
    </div>
    <div class="receive-request-card__location">
      Локація: <span class="receive-request-card__bold">{{ location }}</span>
    </div>
    <div class="receive-request-card__position">
      позиція: <span class="receive-request-card__bold">{{ position }}</span>
    </div>
    <div class="receive-request-card__position">
      Повідомлення:
      <span class="receive-request-card__bold">{{ message }}</span>
    </div>

    <div class="receive-request-card__buttons" v-if="editable">
      <DefaultButton class="receive-request-card__button" label="Прийняти" :success="true" @action="handleAcceptRequest" :loading="loadingAcceptButton" />
      <DefaultButton class="receive-request-card__button" label="Відхилити" :danger="true" @action="handleRejectRequest" :loading="loadingRejectButton" />
    </div>

    <div v-else>
      <div class="receive-request-card__delete">Ви відповіли на цей запит.</div>
      <DefaultButton class="receive-request-card__button" label="Видалити" :danger="true" @action="handleDeleteRequest" :loading="loadingDeleteButton" />
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
  },
  data() {
    return {
      loadingDeleteButton: false,
      loadingAcceptButton: false,
      loadingRejectButton: false,
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

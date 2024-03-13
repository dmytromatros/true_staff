<template>
  <DefaultPopup :is-shown="isShown" confirmLabel="Видалити" title="Видалення користувача" @close="close" @confirm="confirm">
    <template v-slot:body>
      <span class="confirm-text">{{ text }}</span>
    </template>
  </DefaultPopup>
</template>

<script>
import DefaultPopup from '@/components/popups/DefaultPopup.vue';
export default {
  name: 'ConfirmPopup',
  components: { DefaultPopup },
  props: {
    text: {
      type: String,
      default: '',
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close');
    },

    confirm() {
      this.$emit('confirm');
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-text {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
</style>

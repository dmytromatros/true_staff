<template>
  <form class="search-by-id" @submit.prevent="find(id)">
    <TextInput placeholder="Введіть ID користувача" v-model="id" />
    <DefaultButton label="Шукати" type="submit" :loading="loading" :disabled="!Boolean(id.length)" />
  </form>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import DefaultButton from '../buttons/DefaultButton.vue';
export default {
  name: 'SearchById',
  components: { TextInput, DefaultButton },
  props: {
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      id: '',
    };
  },
  computed: {},
  methods: {
    find(id) {
      this.$emit('find', id);
      this.id = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.search-by-id {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

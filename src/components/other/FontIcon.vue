<template>
  <span class="material-symbols-outlined" :style="`font-size: ${fontSize}px`">
    {{ icon }}
  </span>
</template>

<script>
export default {
  name: 'FontIcon',
  components: {},
  props: {
    icon: {
      type: String,
    },
    fontSize: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
$material-symbols-font-path: '~material-symbols/';
@import 'material-symbols';

.material-symbols-outlined {
  user-select: none;
  font-size: v-bind(fontSize);
}
</style>

<template>
  <div class="starts-count" :class="{ selectable }">
    <FontIcon class="starts-count__star" icon="star_rate" v-for="idx in 5" :key="idx" :class="{ 'starts-count__star--selected': idx < dataCount + 1 }" @click="rate(idx)" />
  </div>
</template>

<script>
import FontIcon from '@/components/other/FontIcon.vue';
export default {
  name: 'StartsCount',
  components: { FontIcon },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataCount: this.count,
    };
  },
  watch: {
    count() {
      this.dataCount = this.count;
    },
  },
  computed: {},
  methods: {
    rate(index) {
      this.dataCount = index;
      this.$emit('rate', index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.starts-count {
  display: flex;
  gap: 10px;
  pointer-events: none;

  &.selectable {
    pointer-events: all;
  }

  &__star {
    font-size: 30px;
    cursor: pointer;
    transition: 0.25s ease-in-out all;
    color: $placeholder-color;

    &--selected {
      color: $star-yellow-color;
    }
  }
}
</style>

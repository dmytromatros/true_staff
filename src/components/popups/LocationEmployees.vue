<template>
  <DefaultPopup :is-shown="isShown" confirmLabel="Видалити" title="Видалення користувача" @close="close" :show-confirm-button="false">
    <template v-slot:body>
      <div class="location-employees" v-if="employees.length">
        <SmallUserPreviewCard v-for="employee in employees" :key="employee.name" :name="`${employee.name} ${employee.surname}`" :id="employee._id" :unique-id="employee.uniqueId" />
      </div>
      <div v-else class="confirm-text">Не додано працівників</div>
    </template>
  </DefaultPopup>
</template>

<script>
import DefaultPopup from '@/components/popups/DefaultPopup.vue';
import SmallUserPreviewCard from '@/components/cards/user/SmallUserPreviewCard.vue';
export default {
  name: 'LocationEmployees',
  components: { DefaultPopup, SmallUserPreviewCard },
  props: {
    id: {
      type: String,
      default: '',
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      employees: [],
    };
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close');
    },
  },
  mounted() {
    this.$store
      .dispatch('getLocationEmployeesAction', { id: this.id })
      .then((res) => {
        if (res.success) {
          this.employees = res.data;
        }
      })
      .finally(() => {
        this.loading = false;
      });
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

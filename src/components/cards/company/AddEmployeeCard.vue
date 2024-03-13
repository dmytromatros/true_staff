<template>
  <div class="add-employee-card">
    <BaseCard class="add-employee-card__new-card">
      <template v-slot:body>
        <div class="add-employee-card__new-card-title">Додати нового співробітника</div>
        <SelectInput class="add-employee-card__input" placeholder="Локація" :options="locations" v-model="newEmployee.location" />
        <TextInput class="add-employee-card__input" placeholder="ID користувача" type="text" v-model="newEmployee.userId" />
        <TextInput class="add-employee-card__input" placeholder="Повідомлення" type="text" v-model="newEmployee.message" :textarea="true" />
        <TextInput class="add-employee-card__input" placeholder="Посада" type="text" v-model="newEmployee.position" />

        <DefaultButton
          class="add-employee-card__button"
          label="Add employee"
          @action="addEmployee"
          :loading="loadingButton"
          :disabled="!newEmployee.location || !newEmployee.userId || !newEmployee.message || !newEmployee.position"
        />
      </template>
    </BaseCard>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import BaseCard from '@/components/cards/system/BaseCard.vue';
export default {
  name: 'AddEmployeeCard',
  components: { DefaultButton, TextInput, SelectInput, BaseCard },
  data() {
    return {
      newEmployee: {
        location: '',
        position: '',
        message: '',
        userId: '',
      },
      loadingButton: false,
      locations: [],
    };
  },
  computed: {
    queryLocationId() {
      return this.$route.query.locationId;
    },
  },
  methods: {
    async addEmployee() {
      this.loadingButton = true;
      this.$store
        .dispatch('checkUserAction', { id: this.newEmployee.userId || 'test' })
        .then(async (res) => {
          if (res.success) {
            const employeeName = await this.getUserName(res.data._id);
            const companyName = this.$store.state.company.name;
            let data = {
              companyId: this.$store.state.id,
              companyName: companyName,
              locationId: this.newEmployee.location,
              locationAddress: this.getLocationAddress(this.newEmployee.location),
              employeeId: res.data._id,
              employeeName: employeeName,
              message: this.newEmployee.message,
              position: this.newEmployee.position,
              type: 1,
            };

            this.$store.dispatch('addCompanyRequestAction', data).then((res) => {
              if (res.success) {
                this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
                this.$emit('request-sent');
              } else {
                this.$store.dispatch('showNotification', { message: res.response.data.message, type: 'error' });
              }
            });
          } else {
            this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
          }
        })
        .finally(() => {
          this.loadingButton = false;
        });
    },

    async getUserName(id) {
      try {
        const res = await this.$store.dispatch('getUserAction', { id });
        if (res.success) {
          return `${res.data.name} ${res.data.surname}`;
        }
      } catch (error) {
        console.error(error);
        return '';
      }
    },

    getLocationAddress(id) {
      let address = '';
      this.$store.state.locations.forEach((loc) => {
        if (loc._id == id) {
          address = loc.address;
        }
      });
      return address;
    },
  },
  watch: {
    '$store.state.locations.length'() {
      this.locations = [];
      this.$store.state.locations.forEach((loc) => {
        if (loc._id == this.queryLocationId) {
          this.newEmployee.location = loc._id;
          this.$emit('open');
        }
        this.locations.push({
          value: loc._id,
          label: loc.address,
        });
      });
    },
  },
  mounted() {
    this.locations = [];
    this.$store.state.locations.forEach((loc) => {
      if (loc._id == this.queryLocationId) {
        this.newEmployee.location = loc._id;
        this.$emit('open');
      }

      this.locations.push({
        value: loc._id,
        label: loc.address,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.add-employee-card {
  width: 0px;
  overflow: hidden;
  transition: 0.25s ease-in-out all;

  &__new-card {
    height: fit-content !important;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: none;
    border-top-left-radius: 0;

    @include no-scroll;

    &:hover {
      box-shadow: none;
    }
  }

  &__new-card-title {
    padding: 0 10px;
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 25px;
    text-wrap: balance;
  }

  &__button {
    white-space: nowrap;
  }
}
</style>

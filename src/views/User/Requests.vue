<template>
  <div class="requests">
    <div class="requests__container">
      <div class="requests__top">
        <div class="requests__receive">
          <div class="requests__receive-title">Отримані</div>
          <div class="requests__receive-content">
            <LoaderComponent v-if="loading" />
            <div v-else v-for="(rec, key) in receive" :key="key">
              <ReceiveRequest
                :from="rec.companyId"
                :location="rec.locationId"
                :position="rec.position"
                :message="rec.message"
                :editable="!rec.rejected && !rec.accepted"
                @accept-request="acceptReceiveRequest(rec._id)"
                @reject-request="rejectReceiveRequest(rec._id)"
                @delete-request="deleteReceiveRequest(rec._id)"
                :is-user="true"
              />
            </div>
            <div v-if="!Object.keys(receive).length && !loading" class="requests__receive-label">Немає отриманих запитів</div>
          </div>
        </div>
        <div class="requests__receive">
          <div class="requests__receive-title">Відправлені</div>
          <div class="requests__receive-content">
            <LoaderComponent v-if="loading" />
            <div v-else v-for="(rec, key) in sent" :key="key">
              <SentRequest
                :to="rec.companyId"
                :location="rec.locationId"
                :position="rec.position"
                :message="rec.message"
                @delete-request="deleteSentRequest(rec._id)"
                :status="sentStatus(rec.rejected, rec.accepted)"
                :isUser="true"
              />
            </div>
            <div v-if="!Object.keys(sent).length && !loading" class="requests__receive-label">Немає відправлених запитів</div>
          </div>
        </div>
      </div>
      <div class="requests__bottom" v-if="isEmployee" :class="{ 'requests__bottom--active': opened }">
        <button class="requests__add-button" @click="openAddNew">
          <FontIcon v-if="opened" icon="disabled_by_default" font-size="34px" />
          <FontIcon v-else icon="edit_square" font-size="34px" />
        </button>
        <div class="requests__add-new">
          <div class="requests__receive-title--add">Відравити запит</div>
          <div class="requests__receive-content">
            <form class="user-settings__organization" @submit.prevent="sendRequest">
              <SelectInput class="requests__input" placeholder="Компанія" v-model="company" :options="companyList" :searchable="true" />
              <SelectInput class="requests__input" placeholder="Локація" v-model="location" :options="locationList" :disabled="!company" :searchable="true" />
              <TextInput class="requests__input" placeholder="Посада" v-model="position" :disabled="!location" />
              <TextInput class="requests__input" placeholder="Повідомлення" :textarea="true" v-model="message" :disabled="!position" />
              <DefaultButton class="requests__input" label="Відправити запит" type="submit" :disabled="!company || !location || !position || !message" :loading="loadingButton" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectInput from '@/components/inputs/SelectInput.vue';
import ReceiveRequest from '@/components/cards/system/ReceiveRequest.vue';
import SentRequest from '@/components/cards/system/SentRequest.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import DefaultButton from '@/components/buttons/DefaultButton.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import FontIcon from '@/components/other/FontIcon.vue';
export default {
  name: 'UserRequests',
  data() {
    return {
      sent: {},
      receive: {},
      page: 1,
      user: this.$store.state.user,
      isEmployee: this.$store.state.user.isEmployee,
      // Request data
      company: '',
      location: '',
      position: '',
      message: '',
      ////////////
      companyList: [],
      locationList: [],
      enteredCompanies: [],
      loading: true,
      loadingButton: false,
      opened: false,
    };
  },
  components: {
    ReceiveRequest,
    SentRequest,
    SelectInput,
    TextInput,
    DefaultButton,
    LoaderComponent,
    FontIcon,
  },
  methods: {
    sentStatus(rejected, accepted) {
      if (accepted) return 'Підтверджено';
      else if (rejected) return 'Відхилено';
      else return 'Очікується на відповідь';
    },
    acceptReceiveRequest(id) {
      this.$store.dispatch('acceptRequestAction', { id: id, type: 2 }).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
          this.$store.commit('setReceiveRequestsCount', this.$store.state.receiveRequestCount - 1);
          this.getAllRequest();
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    rejectReceiveRequest(id) {
      this.$store.dispatch('rejectRequestAction', { id: id, type: 2 }).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
          this.$store.commit('setReceiveRequestsCount', this.$store.state.receiveRequestCount - 1);
          this.getAllRequest();
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    deleteReceiveRequest(id) {
      this.$store.dispatch('userDeleteRequestAction', { id }).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
          this.$store.commit('setReceiveRequestsCount', this.$store.state.receiveRequestCount - 1);
          this.getAllRequest();
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    deleteSentRequest(id) {
      this.$store.dispatch('userDeleteRequestAction', { id }).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
          this.$store.commit('setReceiveRequestsCount', this.$store.state.receiveRequestCount - 1);
          this.getAllRequest();
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    getAllRequest() {
      this.$store
        .dispatch('getUserRequestListAction', { id: this.$store.state.id })
        .then((res) => {
          if (res.success) {
            this.sent = { ...res.data.sent };
            this.receive = { ...res.data.receive };
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // To send requests

    getCompanyList() {
      this.$store.dispatch('getCompanyListAction').then((res) => {
        if (res.success) {
          for (const key in res.data) {
            if (Object.hasOwnProperty.call(res.data, key)) {
              this.companyList.push({
                label: res.data[key].name,
                value: res.data[key]._id,
              });
            }
          }
        }
      });
    },
    getLocationList(id) {
      this.locationList = [];
      this.$store.dispatch('getLocationsAction', { id }).then((res) => {
        if (res.success) {
          for (const key in res.data) {
            if (Object.hasOwnProperty.call(res.data, key)) {
              this.locationList.push({
                label: res.data[key].address,
                value: res.data[key]._id,
              });
            }
          }
        }
      });
    },
    async sendRequest() {
      this.loadingButton = true;
      const data = {
        companyId: this.company,
        locationId: this.location,
        position: this.position,
        message: this.message,
        employeeId: this.user._id,
        type: 2,
      };

      this.$store
        .dispatch('addUserRequestAction', data)
        .then((res) => {
          if (res.success) {
            this.$store.dispatch('showNotification', { message: res.message, type: 'success' });
            this.getAllRequest();
          } else {
            this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
          }
        })
        .finally(() => {
          this.loadingButton = false;
          this.clearData();
        });
    },

    openAddNew() {
      this.opened = !this.opened;
    },

    clearData() {
      this.company = '';
      this.location = '';
      this.position = '';
      this.message = '';
    },
  },
  mounted() {
    this.getAllRequest();
    this.getCompanyList();
  },
  watch: {
    company() {
      this.getLocationList(this.company);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.requests {
  height: 100%;
  width: 100%;

  &__container {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 25px;
  }

  &__top {
    display: flex;
    // flex-direction: column;
    flex: 1;
    width: 100%;
    gap: 25px;
    height: min-content;
    min-height: 300px;
    max-height: 100%;
  }

  &__receive {
    flex: 2;
    border-radius: $border-radius;
    @include main-shadow;
    overflow: hidden;
    background-color: $white;
    display: flex;
    flex-direction: column;

    &-label {
      text-align: center;
      margin-top: 15%;
      font-weight: 600;
      opacity: 0.7;
    }
  }

  &__receive-title {
    @include main-title;

    &--add {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 20px;
      padding: 20px 15px;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  &__receive-content {
    overflow: auto;
    padding: 25px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;

    @include no-scroll;
  }

  &__bottom {
    width: fit-content;
    overflow: hidden;
    display: flex;
    height: 100%;

    @media (max-height: 714px) {
      height: 100%;
    }

    & > * {
      white-space: nowrap;
    }
  }

  &__bottom--active {
    height: 100%;
  }

  &__bottom--active &__add-new {
    width: 300px;
  }

  &__add-new {
    width: 0px;
    height: fit-content;
    border-radius: 0 $border-radius $border-radius $border-radius;
    background-color: $white;
    transition: 0.25s ease-in-out all;
  }

  &__input {
    margin-bottom: 20px;
  }

  &__add-button {
    width: fit-content;
    height: fit-content;
    padding: 5px 15px;
    padding-top: 10px;
    border-radius: 15px 0 0 15px;
    background: $white;
    transition: 0.25s ease-in-out all;
    color: $main-color;

    &:hover {
      color: $second-color;
    }
  }
}
</style>

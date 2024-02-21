<template>
  <div class="requests">
    <div class="requests__container">
      <div class="requests__top">
        <div class="requests__receive">
          <div class="requests__receive-title">Отримані</div>
          <div class="requests__receive-content">
            <LoaderComponent v-if="loading" />
            <div v-else v-for="(rec, key) in receive" :key="key">
              <ReceiveRequest :from="rec.companyName" :location="rec.locationAddress" :position="rec.position"
                :message="rec.message" :editable="!rec.rejected && !rec.accepted"
                @accept-request="acceptReceiveRequest(rec._id)" @reject-request="rejectReceiveRequest(rec._id)"
                @delete-request="deleteReceiveRequest(rec._id)" />
            </div>
          </div>
        </div>
        <div class="requests__receive">
          <div class="requests__receive-title">Відправлені</div>
          <div class="requests__receive-content">
            <LoaderComponent v-if="loading" />
            <div v-else v-for="(rec, key) in sent" :key="key">
              <SentRequest :to="rec.companyName" :location="rec.locationAddress" :position="rec.position"
                :message="rec.message" @delete-request="deleteSentRequest(rec._id)"
                :status="sentStatus(rec.rejected, rec.accepted)" />
            </div>
          </div>
        </div>
      </div>
      <div class="requests__bottom" :class="{ 'requests__bottom--active': opened }">
        <button class="requests__add-button" @click="openAddNew">
          <FontIcon v-if="opened" icon="disabled_by_default" font-size="34px" />
          <FontIcon v-else icon="edit_square" font-size="34px" />
        </button>
        <div class="requests__add-new">
          <div class=" requests__receive-title--add">Відравити запит</div>
          <div class="requests__receive-content">
            <div class="user-settings__companies">
              <div class="user-settings__companies-item" v-for="(company, key) in enteredCompanies" :key="key">
                <div>Name: {{ company.companyName }}</div>
                <div>Faired: {{ company.deleted }}</div>
                <div>Position: {{ company.position }}</div>
              </div>
            </div>

            <div v-if="isEmployee" class="user-settings__organization">
              <div>
                <SelectInput class="requests__input" placeholder="Компанія" v-model="company" :options="companyList" />
                <div>
                  <SelectInput class="requests__input" placeholder="Локація" v-model="location" :options="locationList"
                    :disabled="!company" />
                  <div>
                    <TextInput class="requests__input" placeholder="Позиція" v-model="position" :disabled="!location" />
                    <div>
                      <TextInput class="requests__input" placeholder="Повідомлення" :textarea="true" v-model="message"
                        :disabled="!position" />
                      <DefaultButton class="requests__input" label="Відправити запит" @action="sendRequest"
                        :disabled="!company || !location || !position || !message" :loading="loadingButton" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectInput from "@/components/inputs/SelectInput.vue";
import ReceiveRequest from "@/components/cards/system/ReceiveRequest.vue";
import SentRequest from "@/components/cards/system/SentRequest.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import LoaderComponent from "@/components/other/LoaderComponent.vue"
import FontIcon from "@/components/other/FontIcon.vue";
export default {
  name: "UserRequests",
  data() {
    return {
      sent: {},
      receive: {},
      page: 1,
      user: {},
      isEmployee: false,
      // Request data
      company: "",
      location: "",
      position: "",
      message: "",
      ////////////
      companyList: [],
      locationList: [],
      enteredCompanies: [],
      loading: true,
      loadingButton: false,
      opened: false
    };
  },
  components: {
    ReceiveRequest,
    SentRequest,
    SelectInput,
    TextInput,
    DefaultButton,
    LoaderComponent,
    FontIcon
  },
  methods: {
    sentStatus(rejected, accepted) {
      if (accepted) return "Підтверджено";
      else if (rejected) return "Відхилено";
      else return "Очікується на відповідь";
    },
    acceptReceiveRequest(id) {
      this.$store
        .dispatch("acceptRequestAction", { id: id, type: 2 })
        .then((res) => {
          if (res.success) this.getAllRequest();
        });
    },
    rejectReceiveRequest(id) {
      this.$store
        .dispatch("rejectRequestAction", { id: id, type: 1 })
        .then((res) => {
          if (res.success) this.getAllRequest();
        });
    },
    deleteReceiveRequest(id) {
      this.$store.dispatch("userDeleteRequestAction", { id }).then((res) => {
        if (res.success) this.getAllRequest();
      });
    },
    deleteSentRequest(id) {
      this.$store.dispatch("userDeleteRequestAction", { id }).then((res) => {
        if (res.success) this.getAllRequest();
      });
    },
    getAllRequest() {
      this.$store
        .dispatch("getUserRequestListAction", { id: this.$route.params.id })
        .then((res) => {
          if (res.success) {
            this.sent = { ...res.data.sent };
            console.log(this.sent);
            this.receive = { ...res.data.receive };
          }
        }).finally(() => {
          this.loading = false;
        });
    },

    // To send requests

    getCompanyList() {
      this.$store.dispatch("getCompanyListAction").then((res) => {
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
      this.$store.dispatch("getLocationsAction", { id }).then((res) => {
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
    async getCompanyName(id) {
      try {
        const res = await this.$store.dispatch("getCompanyAction", { id });
        if (res.success) {
          return res.data.name;
        }
      } catch (error) {
        console.error(error);
        // Handle error as needed, e.g., return a default value or throw an error
        return "";
      }
    },
    async getLocationAddress(id) {
      try {
        const res = await this.$store.dispatch("getLocationAction", {
          locationId: id,
        });
        if (res.success) {
          return res.data.address;
        }
      } catch (error) {
        console.error(error);
        // Handle error as needed, e.g., return a default value or throw an error
        return "";
      }
    },
    async sendRequest() {
      this.loadingButton = true
      const companyName = await this.getCompanyName(this.company);
      const locationAddress = await this.getLocationAddress(this.location);

      const data = {
        companyId: this.company,
        companyName: companyName,
        locationId: this.location,
        locationAddress: locationAddress,
        position: this.position,
        message: this.message,
        employeeId: this.user._id,
        employeeName: `${this.user.name} ${this.user.surname}`,
        type: 2,
      };

      this.$store.dispatch("addUserRequestAction", data).then((res) => {
        if (res.success) {
          this.$store.dispatch('showNotification', { message: res.message, type: 'success' })
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
        }
      }).finally(() => {
        this.loadingButton = false
      });
    },

    openAddNew() {
      this.opened = !this.opened;
    }
  },
  mounted() {
    this.getAllRequest();
    this.getCompanyList();
    this.$store
      .dispatch("getUserAction", { id: this.$route.params.id })
      .then((res) => {
        if (res.success) {
          this.isEmployee = res.data.isEmployee;
          this.user = { ...res.data };
        }
      });
  },
  watch: {
    company() {
      this.getLocationList(this.company);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.requests {
  height: 100%;
  width: 100%;
  padding: 15px;

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
  }

  &__receive {
    flex: 2;
    border-radius: $border-radius;
    @include main-shadow;
    overflow: hidden;
    background-color: $white;
    display: flex;
    flex-direction: column;
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
  }

  &__bottom {
    width: fit-content;
    overflow: hidden;
    display: flex;
    height: 100%;

    @media (max-height: 714px) {
      height: 100%;
    }

    &>* {
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
    width: 0;
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

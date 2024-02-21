<template>
  <div class="requests">
    <div class="requests__container">
      <div class="requests__top">
        <div class="requests__receive">
          <div class="requests__receive-title">Отримані</div>
          <LoaderComponent v-if="loading" />
          <div v-else>
            <div v-if="!isReceive" class="requests__receive-label">Немає отриманих запитів</div>
            <div v-for="(rec, key) in receive" :key="key">
              <ReceiveRequest :from="rec.employeeName" :location="rec.locationAddress" :position="rec.position"
                :editable="!rec.rejected && !rec.accepted" :message="rec.message"
                @accept-request="acceptReceiveRequest(rec._id)" @reject-request="rejectReceiveRequest(rec._id)"
                @delete-request="deleteReceiveRequest(rec._id)" />
            </div>
          </div>
        </div>
        <div class="requests__receive">
          <div class="requests__receive-title">Відправлені</div>
          <div class="requests__receive-content">
            <LoaderComponent v-if="loading" />
            <div v-else>
              <div v-if="!isSent" class="requests__receive-label">Немає відправлених запитів</div>
              <div v-for="(rec, key) in sent" :key="key">
                <SentRequest :to="rec.employeeName" :location="rec.locationAddress" :position="rec.position"
                  @delete-request="deleteSentRequest(rec._id)" :status="sentStatus(rec.rejected, rec.accepted)" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ReceiveRequest from "@/components/cards/system/ReceiveRequest.vue";
import SentRequest from "@/components/cards/system/SentRequest.vue";
import LoaderComponent from "@/components/other/LoaderComponent.vue"
export default {
  name: "UserRequests",
  data() {
    return {
      sent: {},
      receive: {},
      loading: true,
      isSent: true,
      isReceive: true
    };
  },
  components: { ReceiveRequest, SentRequest, LoaderComponent },
  methods: {
    sentStatus(rejected, accepted) {
      if (accepted) return "Підтверджено";
      else if (rejected) return "Відхилено";
      else return "Очікується на відповідь";
    },
    acceptReceiveRequest(id) {
      this.$store
        .dispatch("acceptRequestAction", { id: id, type: 1 })
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
      this.$store.dispatch("companyDeleteRequestAction", { id }).then((res) => {
        if (res.success) this.getAllRequest();
      });
    },
    deleteSentRequest(id) {
      this.$store.dispatch("companyDeleteRequestAction", { id }).then((res) => {
        if (res.success) this.getAllRequest();
      });
    },
    getAllRequest() {
      this.$store
        .dispatch("getCompanyRequestListAction", { id: this.$route.params.id })
        .then((res) => {
          if (res.success) {
            if (res.data.sent.length) {
              this.isSent = true
            } else {
              this.isSent = false
            }

            if (res.data.receive.length) {
              this.isReceive = true
            } else {
              this.isReceive = false
            }
            this.sent = { ...res.data.sent };
            this.receive = { ...res.data.receive };
          }
        }).finally(() => {
          this.loading = false
        });
    },
  },
  mounted() {
    this.getAllRequest();
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

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
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


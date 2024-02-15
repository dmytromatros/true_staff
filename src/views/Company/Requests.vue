<template>
  <div class="requests">
    <div class="requests__container">
      <div class="requests__receive" v-if="page == 1">
        <h2>Received:</h2>
        <div v-for="(rec, key) in receive" :key="key">
          <ReceiveRequest :from="rec.employeeName" :location="rec.locationAddress" :position="rec.position"
            :editable="!rec.rejected && !rec.accepted" :message="rec.message"
            @accept-request="acceptReceiveRequest(rec._id)" @reject-request="rejectReceiveRequest(rec._id)"
            @delete-request="deleteReceiveRequest(rec._id)" />
        </div>
      </div>
      <div class="requests__receive" v-if="page == 2">
        <h2>Sent:</h2>
        <div v-for="(rec, key) in sent" :key="key">
          {{ rec }}
          <SentRequest :to="rec.employeeName" :location="rec.locationAddress" :position="rec.position"
            @delete-request="deleteSentRequest(rec._id)" :status="sentStatus(rec.rejected, rec.accepted)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReceiveRequest from "@/components/cards/system/ReceiveRequest.vue";
import SentRequest from "@/components/cards/system/SentRequest.vue";
export default {
  name: "UserRequests",
  data() {
    return {
      sent: {},
      receive: {},
      page: 2,
    };
  },
  components: { ReceiveRequest, SentRequest },
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
            this.sent = { ...res.data.sent };
            this.receive = { ...res.data.receive };
          }
        });
    },
  },
  mounted() {
    this.getAllRequest();
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="search-card">
    <BaseCard>
      <template v-slot:body>
        <div class="search-card__content">
          <SelectInput
            class="requests__input"
            label="Компанія"
            v-model="searchInfo.company"
            :options="companyList"
          />

          <SelectInput
            class="requests__input"
            label="Локація"
            :disabled="!searchInfo.company"
            v-model="searchInfo.location"
            :options="locationList"
          />

          <SelectInput
            label="Робітник"
            :disabled="!searchInfo.location"
            v-model="searchInfo.user"
            :options="users"
          />

          <TextInput
            label="Залиште відгук"
            :disabled="!searchInfo.user"
            v-model="searchInfo.message"
            :textarea="true"
          />

          <DefaultButton
            class="search-card__button"
            label="Залишити відгук"
            @click="sendReview"
            :disabled="!searchInfo.message"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from "@/components/cards/BaseCard.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
export default {
  name: "SearchCard",
  components: {
    BaseCard,
    SelectInput,
    TextInput,
    DefaultButton,
  },
  data() {
    return {
      searchInfo: {
        company: "",
        location: "",
        user: "",
        message: "",
      },
      companyList: [],
      locationList: [],
      users: [],
    };
  },
  methods: {
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
    getUserList(location) {
      this.$store.dispatch("getEmployeesAction", { location }).then((res) => {
        if (res.success) {
          for (const key in res.data) {
            if (Object.hasOwnProperty.call(res.data, key)) {
              if (res.data[key]._id !== this.$route.params.id)
                this.users.push({
                  label: `${res.data[key].name} ${res.data[key].surname}`,
                  value: res.data[key]._id,
                });
            }
          }
        }
      });
    },
    sendReview() {
      console.log("ll");
    },
  },
  watch: {
    "searchInfo.company"() {
      this.getLocationList(this.searchInfo.company);
    },
    "searchInfo.location"() {
      this.getUserList(this.searchInfo.location);
    },
    "searchInfo.user"() {
      this.$emit("selected", this.searchInfo);
    },
  },
  mounted() {
    this.getCompanyList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.search-card {
  height: 100%;
  width: 100%;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__button {
    margin-top: 20px;
  }
}
</style>

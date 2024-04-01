<template>
  <div class="search-card">
    <LoaderComponent v-if="loading" />
    <div v-else class="search-card__container" id="tour-step-search">
      <CustomSwitch :options="{ Компанія: 1, ID: 2, 'Ім\'я': 3 }" v-model="page" />
      <div class="search-card__company" v-if="page === 1">
        <BaseCard style="overflow: visible">
          <template v-slot:body>
            <div class="search-card__content">
              <SelectInput class="requests__input" placeholder="Категорія" v-model="searchInfo.category" :options="companiesCategories" :searchable="true" />
              <SelectInput class="requests__input" placeholder="Компанія" v-model="searchInfo.company" :options="companyList" :searchable="true" />

              <SelectInput
                class="requests__input"
                placeholder="Локація"
                :disabled="!searchInfo.company || !locationList.length"
                v-model="searchInfo.location"
                :options="locationList"
                :searchable="true"
              />

              <SelectInput placeholder="Робітник" :disabled="!searchInfo.location || !users.length" v-model="searchInfo.user" :options="users" :searchable="true" />
            </div>
          </template>
        </BaseCard>
      </div>

      <div class="search-card__id" v-if="page === 2">
        <BaseCard>
          <template v-slot:body>
            <SearchById @find="findById" :loading="buttonLoading" />
          </template>
        </BaseCard>
      </div>
      <div class="search-card__name" v-if="page === 3">
        <SearchByName @find="findUserByName" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/cards/system/BaseCard.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';
import SearchById from '@/components/UserSearch/SearchById.vue';
import SearchByName from '@/components/UserSearch/SearchByName.vue';
import CustomSwitch from '@/components/inputs/CustomSwitch.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import { categories } from '../../../../utils/categoryList';
export default {
  name: 'SearchCard',
  components: {
    BaseCard,
    SelectInput,
    SearchById,
    SearchByName,
    CustomSwitch,
    LoaderComponent,
  },
  data() {
    return {
      searchInfo: {
        company: '',
        location: '',
        user: '',
        review: '',
        category: '',
      },
      companyList: [],
      locationList: [],
      users: [],
      page: 1,
      loading: true,
      buttonLoading: false,
      companiesCategories: categories,
    };
  },
  computed: {
    queryUserId() {
      return this.$route.query.userId;
    },
  },
  methods: {
    getCompanyList(category) {
      this.companyList = [];
      this.$store.dispatch('getCompanyListAction').then((res) => {
        if (res.success) {
          this.loading = false;
          for (const key in res.data) {
            if (Object.hasOwnProperty.call(res.data, key)) {
              if ((category && res.data[key].type == category) || !category) {
                this.companyList.push({
                  label: res.data[key].name,
                  value: res.data[key]._id,
                });
              } else if (category === '0' && (res.data[key].type === '0' || !res.data[key].type)) {
                this.companyList.push({
                  label: res.data[key].name,
                  value: res.data[key]._id,
                });
              }
            }
          }
        }
      });
    },
    getLocationList(id) {
      this.$store.dispatch('getLocationsAction', { id }).then((res) => {
        if (res.success) {
          this.locationList = [];
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
      this.$store.dispatch('getLocationEmployeesAction', { id: location }).then((res) => {
        if (res.success) {
          this.users = [];
          for (const key in res.data) {
            if (Object.hasOwnProperty.call(res.data, key)) {
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
      this.searchInfo.from = this.$store.state.user._id;
      this.searchInfo.date = Date.now();
      this.$store.dispatch('sendReviewAction', this.searchInfo);
    },
    switchPage(page) {
      this.page = page;
      if (page == 1) {
        this.getCompanyList();
      }
      this.clearSearch();
    },
    clearSearch() {
      this.searchInfo = {
        company: '',
        location: '',
        user: '',
        review: '',
      };
      this.companyList = [];
      this.locationList = [];
      this.users = [];
    },
    findById(id) {
      this.buttonLoading = true;
      this.$store.dispatch('checkUserAction', { id: id || 'test' }).then((res) => {
        this.buttonLoading = false;
        if (res.success) {
          this.loading = false;
          this.$emit('selected', { user: res.data._id });
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    findUserByName(id) {
      this.$emit('selected', { user: id });
    },
  },
  watch: {
    'searchInfo.category'() {
      this.getCompanyList(this.searchInfo.category);
    },
    'searchInfo.company'() {
      this.getLocationList(this.searchInfo.company);
    },
    'searchInfo.location'() {
      this.getUserList(this.searchInfo.location);
    },
    'searchInfo.user'() {
      this.$emit('selected', this.searchInfo);
    },
  },
  mounted() {
    this.getCompanyList();
    if (this.queryUserId) {
      this.loading = true;
      this.findById(this.queryUserId);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.search-card {
  height: 100%;
  width: 100%;
  padding-right: 0;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__container {
    height: 100%;
  }

  &__button {
    margin-top: 20px;
  }
}
</style>

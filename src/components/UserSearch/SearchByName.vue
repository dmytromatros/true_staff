<template>
  <div class="search-by-name">
    <BaseCard class="search-by-name__card">
      <template v-slot:body>
        <div class="search-by-name__card">
          <TextInput placeholder="Ім'я" v-model="user.name" />
          <TextInput placeholder="Прізвище" v-model="user.lname" />
          <DefaultButton label="Шукати" @action="startSearch" :loading="loading" :disabled="!Boolean(user.name.length) && !Boolean(user.lname.length)" />
        </div>
        <DefaultPopup
          :is-shown="isPopupOpened"
          :show-confirm-button="false"
          title="Оберіть користувача"
          @close="
            () => {
              isPopupOpened = false;
            }
          "
        >
          <template v-slot:body>
            <div class="search-by-name__found">
              <FoundUser v-for="user in foundUsers" :key="user.name + user.surname" :user="user" @find="findUser" />
            </div>
          </template>
        </DefaultPopup>
      </template>
    </BaseCard>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import BaseCard from '@/components/cards/system/BaseCard.vue';
import DefaultButton from '../buttons/DefaultButton.vue';
import FoundUser from '@/components/UserSearch/FoundUser.vue';
import DefaultPopup from '@/components/popups/DefaultPopup.vue';
export default {
  name: 'SearchByName',
  components: { TextInput, BaseCard, DefaultButton, FoundUser, DefaultPopup },
  props: {},
  data() {
    return {
      user: {
        name: '',
        lname: '',
      },

      foundUsers: [],
      loading: false,
      isPopupOpened: false,
    };
  },
  computed: {},
  methods: {
    findUsersList() {
      this.loading = true;
      this.$store.dispatch('findByNameAction', this.user).then((res) => {
        this.loading = false;
        if (res.success) {
          this.foundUsers = res.data;
          this.isPopupOpened = true;
        } else {
          this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' });
        }
      });
    },
    startSearch() {
      this.findUsersList();
    },
    clear() {
      this.user.name = '';
      this.user.lname = '';

      this.foundUsers = [];
      this.isPopupOpened = false;
    },
    findUser(id) {
      this.$emit('find', id);
      this.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-by-name {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;

  &__card {
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: relative;
    overflow: auto;
    height: 100%;
  }

  &__found {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__content {
    max-width: 700px;
  }
}
</style>

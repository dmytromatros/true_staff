<template>
   <section class="user-settings">
      <div class="user-settings__form">
         <TextInput label="name" v-model="user.name" />
         <TextInput label="surname" v-model="user.surname" />
         <TextInput label="password" type="password" v-model="user.password" :disabled="true" />
         <CheckboxInput label="Is an employee" v-model="user.isEmployee" />

         <DefaultButton label="Save" @click="editUser" />

         <div v-if="user.isEmployee" class="user-settings__organization">
            <div v-if="!isInCompany">
               <SelectInput label="Select the company" v-model="company" :options="companyList" />
               <div v-if="company">
                  <SelectInput label="Select the location" v-model="location" :options="locationList" />
                  <div v-if="location">
                     <TextInput label="Position" v-model="position" />
                     <div v-if="position">
                        <TextInput label="Message" :textarea="true" v-model="message" />
                        <DefaultButton label="Send a request" @click="sendRequest" />
                     </div>
                  </div>
               </div>
            </div>
            <div v-else>Is in company</div>
         </div>
      </div>
   </section>
</template>

<script >
import TextInput from '@/components/inputs/TextInput.vue';
import CheckboxInput from '@/components/inputs/CheckboxInput.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';
import DefaultButton from '@/components/buttons/DefaultButton.vue';

export default {
   name: 'UserSettings',
   components: { TextInput, CheckboxInput, SelectInput, DefaultButton },
   data() {
      return {
         user: {},
         // Request data
         company: '',
         location: '',
         position: '',
         message: '',
         ////////////
         isInCompany: false,
         companyList: [],
         locationList: []
      }
   },
   methods: {
      editUser() {
         const data = {
            id: this.$route.params.id,
            name: this.user.name,
            surname: this.user.surname,
            image: this.user.image
         }

         this.$store.dispatch('editUserAction', data)
      },
      getCompanyList() {
         this.$store.dispatch('getCompanyListAction').then(res => {
            if (res.success) {
               for (const key in res.data) {
                  if (Object.hasOwnProperty.call(res.data, key)) {
                     this.companyList.push({
                        label: res.data[key].name,
                        value: res.data[key]._id,
                     })

                  }
               }
            }
         })
      },
      getLocationList(id) {
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
      sendRequest(){
         const data = {
            company: this.company,
            location: this.location,
            position: this.position,
            message: this.message,
            employeeId: this.user._id,
            employeeName: `${this.user.name} ${this.user.surname}`,
            type: 2
         }

         this.$store.dispatch('addUserRequestAction', data).then(res=>{
            if(res.success){
               console.log(res)
            }
         })

      }
   },
   mounted() {
      this.$store.dispatch('getUserAction', { id: this.$route.params.id }).then(res => {
         if (res.success) {
            this.user = { ...res.data }
            if (this.user.company && this.user.company.length) this.isInCompany = true

            if (!this.isInCompany) {
               this.getCompanyList()
            }
         }
      })
   },
   watch: {
      company() {
         this.getLocationList(this.company)
      }
   }
}
</script>

<style lang="scss" scoped>
.user-settings {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
}
</style>
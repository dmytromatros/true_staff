<template>
   <section class="user-settings">
      <div class="user-settings__form">
         <TextInput label="name" v-model="user.name"/>
         <TextInput label="surname" v-model="user.surname"/>
         <TextInput label="password" type="password" v-model="user.password" :disabled="true"/>
         <CheckboxInput label="Is an employee" v-model="user.isEmployee"/>

         <DefaultButton label="Save" @click="editUser"/>

         <div v-if="user.isEmployee" class="user-settings__organization">
            <SelectInput label="Select the company" v-model="company"/>
            <div v-if="company">
               <SelectInput label="Select the location"/>
               <TextInput label="Select the location" :textarea="true"/>
            </div>
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
   components: {TextInput, CheckboxInput, SelectInput, DefaultButton},
   data(){
      return{
         user: {},
         company: '',
      }
   },
   methods: {
      editUser(){
         console.log(this.user)
      }
   },
   mounted(){
      this.$store.dispatch('getUserAction', {id: this.$route.params.id}).then(res=>{
         if(res.success){
            this.user = {...res.data}
         }
      })
   }
}
</script>

<style lang="scss" scoped></style>
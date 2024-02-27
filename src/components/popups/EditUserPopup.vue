<template>
    <DefaultPopup :isShown="isShown" @close="close" title="Редагуання працівника" @confirm="editEmployee"
        :loadingButton="loadingButton" :loading="loading">
        <template v-slot:body>
            <div class="edit-employee__container">
                <SelectInputVue v-model="location" :options="locations" />
                <TextInput class="edit-employee__input" placeholder="Посада" type="test" v-model="position" />
            </div>
        </template>
    </DefaultPopup>
</template>
  
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import SelectInputVue from "@/components/inputs/SelectInput.vue";
import DefaultPopup from "@/components/popups/DefaultPopup.vue";
export default {
    name: "EditUserPopup",
    components: { TextInput, DefaultPopup, SelectInputVue },
    data() {
        return {
            location: this.currentLocation,
            locations: [],
            position: this.currentPosition,
            loadingButton: false,
            loading: true
        };
    },
    props: {
        currentLocation: { type: String, default: "" },
        currentPosition: { type: String, default: '' },
        currentEmployee: { type: String, default: '' },
        isShown: { type: Boolean, default: false }
    },
    methods: {
        close() {
            this.$emit('close');
        },

        editEmployee() {
            this.loadingButton = true
            let data = {
                companyId: this.$store.state.id,
                employeeId: this.currentEmployee,
                locationId: this.location,
                locationAddress: this.getLocationAddress(this.location),
                position: this.position,
            }

            this.$store.dispatch('editEmployeeAction', data).then(res => {
                if (res.success) {
                    this.$store.dispatch('showNotification', { message: res.message, type: 'success' })
                } else {
                    this.$store.dispatch('showNotification', { message: res.response.data.message[0], type: 'error' })
                }
            }).finally(() => {
                this.close();
                this.$emit('employee-edited')
                this.loadingButton = false
            })
        },

        getLocationAddress(id) {
            for (let index = 0; index < this.locations.length; index++) {
                if (this.locations[index].value == id) return this.locations[index].label;
            }

            return ''
        }

    },
    watch: {
        '$store.state.locations.length'() {
            this.locations = []
            this.$store.state.locations.forEach(loc => {
                this.locations.push({
                    value: loc._id,
                    label: loc.address
                })

            })
        }
    },
    mounted() {
        this.$store.state.locations.forEach(loc => {
            this.locations.push({
                value: loc._id,
                label: loc.address
            })
        })
        setTimeout(() => {
            this.loading = false
        }, 1000);
    },
};
</script>
  
<style lang="scss" scoped>
@import "@/styles/main.scss";

.edit-employee {
    &__image {
        width: 100px;
        height: 100px;

        :deep(.image-input__label-1) {
            font-size: 15px;
            height: 15px;
            border-radius: 5px 5px 0 0;
        }
    }

    &__container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }

    &__input {
        flex: 1;
        width: 100%;
    }

    &__button {
        display: flex;
        justify-content: flex-end;
        font-weight: 600;
        margin-top: 20px;

        span {
            border-bottom: 1px solid $main-color;
            padding-bottom: 5px;
            transition: 0.25s ease-in-out all;
            cursor: pointer;

            &:hover {
                color: $main-color-hover;
                border-color: $main-color-hover;
            }
        }
    }


}
</style>
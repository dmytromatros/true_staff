<template>
    <div class="employee-card">
        <div class="employee-card__container">
            <div class="employee-card__employee">
                <div class="employee-card__img">
                    <img v-if="employeeImage" :src="employeeImage" alt="">
                    <img v-else src="/img/profile-img.webp" alt="">
                </div>
                <div class="employee-card__info">
                    <span class="employee-card__name">{{ employeeName }}</span>
                    <IdComponent :id="uniqueId" />
                </div>


            </div>



            <div class="employee-card__location">
                Локація: <span class="employee-card__bold">{{ location }}</span>
            </div>
            <div class="employee-card__position">
                Посада:<span class="employee-card__bold">{{ position }}</span>
            </div>

            <div class="employee-card__buttons">
                <CircleButton class="employee-card__button" icon="visibility" @action="viewUser" />
                <CircleButton class="employee-card__button" icon="edit" @action="editUser" />
                <CircleButton class="employee-card__button" :danger="true" icon="delete" @action="deleteUserConfirm" />
            </div>
        </div>
        <ConfirmPopupVue :is-shown="isConfirming"
            :text="`Ви дійсно хочете видали ${employeeName} із списку працівників?`" @close="isConfirming = false"
            @confirm="deleteUser" />
        <EditUserPopupVue :is-shown="editUserPopup" :current-position="position" :current-location="locationId"
            :current-employee="employeeId" @close="editUserPopup = false" @employee-edited="employeeEdited" />
    </div>
</template>

<script>
import CircleButton from '@/components/buttons/CircleButton.vue'
import ConfirmPopupVue from '@/components/popups/ConfirmPopup.vue'
import EditUserPopupVue from '@/components/popups/EditUserPopup.vue'
import IdComponent from '@/components/other/IdComponent.vue'
export default {
    name: "EmployeeCard",
    components: { CircleButton, ConfirmPopupVue, IdComponent, EditUserPopupVue },
    props: {
        employeeId: {
            type: String,
            default: ""
        },
        locationId: {
            type: String,
            default: ""
        },
        uniqueId: {
            type: String,
            default: ""
        },
        employeeName: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        position: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            employeeImage: '',
            isConfirming: false,
            editUserPopup: false
        }
    },
    computed: {},
    methods: {
        getImage(id) {
            this.$store.dispatch('getImageAction', { id }).then(res => {
                if (res.success) {
                    this.employeeImage = res.data
                }
            })
        },
        async copyId(id) {
            try {
                await navigator.clipboard.writeText(id);
                alert("Copied");
            } catch ($e) {
                alert("Cannot copy");
            }
        },
        viewUser() {
            this.$router.push({ name: 'company-search-user', query: { userId: this.uniqueId } })
        },

        editUser() {
            this.editUserPopup = true
        },

        deleteUserConfirm() {
            this.isConfirming = true;
        },

        employeeEdited() {
            this.$emit('deleted')
        },

        deleteUser() {
            this.$store.dispatch('deleteEmployeeAction', { id: this.$store.state.id, employeeId: this.employeeId }).then(res => {
                if (res.success) {
                    this.$emit('deleted')
                }
            });
        },
    },
    mounted() {
        this.getImage(this.employeeId)
    },
}
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.employee-card {
    width: 100%;
    height: fit-content;

    &__container {
        width: 100%;
        height: 100%;
        background-color: $white;
        border-radius: 10px;
        @include main-shadow;
        overflow: hidden;
    }

    &__employee {
        display: flex;
        // flex-direction: column;
        gap: 16px;
        width: 100%;
        align-items: center;
        margin-bottom: 25px;
        padding: 25px;
        color: $white;

        background: $main-gradient;

        img {
            width: 75px;
            height: 75px;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
            @include main-shadow;

        }
    }

    &__name {
        font-weight: 600;
        font-size: 20px;
        white-space: nowrap;
        display: block;
        max-width: 215px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &__location {
        margin-bottom: 15px;
        font-size: 18px;
        // text-align: center;
        padding: 0 25px;
        white-space: nowrap;
        display: block;
        max-width: 215px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &__position {
        margin-bottom: 15px;
        // text-align: center;
        padding: 0 25px;
        white-space: nowrap;
        display: block;
        max-width: 215px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &__bold {
        font-weight: 600;
        margin-left: 5px;
    }

    &__buttons {
        display: flex;
        gap: 15px;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        padding: 10px 15px;
    }
}

.material-symbols-outlined {
    user-select: none;
}
</style>
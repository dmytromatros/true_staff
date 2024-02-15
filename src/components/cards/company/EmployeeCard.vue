<template>
    <div class="employee-card">
        <div class="employee-card__container">
            <div class="employee-card__employee">
                <img v-if="employeeImage" :src="employeeImage" alt="">
                <img v-else src="../../../assets/img/profile-img.webp" alt="">
                <span class="employee-card__name">{{ employeeName }}</span>
                <span class="employee-card__id" @click="copyId(employeeId)" title="Скопіювати">{{ employeeId }}</span>
            </div>

            <div class="employee-card__location">
                Локація: <span class="employee-card__bold">{{ location }}</span>
            </div>
            <div class="employee-card__position">
                Посада:<span class="employee-card__bold">{{ position }}</span>
            </div>

            <div class="employee-card__buttons">
                <CircleButton class="employee-card__button" icon="visibility" @click="viewUser" />
                <CircleButton class="employee-card__button" icon="edit" />
                <CircleButton class="employee-card__button" :danger="true" icon="delete" @click="deleteUserConfirm" />
            </div>
        </div>
        <ConfirmPopupVue :is-shown="isConfirming" :text="`Ви дійсно хочете видали ${employeeName} із списку працівників?`"
            @close="isConfirming = false" @confirm="deleteUser" />
    </div>
</template>

<script>
import CircleButton from '@/components/buttons/CircleButton.vue'
import ConfirmPopupVue from '@/components/popups/ConfirmPopup.vue'
export default {
    name: "EmployeeCard",
    components: { CircleButton, ConfirmPopupVue },
    props: {
        employeeId: {
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
        }
    },
    data() {
        return {
            employeeImage: '',
            isConfirming: false,
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
            this.$router.push({ name: 'company-search-user', query: { userId: this.employeeId } })
        },

        deleteUserConfirm() {
            this.isConfirming = true;
        },

        deleteUser() {
            this.$store.dispatch('deleteEmployeeAction', { id: this.$route.params.id, employeeId: this.employeeId }).then(res => {
                if (res.success) {
                    this.$emit('deleted')
                }
            });
        }
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
        flex-direction: column;
        width: 100%;
        align-items: center;
        margin-bottom: 25px;
        padding: 25px;
        color: $white;

        background: lighten($main-color, 2.0%);

        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            object-position: center;
            margin-bottom: 15px;
            border-radius: 50%;
            @include main-shadow;

        }
    }

    &__name {
        font-weight: 600;
        font-size: 20px;
        white-space: nowrap;
        max-width: 215px;
        text-overflow: ellipsis;
    }

    &__location {
        margin-bottom: 15px;
        font-size: 18px;
        text-align: center;
        padding: 0 25px;
    }

    &__position {
        margin-bottom: 40px;
        text-align: center;
        padding: 0 25px;
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

    &__id {
        opacity: 0.9;
        border: 1px solid $white;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 12px;
        margin-top: 15px;
        background: $white;
        color: $main-color;
        font-weight: 600;
        letter-spacing: 1px;
        transition: 0.25s ease-in-out all;

        &:hover {
            opacity: 1;
        }
    }
}

.material-symbols-outlined {
    user-select: none;
}
</style>
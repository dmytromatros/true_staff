<template>
    <div class="employee-card">
        <div class="employee-card__container">
            <div class="employee-card__employee">
                <img :src="employeeImage" alt="">
                <span class="employee-card__name">{{ employeeName }}</span>
                <span class="employee-card__id" @click="copyId(employeeId)">{{ employeeId }}</span>
            </div>

            <div class="employee-card__location">
                Локація: <span class="employee-card__bold">{{ location }}</span>
            </div>
            <div class="employee-card__position">
                Посада:<span class="employee-card__bold">{{ position }}</span>
            </div>

            <div class="employee-card__buttons">
                <DefaultButton class="employee-card__button" label="Редагувати" />
                <DefaultButton class="employee-card__button" label="Звільнити" :danger="true" />
            </div>
        </div>
    </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
export default {
    name: "EmployeeCard",
    components: { DefaultButton },
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
            employeeImage: ''
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
        padding: 25px;
    }

    &__employee {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        margin-bottom: 50px;

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
    }

    &__location {
        margin-bottom: 15px;
        font-size: 18px;
        text-align: center;
    }

    &__position {
        margin-bottom: 40px;
        text-align: center;
    }

    &__bold {
        font-weight: 600;
        margin-left: 5px;
    }

    &__buttons {
        display: flex;
        gap: 15px;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;

    }

    &__button {
        flex: 1;
    }

    &__id {
        opacity: 0.7;
        border: 1px solid $main-color;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 12px;
        margin: 10px;
    }
}
</style>
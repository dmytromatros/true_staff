<template>
    <div class="add-employee-card">
        <BaseCard class="add-employee-card__new-card">
            <template v-slot:body>
                <div class="add-employee-card__new-card-title">Додати нового співробітника</div>
                <SelectInput placeholder="Локація" :options="locations" v-model="newEmployee.location" />
                <TextInput placeholder="ID користувача" type="text" v-model="newEmployee.userId" />
                <TextInput placeholder="Повідомлення" type="text" v-model="newEmployee.message" :textarea="true" />
                <TextInput placeholder="Посада" type="text" v-model="newEmployee.position" />

                <DefaultButton label="Add employee" @click="addEmployee" />
            </template>
        </BaseCard>
    </div>
</template>

<script>
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import BaseCard from "@/components/cards/system/BaseCard.vue";
export default {
    name: "AddEmployeeCard",
    components: { DefaultButton, TextInput, SelectInput, BaseCard },
    props: {
        locations: {
            type: Array,
            default: () => { }
        }
    },
    data() {
        return {
            newEmployee: {
                location: '',
                position: '',
                message: '',
                userId: '',
            }
        }
    },
    computed: {
        queryLocationId() {
            return this.$route.query.locationId
        }
    },
    methods: {
        async addEmployee() {
            const employeeName = await this.getUserName(this.newEmployee.userId);
            const companyName = await this.getCompanyName(this.$route.params.id);
            let data = {
                companyId: this.$route.params.id,
                companyName: companyName,
                locationId: this.newEmployee.location,
                locationAddress: this.getLocationAddress(this.newEmployee.location),
                employeeId: this.newEmployee.userId,
                employeeName: employeeName,
                message: this.newEmployee.message,
                position: this.newEmployee.position,
                type: 1,
            };

            this.$store.dispatch("addCompanyRequestAction", data);
        },

        async getUserName(id) {
            try {
                const res = await this.$store.dispatch("getUserAction", { id });
                if (res.success) {
                    return `${res.data.name} ${res.data.surname}`;
                }
            } catch (error) {
                console.error(error);
                return "";
            }
        },

        async getCompanyName(id) {
            try {
                const res = await this.$store.dispatch("getCompanyAction", { id });
                if (res.success) {
                    return `${res.data.name}`;
                }
            } catch (error) {
                console.error(error);
                return "";
            }
        },

        getLocationAddress(id) {
            let address = "";
            this.locations.forEach((loc) => {
                if (loc.value == id) {
                    address = loc.label;
                }
            });
            return address;
        },
    },
    watch: {
        'locations.length'() {
            this.locations.forEach(loc => {
                if (loc.value == this.queryLocationId) {
                    console.log(loc.label)
                    this.newEmployee.location = loc.label;
                }
            })
        }
    },
    mounted() {
        this.locations.forEach(loc => {
            if (loc.value == this.queryLocationId) {
                this.newEmployee.location = loc.label;
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.add-employee-card {
    &__new-card {
        height: fit-content !important;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    &__new-card-title {
        padding: 0 10px;
        font-weight: 600;
        font-size: 23px;
        margin-bottom: 25px;
    }
}
</style>
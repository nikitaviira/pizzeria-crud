<template>
    <panel title="Update pizza size">
        <back-btn
                link="pizzasizes"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <edit-form
                :showError.sync="showError"
                :error="error"
                @submit-form="updatePizzaSize()">
            <v-text-field
                    v-model="pizzaSize.name"
                    label="Name"
                    clearable
                    maxlength="20"
                    counter
                    error-count="1"
                    :rules="[rules.required, rules.charMatch]"
            ></v-text-field>
            <v-text-field
                    v-model="pizzaSize.diameter"
                    label="Diameter"
                    clearable
                    maxlength="2"
                    counter
                    suffix="cm"
                    error-count="2"
                    :rules="[rules.required, rules.numberMatch]"
            ></v-text-field>
            <v-text-field
                    v-model="pizzaSize.price"
                    label="Price"
                    maxlength="10"
                    counter
                    clearable
                    suffix="€"
                    error-count="2"
                    :rules="[rules.required, rules.moneyMatch]"
            ></v-text-field>
        </edit-form>
    </panel>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import PizzaSizeRepository from "@/services/Repositories/PizzaSizeRepository.ts";
    import IPizzaSize from "@/domain/IPizzaSize";
    import rules from "@/services/ValidationRules";

    @Component({
        components: {
            'panel': () => import('@/components/Panel.vue'),
            'back-btn': () => import('@/components/NavigationButton.vue'),
            'edit-form': () => import('@/components/Form.vue')
        },
        computed: {
            rules() { return rules; }
        }
    })
    export default class Edit extends Vue {
        private pizzaSize: IPizzaSize = {
            id: '',
            name: '',
            price: '',
            diameter: ''
        };
        private id: string = this.$store.state.route.params.id;
        private pizzaSizeRepo = new PizzaSizeRepository();
        private error: string = '';

        private showError: boolean = false;

        public async updatePizzaSize(): Promise<void> {
            await this.pizzaSizeRepo.update(this.pizzaSize, this.id)
                .then(async () => {
                    await this.$router.push({
                        name: 'pizzasizes'
                    });
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });
        }

        private async mounted() {
            await this.pizzaSizeRepo.find(this.id)
                .then((result) => {
                    this.pizzaSize = result.data as IPizzaSize;
                    this.pizzaSize.price = this.pizzaSize.price.substring(0, this.pizzaSize.price.length - 1);
                    this.pizzaSize.diameter = this.pizzaSize.diameter.substring(0, this.pizzaSize.diameter.length - 2);
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });
        }
    }
</script>

<style scoped>

</style>

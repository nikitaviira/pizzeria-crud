<template>
    <panel title="Create pizza size">
        <back-btn
                link="pizzasizes"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <create-form
                :showError.sync="showError"
                :error="error"
                @submit-form="createPizzaSize()">
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
        </create-form>
    </panel>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import PizzaSizeRepository from '@/services/Repositories/PizzaSizeRepository.ts';
    import rules from '@/services/ValidationRules';
    import IPizzaSizeCreate from '@/domain/IPizzaSizeCreate';

    @Component({
        components: {
            'panel': () => import('@/components/Panel.vue'),
            'back-btn': () => import('@/components/NavigationButton.vue'),
            'create-form': () => import('@/components/Form.vue')
        },
        computed: {
            rules() { return rules; }
        }
    })
    export default class Create extends Vue {
        private pizzaSize: IPizzaSizeCreate = {
            name: '',
            price: '',
            diameter: ''
        };

        private pizzaSizeRepo = new PizzaSizeRepository();
        private error: string = '';

        private isSubmitted: boolean = false;
        private showError: boolean = false;

        public async createPizzaSize(): Promise<void> {
            if (!this.isSubmitted) {
                this.isSubmitted = true;
                await this.pizzaSizeRepo.create(this.pizzaSize)
                    .then(async () => {
                        await this.$router.push({
                            name: 'pizzasizes'
                        });
                    })
                    .catch((err) => {
                        this.isSubmitted = false;
                        this.showError = true;
                        this.error = err.toString();
                    });
            }
        }
    }
</script>

<style scoped>

</style>

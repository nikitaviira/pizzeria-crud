<template>
    <panel title="Create pizza">
        <back-btn
                link="pizzas"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <create-form
                :showError.sync="showError"
                :error="error"
                @submit-form="createPizza()">
            <v-select
                    v-model="pizza.crustId"
                    :items="crusts"
                    :item-text="crust => crust.name + ' | ' + crust.price"
                    item-value="id"
                    :rules="[rules.required]"
                    label="Crust"
            ></v-select>

            <v-select
                    v-model="pizza.cutStyleId"
                    :items="cutStyles"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="id"
                    label="Cut style"
            ></v-select>

            <v-select
                    v-model="pizza.pizzaSizeId"
                    :items="pizzaSizes"
                    :item-text="size => size.name + ' | ' + size.diameter"
                    item-value="id"
                    :rules="[rules.required]"
                    label="Pizza size"
            ></v-select>
        </create-form>
    </panel>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import PizzaRepository from '@/services/Repositories/PizzaRepository';
    import PizzaSizeRepository from '@/services/Repositories/PizzaSizeRepository';
    import CutStyleRepository from '@/services/Repositories/CutStyleRepository';
    import CrustRepository from '@/services/Repositories/CrustRepository';

    import ICrust from '@/domain/ICrust';
    import IPizzaSize from '@/domain/IPizzaSize';
    import ICutStyle from '@/domain/ICutStyle';
    import IPizzaCreate from '@/domain/IPizzaCreate';

    import rules from '@/services/ValidationRules';

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
        private pizza: IPizzaCreate = {
            crustId: '',
            pizzaSizeId: '',
            cutStyleId: ''
        };

        private cutStyleRepo = new CutStyleRepository();
        private pizzaRepo = new PizzaRepository();
        private pizzaSizeRepo = new PizzaSizeRepository();
        private crustRepo = new CrustRepository();

        private crusts: ICrust[] = [];
        private pizzaSizes: IPizzaSize[] = [];
        private cutStyles: ICutStyle[] = [];

        private error: string = '';

        private showError: boolean = false;
        private isSubmitted: boolean = false;

        public async createPizza(): Promise<void> {
            if (!this.isSubmitted) {
                this.isSubmitted = true;
                await this.pizzaRepo.create(this.pizza)
                    .then(async () => {
                        await this.$router.push({
                            name: 'pizzas'
                        });
                    })
                    .catch((err) => {
                        this.isSubmitted = false;
                        this.showError = true;
                        this.error = err.toString();
                    });
            }
        }

        private async mounted(): Promise<void> {
            await this.cutStyleRepo.getAll()
                .then((response) => {
                    this.cutStyles = response.data as ICutStyle[];
                }).catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });

            await this.crustRepo.getAll()
                .then((response) => {
                    this.crusts = response.data as ICrust[];
                }).catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });

            await this.pizzaSizeRepo.getAll()
                .then((response) => {
                    this.pizzaSizes = response.data as IPizzaSize[];
                }).catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });
        }
    }
</script>

<style scoped>

</style>

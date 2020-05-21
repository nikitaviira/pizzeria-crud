<template>
    <panel title="Update pizza">
        <back-btn
                link="pizzas"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <edit-form
                :showError.sync="showError"
                :error="error"
                @submit-form="updatePizza()">
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
        </edit-form>
    </panel>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    import ICutStyle from "@/domain/ICutStyle";
    import ICrust from "@/domain/ICrust";
    import IPizzaEdit from "@/domain/IPizzaEdit";
    import IPizzaSize from "@/domain/IPizzaSize";

    import CutStyleRepository from "@/services/Repositories/CutStyleRepository";
    import PizzaRepository from "@/services/Repositories/PizzaRepository";
    import PizzaSizeRepository from "@/services/Repositories/PizzaSizeRepository";
    import CrustRepository from "@/services/Repositories/CrustRepository";

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

        private cutStyleRepo = new CutStyleRepository();
        private pizzaRepo = new PizzaRepository();
        private pizzaSizeRepo = new PizzaSizeRepository();
        private crustRepo = new CrustRepository();

        private crusts: ICrust[] = [];
        private pizzaSizes: IPizzaSize[] = [];
        private cutStyles: ICutStyle[] = [];

        private pizza: IPizzaEdit = {
            id: '',
            crustId: '',
            pizzaSizeId: '',
            cutStyleId: ''
        };

        private error: string = '';
        private id: string = this.$store.state.route.params.id;

        private showError: boolean = false;

        public async updatePizza(): Promise<void> {
            await this.pizzaRepo.update(this.pizza, this.id)
                .then(async () => {
                    await this.$router.push({
                        name: 'pizzas'
                    });
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });
        }

        private async mounted() {
            await this.pizzaRepo.find(this.id)
                .then((result) => {
                    this.pizza.id = result.data.id;
                    this.pizza.crustId = result.data.crustId;
                    this.pizza.pizzaSizeId = result.data.pizzaSizeId;
                    this.pizza.cutStyleId = result.data.cutStyleId;
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });

            await this.cutStyleRepo.getAll()
                .then((response) => {
                    this.cutStyles = response.data as ICutStyle[];
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });

            await this.crustRepo.getAll()
                .then((response) => {
                    this.crusts = response.data as ICrust[];
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });

            await this.pizzaSizeRepo.getAll()
                .then((response) => {
                    this.pizzaSizes = response.data as IPizzaSize[];
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

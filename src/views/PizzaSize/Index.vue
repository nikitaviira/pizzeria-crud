<template>
    <pizza-size-list
            :headers="[
                { text: 'Name', align: 'left', sortable: false, value: 'name'},
                { text: 'Price', value: 'price' },
                { text: 'Diameter', value: 'diameter' },
                { text: 'Actions', value: 'action', sortable: false }
            ]"
            :items="pizzaSizes"
            title="Pizza sizes"
            createLink="create-pizzasize"
            editLink="edit-pizzasize"
            :error="error"
            :loaded="loaded"
            @remove="removePizzaSize"/>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import PizzaSizeRepository from "@/services/Repositories/PizzaSizeRepository.ts";
    import IPizzaSize from "@/domain/IPizzaSize";

    @Component({
        components: {
            'pizza-size-list': () => import('@/components/IndexComponent.vue')
        }
    })
    export default class Index extends Vue {
        private pizzaSizes: IPizzaSize[] = [];
        private error: string = '';
        private pizzaSizeRepo = new PizzaSizeRepository();

        private showError: boolean = false;
        private loaded: boolean = false;

        private async mounted(): Promise<void> {
            await this.pizzaSizeRepo.getAll()
                .then((response) => {
                    this.loaded = true;
                    this.pizzaSizes = response.data as IPizzaSize[];
                })
                .catch((err) => {
                    this.showError = true;
                    this.loaded = true;
                    this.error = err.toString();
                });
        }

        private async removePizzaSize(id: string): Promise<void> {
            await this.pizzaSizeRepo.remove(id)
                .then(() => {
                    this.pizzaSizes = this.pizzaSizes.filter(e => e.id != id);
                })
                .catch((err) => {
                    alert('Could not delete entry: ' + err.toString());
                });
        }
    }
</script>

<style scoped>

</style>

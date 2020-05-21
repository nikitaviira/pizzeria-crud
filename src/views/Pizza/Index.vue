<template>
    <pizza-list
            :headers="[
                { text: 'Crust', align: 'left', sortable: false, value: 'crust.name'},
                { text: 'Pizza size', value: 'pizzaSize.name', sortable: false },
                { text: 'Cut style', value: 'cutStyle.name', sortable: false },
                { text: 'Actions', value: 'action', sortable: false }
            ]"
            :items="pizzas"
            title="Pizzas"
            createLink="create-pizza"
            editLink="edit-pizza"
            :error="error"
            :loaded="loaded"
            @remove="removePizza"/>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import IPizza from "@/domain/IPizza";
    import PizzaRepository from "@/services/Repositories/PizzaRepository";

    @Component({
        components: {
            'pizza-list': () => import('@/components/IndexComponent.vue')
        }
    })
    export default class Index extends Vue {
        private pizzaRepo = new PizzaRepository();
        private pizzas: IPizza[] = [];
        private error: string = '';

        private showError: boolean = false;
        private loaded: boolean = false;

        private async mounted(): Promise<void> {
            await this.pizzaRepo.getAll()
                .then((response) => {
                    this.loaded = true;
                    this.pizzas = response.data as IPizza[];
                })
                .catch((err) => {
                    this.showError = true;
                    this.loaded = true;
                    this.error = err.toString();
                });
        }

        private async removePizza(id: string): Promise<void> {
            await this.pizzaRepo.remove(id)
                .then(() => {
                    this.pizzas = this.pizzas.filter(e => e.id != id);
                })
                .catch((err) => {
                    alert('Could not delete entry: ' + err.toString());
                });
        }
    }
</script>

<style scoped>

</style>

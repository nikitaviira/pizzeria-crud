<template>
    <crust-list
            :headers="[
                { text: 'Name', align: 'left', sortable: false, value: 'name' },
                { text: 'Price', value: 'price' },
                { text: 'Actions', value: 'action', sortable: false }
            ]"
            :items="crusts"
            title="Crusts"
            createLink="create-crust"
            editLink="edit-crust"
            :error="error"
            :loaded="loaded"
            @remove="removeCrust" />
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CrustRepository from '@/services/Repositories/CrustRepository.ts';
    import ICrust from '@/domain/ICrust';

    @Component({
        components: {
            'crust-list': () => import('@/components/IndexComponent.vue')
        }
    })
    export default class Index extends Vue {
        private crusts: ICrust[] = [];
        private crustRepo = new CrustRepository();
        private error: string = '';

        private loaded: boolean = true;
        private showError: boolean = false;

        private async created(): Promise<void> {
            await this.crustRepo.getAll()
                .then((response) => {
                    this.loaded = true;
                    this.crusts = response.data as ICrust[];
                })
                .catch((err) => {
                    this.showError = true;
                    this.loaded = true;
                    this.error = err.toString();
                });
        }

        private async removeCrust(id: string): Promise<void> {
            await this.crustRepo.remove(id)
                .then(() => {
                    this.crusts = this.crusts.filter(e => e.id != id);
                })
                .catch((err) => {
                    alert('Could not delete entry: ' + err.toString());
                });
        }
    }
</script>

<style scoped>
</style>

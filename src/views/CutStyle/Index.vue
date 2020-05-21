<template>
    <cut-style-list
            :headers="[
                { text: 'Name', align: 'left', sortable: false, value: 'name'},
                { text: 'Actions', value: 'action', sortable: false }
            ]"
            :items="cutStyles"
            title="Cut styles"
            createLink="create-cutstyle"
            editLink="edit-cutstyle"
            :error="error"
            :loaded="loaded"
            @remove="removeCutStyle"/>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CutStyleRepository from '@/services/Repositories/CutStyleRepository';
    import ICutStyle from '@/domain/ICutStyle';

    @Component({
        components: {
            'cut-style-list': () => import('@/components/IndexComponent.vue')
        }
    })
    export default class Index extends Vue {
        private cutStyles: ICutStyle[] = [];
        private cutStyleRepo = new CutStyleRepository();
        private error: string = '';

        private showError: boolean = false;
        private loaded: boolean = false;

        private async mounted(): Promise<void> {
            await this.cutStyleRepo.getAll()
                .then((response) => {
                    this.loaded = true;
                    this.cutStyles = response.data as ICutStyle[];
                })
                .catch((err) => {
                    this.showError = true;
                    this.loaded = true;
                    this.error = err.toString();
                });
        }

        private async removeCutStyle(id: string): Promise<void> {
            await this.cutStyleRepo.remove(id)
                .then(() => {
                    this.cutStyles = this.cutStyles.filter(e => e.id != id);
                })
                .catch((err) => {
                    alert('Could not delete entry: ' + err.toString());
                });
        }
    }
</script>

<style scoped>

</style>

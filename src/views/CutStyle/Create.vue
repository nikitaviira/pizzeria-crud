<template>
    <panel title="Create cut style">
        <back-btn
                link="cutstyles"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <create-form
                :showError.sync="showError"
                :error="error"
                @submit-form="createCutStyle()">
            <v-text-field
                    v-model="cutStyle.name"
                    label="Name"
                    clearable
                    maxlength="20"
                    counter
                    error-count="1"
                    :rules="[rules.required]"
            ></v-text-field>
        </create-form>
    </panel>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CutStyleRepository from '@/services/Repositories/CutStyleRepository';
    import rules from '@/services/ValidationRules';
    import ICutStyleCreate from '@/domain/ICutStyleCreate';

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
        private cutStyle: ICutStyleCreate = {
            name: ''
        };
        private cutStyleRepo = new CutStyleRepository();

        private error: string = '';

        private showError: boolean = false;
        private isSubmitted: boolean = false;

        public async createCutStyle(): Promise<void> {
            if (!this.isSubmitted) {
                this.isSubmitted = true;
                await this.cutStyleRepo.create(this.cutStyle)
                    .then(async () => {
                        await this.$router.push({
                            name: 'cutstyles'
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

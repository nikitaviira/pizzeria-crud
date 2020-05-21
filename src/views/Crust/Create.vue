<template>
    <panel title="Create crust">
        <back-btn
                link="crusts"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <create-form
                :showError.sync="showError"
                :error="error"
                @submit-form="createCrust()">
            <v-text-field
                    v-model="crust.name"
                    label="Name"
                    clearable
                    maxlength="20"
                    counter
                    error-count="1"
                    :rules="[rules.required, rules.charMatch]"
            ></v-text-field>
            <v-text-field
                    v-model="crust.price"
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
    import CrustRepository from '@/services/Repositories/CrustRepository.ts';
    import ICrustCreate from '@/domain/ICrustCreate';
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
        private crust: ICrustCreate = {
            name: '',
            price: ''
        };
        private crustRepo = new CrustRepository();

        private error: string = '';

        private isSubmitted: boolean = false;
        private showError: boolean = false;

        public async createCrust(): Promise<void> {
            if (!this.isSubmitted) {
                this.isSubmitted = true;
                await this.crustRepo.create(this.crust)
                    .then(async () => {
                        await this.$router.push({
                            name: 'crusts'
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

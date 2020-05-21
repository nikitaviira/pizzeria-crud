<template>
    <panel title="Update crust">
        <back-btn
                link="crusts"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <edit-form
                :showError.sync="showError"
                :error="error"
                @submit-form="updateCrust()">
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
        </edit-form>
    </panel>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CrustRepository from '@/services/Repositories/CrustRepository.ts';
    import ICrust from '@/domain/ICrust';
    import rules from '@/services/ValidationRules';

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
        private crust: ICrust = {
            id: '',
            name: '',
            price: ''
        };
        private crustRepo = new CrustRepository();
        private id: string = this.$store.state.route.params.id;
        private error: string = '';

        private showError: boolean = false;

        public async updateCrust(): Promise<void> {
            await this.crustRepo.update(this.crust, this.crust.id)
                .then(async () => {
                    await this.$router.push({
                        name: 'crusts'
                    });
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });
        }

        private async mounted() {
            await this.crustRepo.find(this.id)
                .then((result) => {
                    this.crust = result.data as ICrust;
                    this.crust.price = this.crust.price.substring(0, this.crust.price.length - 1);
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

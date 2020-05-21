<template>
    <panel title="Update cut style">
        <back-btn
                link="cutstyles"
                slot="action"
                icon="mdi-arrow-left-bold"
                tooltipText="Go back to the table" />

        <edit-form
                :showError.sync="showError"
                :error="error"
                @submit-form="updateCutStyle()">
            <v-text-field
                    v-model="cutStyle.name"
                    label="Name"
                    clearable
                    maxlength="20"
                    counter
                    error-count="1"
                    :rules="[rules.required, rules.charMatch]"
            ></v-text-field>
        </edit-form>
    </panel>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CutStyleRepository from '@/services/Repositories/CutStyleRepository';
    import ICutStyle from '@/domain/ICutStyle';
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
        private cutStyle: ICutStyle = {
            id: '',
            name: ''
        };
        private id: string = this.$store.state.route.params.id;
        private cutStyleRepo = new CutStyleRepository();
        private error: string = '';

        private showError: boolean = false;

        public async updateCutStyle(): Promise<void> {
            await this.cutStyleRepo.update(this.cutStyle, this.id)
                .then(async () => {
                    await this.$router.push({
                        name: 'cutstyles'
                    });
                })
                .catch((err) => {
                    this.showError = true;
                    this.error = err.toString();
                });
        }

        private async mounted() {
            await this.cutStyleRepo.find(this.id)
                .then((result) => {
                    this.cutStyle = result.data as ICutStyle;
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

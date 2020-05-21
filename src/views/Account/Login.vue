<template>
    <panel title="Login">
        <login-form
                :showError.sync="showError"
                :btnLoad.sync="btnLoad"
                :error="error"
                @submit-form="login()">
            <v-text-field
                    v-model="credentials.email"
                    label="Email"
                    clearable
                    error-count="2"
                    :rules="[rules.required, rules.emailMatch]"
            ></v-text-field>
            <v-text-field
                    v-model="credentials.password"
                    :rules="[rules.required]"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    error-count="1"
                    @click:append="showPassword = !showPassword"
            ></v-text-field>
        </login-form>
    </panel>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import ILoginCredentials from '@/domain/ILoginCredentials';
    import rules from '@/services/ValidationRules';

    @Component({
        components: {
            'panel': () => import('@/components/Panel.vue'),
            'login-form': () => import('@/components/Form.vue')
        }
    })
    export default class Login extends Vue {
        private credentials: ILoginCredentials = {
            email: '',
            password: ''
        };
        private showPassword: boolean = false;
        private showError: boolean = false;
        private btnLoad: boolean = false;

        private error: string  = '';

        public async login() {
            this.btnLoad = true;
            await this.$store.dispatch('login', this.credentials)
                .then(async () => {
                    await this.$router.push({ name: 'root' });
                })
                .catch((err) => {
                    this.btnLoad = false;
                    this.showError = true;
                    this.error = `${err.response.data.error} (status code: ${err.response.status})`;
                });
        }

        private get rules() {
            return rules;
        }
    }
</script>

<style scoped>

</style>

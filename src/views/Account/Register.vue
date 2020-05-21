<template>
    <panel title="Register">
        <register-form
                :showError.sync="showError"
                :btnLoad.sync="btnLoad"
                :error="error"
                @submit-form="register()">

            <v-text-field
                    v-model="credentials.email"
                    label="Email"
                    clearable
                    maxlength="256"
                    error-count="3"
                    :rules="[rules.required, rules.emailMatch]"
            ></v-text-field>

            <v-text-field
                    v-model="credentials.password"
                    :rules="[rules.required, rules.min, rules.atLeastOneCapCharAndNum]"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    error-count="3"
                    @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-text-field
                    v-model="credentials.firstName"
                    label="First name"
                    clearable
                    maxlength="128"
                    error-count="2"
                    :rules="[rules.required, rules.charMatch]"
            ></v-text-field>

            <v-text-field
                    v-model="credentials.lastName"
                    label="Last name"
                    clearable
                    maxlength="128"
                    error-count="2"
                    :rules="[rules.required, rules.charMatch]"
            ></v-text-field>

        </register-form>
    </panel>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import IRegisterCredentials from '@/domain/IRegisterCredentials';
    import rules from '@/services/ValidationRules';

    @Component({
        components: {
            'panel': () => import('@/components/Panel.vue'),
            'register-form': () => import('@/components/Form.vue')
        }
    })
    export default class Register extends Vue {
        private credentials: IRegisterCredentials = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        };

        private showPassword: boolean = false;
        private btnLoad: boolean = false;
        private showError: boolean = false;
        private isSubmitted: boolean = false;
        private error: string  = '';

        public async register() {
            if (!this.isSubmitted) {
                this.btnLoad = true;
                this.isSubmitted = true;
                this.$store.dispatch('register', this.credentials)
                    .then(async () => {
                        this.btnLoad = false;
                        await this.$router.push({name: 'login'});
                    })
                    .catch((err) => {
                        this.btnLoad = false;
                        this.isSubmitted = false;
                        this.showError = true;
                        this.error = `${err.response.data.error} (status code: ${err.response.status})`;
                    });
            }
        }

        private get rules() {
            return rules;
        }
    }
</script>

<style scoped>

</style>

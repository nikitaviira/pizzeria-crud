<template>
    <v-toolbar fixed :dense="isLoggedIn" class="primary white--text">
        <router-link :to="{ name: 'root' }">
            <v-toolbar-title>
                <v-btn text :class="{'mt-3': isLoggedIn}" class="white--text font-weight-bold">
                    Pizza delivery API
                </v-btn>
            </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <v-toolbar-items v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }">
                <v-btn text class="white--text mt-3">
                    <v-icon class="mr-2">account_circle</v-icon>
                    Login
                </v-btn>
            </router-link>
        </v-toolbar-items>

        <v-toolbar-items v-if="!isLoggedIn">
            <router-link :to="{ name: 'register' }">
                <v-btn text class="white--text mt-3">
                    <v-icon class="mr-2">person_add</v-icon>
                    Sign up
                </v-btn>
            </router-link>
        </v-toolbar-items>

        <v-toolbar-items v-if="isLoggedIn">
            <a>
                <v-btn text class="white--text mt-3" @click="logout">
                    <v-icon class="mr-2">power_settings_new</v-icon>
                    Sign out
                </v-btn>
            </a>
        </v-toolbar-items>

        <template v-if="isLoggedIn" v-slot:extension>
            <v-toolbar-items>
                <router-link :to="{ name: 'crusts' }">
                    <v-btn text class="white--text mt-2">
                        Crust
                    </v-btn>
                </router-link>
            </v-toolbar-items>

            <v-toolbar-items>
                <router-link :to="{ name: 'cutstyles' }">
                    <v-btn text class="white--text mt-2">
                        Cut style
                    </v-btn>
                </router-link>
            </v-toolbar-items>

            <v-toolbar-items>
                <router-link :to="{ name: 'pizzasizes' }">
                    <v-btn text class="white--text mt-2">
                        Pizza size
                    </v-btn>
                </router-link>
            </v-toolbar-items>

            <v-toolbar-items>
                <router-link :to="{ name: 'pizzas' }">
                    <v-btn text class="white--text mt-2">
                        Pizza
                    </v-btn>
                </router-link>
            </v-toolbar-items>
        </template>
    </v-toolbar>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        computed: {
            isLoggedIn() { return this.$store.getters.isLoggedIn; }
        }
    })
    export default class NavBar extends Vue {

        private async logout() {
            await this.$store.dispatch('logout')
                .then(async () => {
                    await this.$router.push({
                        name: 'login'
                    });
                });
        }
    }
</script>

<style scoped>

</style>

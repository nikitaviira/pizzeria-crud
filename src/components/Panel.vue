<template>
    <v-container fluid>
        <v-row>
            <v-flex
                    xs10 sm8 md8 lg6 xl6
                    :offset-xs3="$vuetify.breakpoint.lgOnly || $vuetify.breakpoint.xlOnly"
                    :offset-xs2="$vuetify.breakpoint.mdOnly || $vuetify.breakpoint.smOnly"
                    :offset-xs1="$vuetify.breakpoint.xsOnly"
            >
                <v-card class="elevation-10" :class="$vuetify.breakpoint.xsOnly ? 'mt-5' : 'mt-10'">
                    <v-toolbar flat dense class="primary" dark>
                        <v-toolbar-title class="font-italic font-weight-bold">{{ title }}</v-toolbar-title>
                        <slot name="action" />
                    </v-toolbar>

                    <div class="pa-4">
                        <slot>Nothing here!</slot>
                    </div>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Panel extends Vue {

        @Prop(String) private readonly title!: string;
    }
</script>

<style scoped>

</style>

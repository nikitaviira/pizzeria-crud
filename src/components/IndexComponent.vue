<template>
    <v-container fluid>
        <v-row>
            <v-flex xs6 md6 sm6 lg6 offset-xs3>
                <v-data-table
                        :headers="headers"
                        :items-per-page="5"
                        :items="items"
                        class="white elevation-13 mt-10"
                >
                    <template v-slot:top>
                        <v-toolbar flat dense color="primary">
                            <v-toolbar-title class="font-weight-bold white--text">{{ title }}</v-toolbar-title>
                            <v-divider
                                    class="mx-2 white"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <add-btn
                                    :link="createLink"
                                    icon="mdi-plus"
                                    tooltipText="Add new"/>
                        </v-toolbar>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <td class="justify-center layout px-0">
                            <v-tooltip
                                    color="primary"
                                    top>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            class="mt-2"
                                            v-on="on"
                                            icon
                                            :to="{ name: editLink, params: { id: item.id } }">
                                        <v-icon color="primary">mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <span class="white--text">Edit row</span>
                            </v-tooltip>
                            <v-tooltip
                                    color="red"
                                    top>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            class="mt-2"
                                            v-on="on"
                                            icon
                                            @click="remove(item.id)">
                                        <v-icon color="red">mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span class="white--text">Delete row</span>
                            </v-tooltip>
                        </td>
                    </template>

                    <template v-slot:no-data>
                        <v-progress-circular
                                v-if="!loaded"
                                indeterminate
                                color="primary"
                        ></v-progress-circular>
                        <v-alert
                                v-else
                                dense
                                class="font-weight-bold"
                                type="error"
                                icon="warning">
                            {{ error.length > 0 ? error : 'Nothing to display here.' }}
                        </v-alert>
                    </template>
                </v-data-table>
            </v-flex>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
    import ICrust from "@/domain/ICrust";
    import ICutStyle from "@/domain/ICutStyle";
    import IPizzaSize from "@/domain/IPizzaSize";
    import IPizza from "@/domain/IPizza";

    @Component({
        components: {
            'add-btn': () => import('@/components/NavigationButton.vue')
        }
    })
    export default class IndexComponent extends Vue {
        @Prop(Array) private readonly headers!: object[];
        @Prop(Array) private readonly items!: (ICrust | ICutStyle | IPizzaSize | IPizza)[];

        @Prop(String) private readonly title!: string;
        @Prop(String) private readonly editLink!: string;
        @Prop(String) private readonly error!: string;
        @Prop(String) private readonly createLink!: string;

        @Prop(Boolean) private readonly loaded!: boolean;

        @Emit()
        private remove(id: string) {
            return id;
        }
    }
</script>

<style scoped>

</style>

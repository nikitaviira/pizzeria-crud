<template>
    <p class="welcoming-msg">Hello and welcome.<br>Press any of the links in the navbar.</p>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Index extends Vue {

    }
</script>

<style scoped>
    .welcoming-msg {
        left: 0;
        margin-top: -100px;
        position: absolute;
        text-align: center;
        top: 50%;
        font-size: 5vw;
        font-weight: bold;
        width: 100%;
    }
</style>

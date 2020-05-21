<template>
  <v-app>
    <v-content style="background: rgba(66, 141, 185, 0.34)">
      <div id="app">
        <nav-bar />
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      'nav-bar': () => import('@/components/NavBar.vue')
    }
  })
  export default class App extends Vue {

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  [v-cloak] { display: none; }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  .disable-events {
    pointer-events: none
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

<template>
<v-container fluid class="grey lighten-5">

    <div class="progress-container" v-if="appStore().preloader">
        <v-progress-circular color="blue" indeterminate></v-progress-circular>
    </div>

    <router-view />
</v-container>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.progress-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
<script setup>
import {appStore} from "./store/app.js";
</script>

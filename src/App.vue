<template>
  <div id="app">
    <Status />
    <router-view />
  </div>
</template>

<script>
import Status from "./components/Status.vue";

export default {
  name: "App",
  components: {
    Status,
  },
};

</script>

<style>
@import "./style.css";
</style>

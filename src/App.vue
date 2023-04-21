<script setup lang="ts">
import { RouterView } from "vue-router";
import DrawOptions from "./views/DrawOptions.vue";
</script>

<template>
  <div class="container">
    <DrawOptions></DrawOptions>
    <RouterView />
  </div>
</template>
<style>
body {
  margin: 0;
}
</style>
<style scoped>
.container {
  background-color: var(--color-cream);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>

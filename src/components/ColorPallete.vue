<script setup lang="ts">
import { useStore } from "@/stores/defaultStore";
import { storeToRefs } from "pinia";
const { color } = storeToRefs(useStore());
</script>

<template>
  <div class="color-container">
    <input
      class="input-text"
      :style="{ color, borderColor: color }"
      v-model="color"
    />
    <input type="color" v-model="color" />
  </div>
</template>

<style scoped>
.color-container {
  margin-left: 8px;
  margin-right: 8px;
  font-family: var(--family-main);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-text {
  width: 70px;
  background-color: unset;
  border: none;
  border: 1px solid;
  outline: none;
  border-radius: 4px;
  text-align: center;
}
input[type="color"] {
  min-width: 70px;
  width: 100%;
  cursor: pointer;
  padding: 0;
  height: 30px;
  background: none;
  border: none;
}
.color::-webkit-color-swatch {
  cursor: pointer;
  border-radius: 4px;
  border: none;
}
.color::-moz-color-swatch {
  cursor: pointer;
  border-radius: 4px;
  border: none;
}
</style>

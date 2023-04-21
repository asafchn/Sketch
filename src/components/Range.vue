<script setup lang="ts">
import { useCanvasFunction } from "@/composable/useCanvasFunctions";
const { getInputModel } = useCanvasFunction();
const props = defineProps<{ modelWith: string; min: number; max: number }>();
const modal = getInputModel(props.modelWith);
</script>

<template>
  <div class="range-container">
    <span class="range-amount-container">
      <slot></slot>
      <input
        class="range-amount"
        type="number"
        :min="min"
        :max="max"
        v-model="modal"
      />
    </span>
    <input type="range" :min="min" :max="max" v-model="modal" />
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.range-container {
  display: flex;
  flex-direction: column;
  margin: 8px;
  align-items: center;
}

.range-amount-container {
  display: flex;
  font-family: var(--family-main);
}
.range-amount {
  background-color: unset;
  border: none;
  margin-left: 8px;
  border: 1px var(--blue-button) solid;
  border-radius: 4px;
  text-align: center;
}
</style>

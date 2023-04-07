<script setup lang="ts">
import Button from "@/components/Button.vue";
import { useCanvasFunction } from "@/composable/useCanvasFunctions";
import { useStore } from "@/stores/defaultStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
interface DrawingOptions {
  name: string;
  callback: () => void;
}

const selectedOption = ref("Pencil");
const { clearCanvas, changeMode } = useCanvasFunction();
const { isDrawing } = storeToRefs(useStore());

function togglePencil() {
  selectedOption.value = "Pencil";
  changeMode("pen");
}

function toggleEraser() {
  selectedOption.value = "Eraser";
  changeMode("eraser");
}

const drawingOptions: DrawingOptions[] = [
  {
    name: "Pencil",
    callback: togglePencil,
  },
  { name: "Eraser", callback: toggleEraser },
  { name: "Clear", callback: clearCanvas },
];
</script>
<template>
  <div class="status">
    Currently: {{ isDrawing ? "Drawing" : "Not Drawing" }}
  </div>
  <div class="draw-options">
    <Button
      class="button"
      v-for="option in drawingOptions"
      @click="option.callback"
      :is-selected="selectedOption === option.name"
      >{{ option.name }}</Button
    >
  </div>
</template>
<style scoped>
.status {
  font-family: var(--family-main);
}
.draw-options {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 80%;
  border: 1px solid black;
  border-bottom: 0px;
}
.button {
  margin: 8px;
}
</style>

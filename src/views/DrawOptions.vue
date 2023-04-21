<script setup lang="ts">
import Button from "@/components/Button.vue";
import { useCanvasFunction } from "@/composable/useCanvasFunctions";
import { useStore } from "@/stores/defaultStore";
import { storeToRefs } from "pinia";
import Range from "@/components/Range.vue";
import ColorPallete from "@/components/ColorPallete.vue";
import { ref } from "vue";
interface DrawingOptions {
  name: string;
  type: string;
  callback?: () => void;
  modelWith?: string;
  min?: number;
  max?: number;
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
  { name: "Color Pallete", type: "color" },
  {
    name: "Pencil",
    type: "button",
    callback: togglePencil,
  },
  { name: "Eraser", type: "button", callback: toggleEraser },
  {
    name: "Line width",
    type: "range",
    min: 1,
    max: 60,
    modelWith: "lineWidth",
  },
  { name: "Clear", type: "button", callback: clearCanvas },
];
</script>

<template>
  <div class="status">
    <div
      :style="{
        backgroundColor: isDrawing ? '#66FF99' : 'red',
        width: '10px',
        height: '10px',
        borderRadius: '8px',
        marginRight: '8px',
      }"
    ></div>
    Status: {{ isDrawing ? "Active" : "Inactive" }}
  </div>
  <div class="draw-options">
    <div v-for="option in drawingOptions">
      <Button
        v-if="option.type === 'button'"
        class="button"
        @click="option.callback"
        :is-selected="selectedOption === option.name"
        >{{ option.name }}</Button
      >
      <div v-if="option.type === 'range'">
        <Range
          :model-with="option.modelWith ?? ''"
          :min="option.min ?? 1"
          :max="option.max ?? 50"
          >{{ option.name }}:</Range
        >
      </div>
      <ColorPallete v-if="option.type === 'color'"></ColorPallete>
    </div>
  </div>
</template>

<style scoped>
.status {
  font-family: var(--family-main);
  display: flex;
  align-items: center;
}
.draw-options {
  background-color: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 80%;
  border-bottom: 0px;
}
.button {
  margin: 8px;
}
</style>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { useStore } from "@/stores/defaultStore";
import { storeToRefs } from "pinia";
import { useCanvasFunction } from "../composable/useCanvasFunctions";
const { canvasClientRect, canvasContext, canvas } = storeToRefs(useStore());
const canvasRef = ref<HTMLCanvasElement>();
const { stopPainting, startPainting, mouseMove } = useCanvasFunction();

function changeCanvasSize() {
  if (canvas.value) {
    canvasClientRect.value = canvas.value.getBoundingClientRect();
    canvas.value.width = canvasClientRect.value.width;
    canvas.value.height = canvasClientRect.value.height;
  }
}

function initCanvasSize() {
  if (canvasRef.value) {
    canvasClientRect.value = canvasRef.value.getBoundingClientRect();
    canvasRef.value.width = canvasClientRect.value.width;
    canvasRef.value.height = canvasClientRect.value.height;
    canvas.value = canvasRef.value;
  }
}

onMounted(() => {
  if (canvasRef.value) {
    canvasContext.value = canvasRef.value.getContext("2d");
    initCanvasSize();
  }
  window.addEventListener("resize", changeCanvasSize);
});

onUnmounted(() => {
  document.removeEventListener("resize", () => {
    changeCanvasSize;
  });
});
</script>
<template>
  <canvas
    ref="canvasRef"
    class="canvas"
    @mouseleave="stopPainting"
    @mousemove="mouseMove"
    @mousedown="startPainting"
    @mouseup="stopPainting"
  ></canvas>
</template>
<style scoped>
.canvas {
  display: flex;
  cursor: crosshair;
  height: 80%;
  background-color: var(--white-text);
  width: 80%;
  border-radius: 4px;
}
</style>

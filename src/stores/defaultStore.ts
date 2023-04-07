import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("useStore", () => {
  const color = ref<string>("#000000");
  const canvasContext = ref<CanvasRenderingContext2D | null>();
  const canvasClientRect = ref<DOMRect | null>();
  const mode = ref<string>("pen");
  const lineWidth = ref<number>(10);
  const isDrawing = ref(false);
  const canvas = ref<HTMLCanvasElement>();
  return {
    color,
    lineWidth,
    canvasContext,
    canvasClientRect,
    canvas,
    mode,
    isDrawing,
  };
});

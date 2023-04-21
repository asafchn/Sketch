import { useStore } from "@/stores/defaultStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export function useCanvasFunction() {
  const {
    color,
    lineWidth,
    canvasContext,
    canvasClientRect,
    canvas,
    mode,
    isDrawing,
  } = storeToRefs(useStore());

  const startX = ref(0);
  const startY = ref(0);

  function startPainting(event: MouseEvent) {
    isDrawing.value = true;
    startX.value = event.clientX;
    startY.value = event.clientY;
    if (mode.value === "pen") {
      draw(event);
    }
  }

  function clearCanvas() {
    if (canvasContext.value && canvas.value) {
      canvasContext.value.clearRect(
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
    }
  }

  function getInputModel(modelType: string) {
    if (modelType === "lineWidth") {
      return lineWidth;
    }
  }

  function mouseMove(event: MouseEvent) {
    switch (mode.value) {
      case "pen":
        if (canvasContext.value) {
          canvasContext.value.globalCompositeOperation = "source-over";
        }
        break;
      case "eraser":
        if (canvasContext.value) {
          canvasContext.value.globalCompositeOperation = "destination-out";
        }
        break;
      default:
        if (canvasContext.value) {
          canvasContext.value.globalCompositeOperation = "source-over";
        }
        break;
    }
    draw(event);
  }

  function draw(event: MouseEvent) {
    if (!isDrawing.value || !canvasContext.value) {
      return;
    }
    canvasContext.value.lineWidth = lineWidth.value;
    canvasContext.value.lineCap = "round";
    if (canvas.value && canvasClientRect.value) {
      canvasContext.value.lineTo(
        event.clientX - canvasClientRect.value.x,
        event.clientY - canvasClientRect.value.y
      );
      canvasContext.value.strokeStyle = color.value;
      canvasContext.value.stroke();
    }
  }

  function changeMode(type: string) {
    mode.value = type;
  }
  function stopPainting() {
    isDrawing.value = false;
    if (canvasContext.value) {
      canvasContext.value.stroke();
      canvasContext.value.beginPath();
    }
  }

  return {
    clearCanvas,
    stopPainting,
    startPainting,
    draw,
    changeMode,
    getInputModel,
    mouseMove,
  };
}

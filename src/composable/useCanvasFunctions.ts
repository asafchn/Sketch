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
  function startPainting() {
    isDrawing.value = true;
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
  function mouseMove(event: MouseEvent) {
    switch (mode.value) {
      case "pen":
        draw(event);
        break;
      case "eraser":
        erase(event);
        break;
      default:
        draw(event);
    }
  }

  function erase(event: MouseEvent) {
    if (!isDrawing.value || !canvasContext.value) {
      return;
    }
    canvasContext.value.globalCompositeOperation = "destination-out";
    if (canvasClientRect.value) {
      canvasContext.value.arc(
        event.clientX - canvasClientRect.value.x,
        event.clientY - canvasClientRect.value.y,
        lineWidth.value,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.value.fill();
    }
  }
  function draw(event: MouseEvent) {
    if (!isDrawing.value || !canvasContext.value) {
      return;
    }
    canvasContext.value.globalCompositeOperation = "source-over";
    canvasContext.value.lineWidth = lineWidth.value;
    canvasContext.value.strokeStyle = color.value;
    canvasContext.value.lineCap = "round";
    if (canvas.value && canvasClientRect.value) {
      canvasContext.value.lineTo(
        event.clientX - canvasClientRect.value.x,
        event.clientY - canvasClientRect.value.y
      );
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
    erase,
    mouseMove,
  };
}

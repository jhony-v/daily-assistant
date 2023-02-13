import { ISpeechResponse } from "../speech";

interface GuiProps {
  el: HTMLCanvasElement;
  speech: ISpeechResponse;
}

export default function gui({ el, speech }: GuiProps) {
  const canvasContext = el.getContext("2d");
  const WIDTH = el.width;
  const HEIGHT = el.height;

  function render() {
    if (!canvasContext) throw new Error("Canvas doesn't exist");

    speech.getByteFrequencyData();

    canvasContext.clearRect(0, 0, el.width, el.height);

    canvasContext.fillStyle = "transparent";
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / speech.bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < speech.bufferLength; i++) {
      barHeight = speech.dataArray[i];

      canvasContext.fillStyle = "rgb(0, 0, 0)";
      canvasContext.fillRect(
        x,
        HEIGHT - barHeight / 2,
        barWidth,
        barHeight / 2
      );

      x += barWidth + 1;
    }

    requestAnimationFrame(render);
  }
  return {
    render,
  };
}

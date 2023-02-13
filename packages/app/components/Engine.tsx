"use client";

import davinci from "@/core/lib/davinci";
import { useCallback, useState } from "react";
import speech from "@/core/lib/speech";
import gui from "@/core/lib/gui";

const Engine = () => {
  const [text, setText] = useState("");
  const start = useCallback(async () => {
    const responseText = await davinci({ prompt: text });
    const responseSpeech = await speech({ text: responseText });
    const { render } = gui({ el: document.getElementById("canvas") as HTMLCanvasElement, speech: responseSpeech });
    render();
    
  }, [text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>
      <button onClick={start}>start playing</button>
      <canvas id="canvas" width={400} height={400}></canvas>
    </div>
  );
};

export default Engine;
